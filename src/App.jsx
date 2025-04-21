import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LifestyleForm from "./components/LifestyleForm";
import EmissionPie from "./components/EmissionPie";
import Comparison from "./components/Comparison";
import { getCountryAnnualAvgs } from "./services/averages";

export default function App() {
  // User emission data
  const [breakdown, setBreakdown] = useState(null);
  const [totalKg, setTotalKg] = useState(0);

  // Country averages data
  const [countryAvgs, setCountryAvgs] = useState(null);
  const [loadingAvgs, setLoadingAvgs] = useState(true);

  // Fetch OWID per-capita CO2 once on mount
  useEffect(() => {
    getCountryAnnualAvgs()
      .then((map) => setCountryAvgs(map))
      .catch((err) => console.error("Failed to load country averages:", err))
      .finally(() => setLoadingAvgs(false));
  }, []);

  // Handler for form calculation
  const handleCalculate = (calcBreakdown, monthlyTotal) => {
    setBreakdown(calcBreakdown);
    setTotalKg(monthlyTotal * 12);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-10 border border-white/30"
      >
        {/* Header */}
        <header className="text-center mt-4">
          <h1 className="text-4xl font-bold mb-2">
            🌍 Carbon Footprint Visualiser
          </h1>
          <p className="text-gray-600">
            See how your daily habits stack up against other countries &amp;
            global averages.
          </p>
        </header>

        {/* Input form and pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ">
          <motion.section
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl h-full"
          >
            <LifestyleForm onCalculate={handleCalculate} />
          </motion.section>

          {breakdown && (
            <motion.section
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-8 w-full h-full flex items-center justify-center "
            >
              <EmissionPie data={breakdown} />
            </motion.section>
          )}
        </div>

        {/* Comparison table */}
        {breakdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Comparison
              totalKg={totalKg}
              countryAvgs={countryAvgs}
              loadingAvgs={loadingAvgs}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
