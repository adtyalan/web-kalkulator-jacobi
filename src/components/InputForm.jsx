import React from "react";

const VARS = ["x", "y", "z", "w", "v", "u", "t", "s"];

const templates = [
  {
    label: "2 Variabel (x, y)",
    variables: ["x", "y"],
    equations: ["x + 2y = 4", "3x - y = 5"],
    x0: ["0", "0"],
    tolerance: 0.0001,
    maxIter: 10,
  },
  {
    label: "3 Variabel (x, y, z)",
    variables: ["x", "y", "z"],
    equations: ["x + y + z = 6", "2x + 5y + 2z = -4", "2x + 3y + 8z = 27"],
    x0: ["0", "0", "0"],
    tolerance: 0.0001,
    maxIter: 20,
  },
  {
    label: "4 Variabel (x, y, z, w)",
    variables: ["x", "y", "z", "w"],
    equations: [
      "10x + 2y - z + w = 9",
      "2x + 10y + z - w = 7",
      "-x + y + 10z + 2w = 6",
      "x - y + 2z + 10w = 5",
    ],
    x0: ["0", "0", "0", "0"],
    tolerance: 0.0001,
    maxIter: 25,
  },
];

export default function InputForm({
  variables,
  setVariables,
  matrixA,
  setMatrixA,
  vectorB,
  setVectorB,
  x0,
  setX0,
  tolerance,
  setTolerance,
  maxIter,
  setMaxIter,
  computeJacobi,
  equationInputs,
  setEquationInputs,
}) {
  // Handler untuk mengubah jumlah variabel (dan persamaan)
  const handleVarCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || 0;
    const newVars = VARS.slice(0, newCount);
    setVariables(newVars);
    setMatrixA(
      Array(newCount)
        .fill(0)
        .map(() => Array(newCount).fill(""))
    );
    setVectorB(Array(newCount).fill(""));
    setX0(Array(newCount).fill(""));
    setEquationInputs(Array(newCount).fill(""));
  };

  // Handler untuk mengubah input persamaan (satu baris)
  const handleEquationChange = (i, value, customVars) => {
    const vars = customVars || variables;
    setEquationInputs((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });

    let left = value.split("=")[0];
    let right = value.split("=")[1];
    let coeffs = Array(vars.length).fill(0);

    if (left) {
      const termRegex = /([+-]?\s*\d*\.?\d*)\s*([a-zA-Z]+)/g;
      let match;
      while ((match = termRegex.exec(left)) !== null) {
        let [_, rawCoeff, varName] = match;
        varName = varName.trim();
        let idx = vars.indexOf(varName);
        if (idx !== -1) {
          let num = rawCoeff.replace(/\s+/g, "");
          if (num === "" || num === "+") num = "1";
          if (num === "-") num = "-1";
          coeffs[idx] = parseFloat(num);
        }
      }
    }

    setMatrixA((prev) => {
      const next = prev.map((row) => [...row]);
      next[i] = coeffs.map((c) => c.toString());
      return next;
    });
    setVectorB((prev) => {
      const next = [...prev];
      next[i] = right ? right.trim() : "";
      return next;
    });
  };

  // Handler untuk memilih template
  const handleTemplate = (tpl) => {
    setVariables(tpl.variables);
    setMatrixA(
      Array(tpl.variables.length)
        .fill(0)
        .map(() => Array(tpl.variables.length).fill(""))
    );
    setVectorB(Array(tpl.variables.length).fill(""));
    setX0(tpl.x0);
    setTolerance(tpl.tolerance);
    setMaxIter(tpl.maxIter);
    setEquationInputs(
      tpl.equations.concat(
        Array(tpl.variables.length - tpl.equations.length).fill("")
      )
    );
    // Tunggu variables update, lalu isi matrixA dan vectorB
    setTimeout(() => {
      tpl.equations.forEach((eq, i) =>
        handleEquationChange(i, eq, tpl.variables)
      );
    }, 0);
  };

  return (
    <div className="gap-4">
      {/* Template Buttons */}
      <div className="flex flex-col items-center sm:flex-row gap-2 mb-4">
        <p>Template Soal:</p>
        {templates.map((tpl, idx) => (
          <button
            key={idx}
            type="button"
            className="text-white bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded font-medium border"
            onClick={() => handleTemplate(tpl)}
          >
            {tpl.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <div>
          <label className="mr-2 font-medium">
            Jumlah variabel & persamaan:
          </label>
          <input
            type="number"
            min={2}
            max={VARS.length}
            value={variables.length}
            onChange={handleVarCountChange}
            className="border p-1 w-20 rounded-md pl-2"
          />
          <span className="ml-2 text-gray-500">
            {variables.map((v) => v).join(", ")}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium">
            Input Persamaan Linear (masing-masing baris 1 persamaan)
          </h3>
          {Array.from({ length: variables.length }).map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Contoh: 2x + 3y - z = 5`}
              value={equationInputs[i] || ""}
              onChange={(e) => handleEquationChange(i, e.target.value)}
              className="border p-1 w-full mx-1 rounded-md mb-2 pl-2"
            />
          ))}
        </div>

        <div>
          <h3 className="font-medium">Tebakan Awal</h3>
          <div className="flex">
            {x0.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                onChange={(e) =>
                  setX0((x) => {
                    const arr = [...x];
                    arr[i] = e.target.value;
                    return arr;
                  })
                }
                className="border p-1 w-full mx-1 rounded-md pl-2"
                placeholder={variables[i]}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="mr-2 font-medium">Toleransi ε:</label>
          <input
            type="number"
            step="any"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            className="border p-1 w-full mr-4 rounded-md pl-2"
          />
          <label className="mr-2 font-medium">Max Iter:</label>
          <input
            type="number"
            value={maxIter}
            onChange={(e) => setMaxIter(e.target.value)}
            className="border p-1 w-full rounded-md pl-2"
          />
        </div>
      </div>

      <button
        onClick={computeJacobi}
        className="bg-gray-900 text-white border-none p-4 border w-full rounded-full shadow-xl/30 hover:bg-gray-700"
      >
        Hitung Jacobi
      </button>
    </div>
  );
}
