import React, { useState } from "react";
import InputForm from "./InputForm";
import ResultsTable from "./ResultsTable";
import ConvergenceChart from "./ConvergenceChart";

const VARS = ["x", "y", "z", "w", "v", "u", "t", "s"];
const DEFAULT_N = 3;

export default function JacobiSolver() {
  const [variables, setVariables] = useState(VARS.slice(0, DEFAULT_N));
  const [matrixA, setMatrixA] = useState(
    Array(DEFAULT_N)
      .fill(0)
      .map(() => Array(DEFAULT_N).fill(""))
  );
  const [vectorB, setVectorB] = useState(Array(DEFAULT_N).fill(""));
  const [x0, setX0] = useState(Array(DEFAULT_N).fill(""));
  const [tolerance, setTolerance] = useState(1e-4);
  const [maxIter, setMaxIter] = useState(10);
  const [results, setResults] = useState([]);
  const [equationInputs, setEquationInputs] = useState(
    Array(DEFAULT_N).fill("")
  );
  const [converged, setConverged] = useState(null); // null | true | false
  const [finalIter, setFinalIter] = useState(0);
  // Tambahkan state tab bawah
  const [tab, setTab] = useState("output");

  // Update state jika jumlah variabel berubah
  const handleSetVariables = (newVars) => {
    const n = newVars.length;
    setVariables(newVars);
    setMatrixA(
      Array(n)
        .fill(0)
        .map(() => Array(n).fill(""))
    );
    setVectorB(Array(n).fill(""));
    setX0(Array(n).fill(""));
    setEquationInputs(Array(n).fill(""));
    setConverged(null);
    setFinalIter(0);
    setResults([]);
  };

  // Handler untuk update input persamaan dari InputForm
  const handleSetEquationInputs = (inputs) => {
    setEquationInputs(inputs);
  };

  // Jacobi computation
  const computeJacobi = () => {
    const n = variables.length;
    const A = matrixA.map((row) => row.map(Number));
    const b = vectorB.map(Number);
    let xPrev = x0.map((val) => Number(val));
    const tol = Number(tolerance);
    const maxI = Number(maxIter);
    const iters = [];
    let isConverged = false;

    for (let k = 0; k < maxI; k++) {
      const xNext = Array(n).fill(0);
      const stepDetails = [];
      for (let i = 0; i < n; i++) {
        let sum = 0;
        let sumDetail = [];
        for (let j = 0; j < n; j++) {
          if (j !== i) {
            sum += A[i][j] * xPrev[j];
            sumDetail.push(
              `${A[i][j] >= 0 && j !== 0 ? "+" : ""}${A[i][j]}×${
                variables[j]
              }(${xPrev[j].toFixed(4)})`
            );
          }
        }
        xNext[i] = (b[i] - sum) / A[i][i];
        stepDetails.push(
          `${variables[i]} = (${b[i]} ${sum >= 0 ? "-" : "+"} ${Math.abs(
            sum
          ).toFixed(6)}) / ${A[i][i]} = ${xNext[i].toFixed(
            6
          )} [${sumDetail.join(" ")}]`
        );
      }
      const error = Math.max(...xNext.map((xi, i) => Math.abs(xi - xPrev[i])));
      iters.push({
        iter: k + 1,
        x: [...xNext],
        error,
        detail: stepDetails.join(" | "),
      });
      if (error < tol) {
        isConverged = true;
        break;
      }
      xPrev = xNext;
    }
    setResults(iters);
    setConverged(isConverged);
    setFinalIter(iters.length);
  };

  // Helper untuk format solusi akhir
  const renderSolution = () => {
    if (!results.length) return null;
    const last = results[results.length - 1];
    return (
      <div className="mb-2">
        <div className="font-semibold">Solusi Akhir:</div>
        <div className="flex flex-wrap gap-4 mt-1">
          {variables.map((v, i) => (
            <span key={v}>
              <b>{v}</b> = {last.x[i].toFixed(6)}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Helper untuk status konvergensi
  const renderStatus = () => {
    if (converged === null) return null;
    if (converged)
      return (
        <div className="text-green-700 font-semibold flex items-center gap-2 mb-2">
          <span>
            ✅ Metode Jacobi berhasil konvergen pada iterasi ke-{finalIter}
          </span>
        </div>
      );
    return (
      <div className="text-red-700 font-semibold flex items-center gap-2 mb-2">
        <span>
          ❌ Tidak konvergen hingga iterasi maksimum ({maxIter}). Coba ganti
          tebakan awal atau pastikan matriks dominan diagonal.
        </span>
      </div>
    );
  };

  // Helper untuk info parameter input
  const renderInputInfo = () => (
    <div className="text-sm text-gray-700 mb-2">
      <div>
        <b>Tebakan awal:</b>{" "}
        {x0.map((v, i) => `${variables[i]}=${v}`).join(", ")}
      </div>
      <div>
        <b>Toleransi ε:</b> {tolerance}
      </div>
      <div>
        <b>Iterasi maksimum:</b> {maxIter}
      </div>
      <div>
        <b>Jumlah variabel:</b> {variables.length}
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto mb-10">
      {/* InputForm full width */}
      <div className="mb-10">
        <InputForm
          variables={variables}
          setVariables={handleSetVariables}
          matrixA={matrixA}
          setMatrixA={setMatrixA}
          vectorB={vectorB}
          setVectorB={setVectorB}
          x0={x0}
          setX0={setX0}
          tolerance={tolerance}
          setTolerance={setTolerance}
          maxIter={maxIter}
          setMaxIter={setMaxIter}
          computeJacobi={computeJacobi}
          equationInputs={equationInputs}
          setEquationInputs={handleSetEquationInputs}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-around border-b-2 border-gray-300 gap-2 mb-2">
        <button
          className={`px-4 py-2 rounded-t font-semibold transition ${
            tab === "output"
              ? "bg-gray-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab("output")}
        >
          Output Ringkasan
        </button>
        <button
          className={`px-4 py-2 rounded-t font-semibold transition ${
            tab === "tabel"
              ? "bg-gray-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab("tabel")}
        >
          Tabel Iterasi
        </button>
        <button
          className={`px-4 py-2 rounded-t font-semibold transition ${
            tab === "grafik"
              ? "bg-gray-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab("grafik")}
        >
          Grafik Konvergensi
        </button>
      </div>

      {/* Card Konten Tab */}
      <div className="p-4 bg-gray-50 min-h-[180px]">
        {tab === "output" && (
          <div>
            <div className="mb-2 font-bold text-lg">Output Ringkasan</div>
            {renderStatus()}
            {renderSolution()}
            {!converged && results.length > 0 && (
              <div className="mb-2">
                <div className="font-semibold">Nilai Iterasi Terakhir:</div>
                <div className="flex flex-wrap gap-4 mt-1">
                  {variables.map((v, i) => (
                    <span key={v}>
                      <b>{v}</b> = {results[results.length - 1].x[i].toFixed(6)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {renderInputInfo()}
          </div>
        )}
        {tab === "tabel" && results.length > 0 && (
          <ResultsTable results={results} n={variables.length} />
        )}
        {tab === "grafik" && <ConvergenceChart results={results} />}
        {tab !== "output" && results.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Lakukan perhitungan terlebih dahulu untuk melihat hasil.
          </div>
        )}
      </div>
    </div>
  );
}
