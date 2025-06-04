import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ConvergenceChart({ results }) {
  const hasData = results && results.length > 0;
  return (
    <div className="mt-8 h-64 rounded p-4">
      <h3 className="mb-2">Grafik Konvergensi (Error vs Iterasi)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={hasData ? results : []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="iter"
            label={{ value: "Iterasi", position: "insideBottom", dy: 30 }}
          />
          <YAxis
            label={{
              value: "Error",
              angle: -90,
              position: "insideLeft",
              dx: 0,
              dy: 10,
            }}
            wrapperStyle={{ marginTop: 90 }}
          />
          <Tooltip wrapperStyle={{ marginTop: 24 }} />
          <Legend />
          <Line type="monotone" dataKey="error" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
