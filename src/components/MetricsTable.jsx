import React from "react";

export default function MetricsTable({ user, country, global, countryName }) {
  const rows = [
    { label: "Daily", key: "daily", unit: "kg", divisor: 1 },
    { label: "Monthly", key: "monthly", unit: "t", divisor: 1000 },
    { label: "Annual", key: "annual", unit: "t", divisor: 1000 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3" />
            <th className="px-4 py-3 uppercase tracking-wide text-gray-600">
              You
            </th>
            <th className="px-4 py-3 uppercase tracking-wide text-gray-600">
              {countryName} Avg
            </th>
            <th className="px-4 py-3 uppercase tracking-wide text-gray-600">
              Global Avg
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rows.map(({ label, key, unit, divisor }, idx) => (
            <tr key={key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <th className="px-4 py-3 font-medium text-gray-700">{label}</th>
              <td className="px-4 py-3">
                {(user[key] / divisor).toFixed(unit === "kg" ? 1 : 2)} {unit}
              </td>
              <td className="px-4 py-3">
                {(country[key] / divisor).toFixed(unit === "kg" ? 1 : 2)} {unit}
              </td>
              <td className="px-4 py-3">
                {(global[key] / divisor).toFixed(unit === "kg" ? 1 : 2)} {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
