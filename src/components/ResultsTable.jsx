import React, { useState } from "react";

export default function ResultsTable({ results, n, variables }) {
  const [tab, setTab] = useState("tabel");

  // Default variable names if not provided
  const varNames =
    variables && variables.length === n
      ? variables
      : ["x", "y", "z", "w", "v", "u", "t", "s"].slice(0, n);

  return (
    <div className="mt-6 rounded-lg overflow-hidden shadow bg-white">
      <h3 className="mb-2 font-semibold text-gray-700">Hasil Iterasi</h3>
      {/* Tab Button */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-1 rounded-t font-semibold transition ${
            tab === "tabel"
              ? "bg-gray-700 text-gray-100"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab("tabel")}
        >
          Tabel Iterasi
        </button>
        <button
          className={`px-4 py-1 rounded-t font-semibold transition ${
            tab === "detail"
              ? "bg-gray-700 text-gray-100"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setTab("detail")}
        >
          Detail Langkah
        </button>
      </div>

      {/* Tab Content */}
      {tab === "tabel" && (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-center align-middle">
                <th className="p-2 font-semibold rounded-tl-lg text-center">
                  Iter
                </th>
                {varNames.map((v, i) => (
                  <th key={i} className="p-2 font-semibold text-center">
                    {v}
                  </th>
                ))}
                <th className="p-2 font-semibold rounded-tr-lg text-center">
                  Error
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr
                  key={r.iter}
                  className={
                    (idx % 2 === 0 ? "bg-gray-50" : "bg-white") +
                    " text-center align-middle"
                  }
                >
                  <td className="p-2 border-t text-center">{r.iter}</td>
                  {r.x.map((xi, i) => (
                    <td key={i} className="p-2 border-t text-center">
                      {xi.toFixed(6)}
                    </td>
                  ))}
                  <td className="p-2 border-t text-center">
                    {r.error.toExponential(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "detail" && (
        <div className="p-4">
          <h4 className="font-semibold mb-2 text-indigo-700">
            Penjelasan Langkah Iterasi
          </h4>
          {results.map((r) => (
            <div key={r.iter} className="mb-4">
              <div className="font-bold mb-1">Iterasi ke-{r.iter}</div>
              <ul className="list-disc ml-6 mb-1 text-gray-700 text-sm">
                {r.detail.split(" | ").map((step, idx) => (
                  <li key={idx} className="mb-1">
                    {/* Penjelasan kata-kata */}
                    <span className="block mb-1">
                      <b>Langkah {idx + 1}:</b> Hitung nilai variabel ke-
                      {idx + 1} dengan mensubstitusi nilai variabel lain dari
                      iterasi sebelumnya ke persamaan ke-{idx + 1}.
                    </span>
                    {/* Bentuk matematikanya */}
                    <span className="block font-mono text-xs bg-gray-100 rounded px-2 py-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
