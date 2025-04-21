import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";

import { GLOBAL_ANNUAL_AVG } from "../services/averages";
import computeStats from "../utils/computeStats";
import MetricsTable from "./MetricsTable";
import { selectStyles } from "../constants/selectStyles";
import Feedback from "./Feedback";

export default function Comparison({ totalKg, countryAvgs, loadingAvgs }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // pre‑compute stats, even if the table isn’t shown yet
  const userStats = computeStats(totalKg);
  const countryCode = selectedOption?.value;
  const countryName = selectedOption?.label || "Country";
  const countryStats = computeStats(countryAvgs?.[countryCode] || 0);
  const globalStats = computeStats(GLOBAL_ANNUAL_AVG);

  // build the <Select> options once the data arrives
  const options = useMemo(() => {
    if (!countryAvgs) return [];
    return Object.keys(countryAvgs)
      .sort()
      .map((name) => ({ value: name, label: name }));
  }, [countryAvgs]);

  // pick a default country once options are ready
  useEffect(() => {
    if (options.length && !selectedOption) {
      const defaultName = "Germany";
      const defaultOpt =
        options.find((o) => o.value === defaultName) || options[0];
      setSelectedOption(defaultOpt);
    }
  }, [options, selectedOption]);

  return (
    <section className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md transition p-8 space-y-6">
      {loadingAvgs ? (
        // Loading state for both selector + table
        <div className="text-center py-12">
          <p className="italic text-gray-500">
            Loading countries averages and metrics…
          </p>
        </div>
      ) : (
        <>
          {/* Country selector */}
          <div className="w-full max-w-xs">
            <label
              htmlFor="country-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose a country:
            </label>
            <Select
              inputId="country-select"
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Choose a country..."
              classNamePrefix="react-select"
              styles={selectStyles}
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Carbon Footprint vs {countryName} &amp; Global Averages
          </h2>

          {/* Metrics table */}
          <MetricsTable
            user={userStats}
            country={countryStats}
            global={globalStats}
            countryName={countryName}
          />
        </>
      )}

      {/* AI‑powered feedback */}
      <Feedback totalKg={totalKg} />

      {/* Data source note */}
      <p className="text-xs text-gray-500">
        Data sources: per‑country averages from DigitalOcean Spaces, global
        average from Our World in Data.
      </p>
    </section>
  );
}
