import React, { useState, useEffect } from "react";
import { generateFeedback } from "../services/geminiRequest";

export default function Feedback({ totalKg }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (totalKg == null) return;
    const prompt = `In a brief paragraph, describe how if i emit ${totalKg.toLocaleString()} kg CO₂e per year impacts the planet and suggest practical ways to reduce this footprint. Be sure to compare it accurately to the global average of 4600 kg per year.”`;

    setLoading(true);
    generateFeedback(prompt)
      .then((text) => {
        setFeedback(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Sorry, I couldn't generate feedback right now.");
        setLoading(false);
      });
  }, [totalKg]);

  if (loading)
    return (
      <p className="italic text-gray-500">Generating personalized tips…</p>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!feedback) return null;

  return (
    <section className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-medium text-green-800 mb-2">
        AI‑Powered Footprint Insights
      </h3>
      <p className="text-gray-800 whitespace-pre-line">{feedback}</p>
    </section>
  );
}
