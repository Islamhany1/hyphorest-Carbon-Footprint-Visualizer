import React from "react";
import { inputClasses } from "../constants/formOptions";

export default function EnergyInput({ energy, setEnergy }) {
  return (
    <div>
      <label className="block mb-1 font-medium">Monthly Energy Usage</label>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
        className={inputClasses}
        placeholder="kWh per month"
      />
    </div>
  );
}
