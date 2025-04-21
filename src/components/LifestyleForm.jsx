import React, { useState } from "react";
import { estimateEmission } from "../services/climatiq";
import CommuteInput from "./CommuteInput";
import DietInput from "./DietInput";
import EnergyInput from "./EnergyInput";
import { transportOptions, dietOptions } from "../constants/formOptions";

export default function LifestyleForm({ onCalculate }) {
  const [transport, setTransport] = useState(transportOptions[0]);
  const [distance, setDistance] = useState("");
  const [diet, setDiet] = useState(dietOptions[0]);
  const [dietValue, setDietValue] = useState("");
  const [dietCurrency, setDietCurrency] = useState("usd");
  const [energy, setEnergy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transport: km/day → km/month
    const monthlyDistance = +distance * 30;
    const transportParams = {
      distance: monthlyDistance,
      distance_unit: transport.value.unit,
    };

    // Diet: money or weight
    const isMoneyDiet = [
      dietOptions[0].value.id,
      dietOptions[1].value.id,
    ].includes(diet.value.id);
    const dietParams = isMoneyDiet
      ? { money: +dietValue, money_unit: dietCurrency }
      : { weight: +dietValue, weight_unit: "kg" };

    // Energy: kWh/month
    const energyParams = { energy: +energy, energy_unit: "kWh" };

    // Estimate emissions
    const [dietKg, transKg, energyKg] = await Promise.all([
      estimateEmission(diet.value.id, dietParams),
      estimateEmission(transport.value.id, transportParams),
      estimateEmission("af1016f9-75e1-400c-877d-f71f9a5363b0", energyParams),
    ]);

    const breakdownMonthly = [
      { name: "Diet", value: dietKg },
      { name: "Transport", value: transKg },
      { name: "Energy", value: energyKg },
    ];

    const totalMonthlyKg = breakdownMonthly.reduce(
      (sum, i) => sum + i.value,
      0
    );
    onCalculate(breakdownMonthly, totalMonthlyKg);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CommuteInput
        transport={transport}
        setTransport={setTransport}
        distance={distance}
        setDistance={setDistance}
      />
      <DietInput
        diet={diet}
        setDiet={setDiet}
        dietValue={dietValue}
        setDietValue={setDietValue}
        dietCurrency={dietCurrency}
        setDietCurrency={setDietCurrency}
      />
      <EnergyInput energy={energy} setEnergy={setEnergy} />

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-teal-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
      >
        Calculate Footprint
      </button>
    </form>
  );
}
