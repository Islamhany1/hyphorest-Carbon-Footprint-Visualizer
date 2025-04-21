import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#4ade80", // green‑300
  "#60a5fa", // blue‑400
  "#f472b6", // pink‑400
];

export default function EmissionPie({ data }) {
  const filtered = data.filter((i) => i.value > 0);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={filtered}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {filtered.map((entry, idx) => (
              <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(val) => `${val.toFixed(1)} kg CO₂e`} />

          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ bottom: 0 }}
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
