import React from "react";
import Select from "react-select";
import { transportOptions, inputClasses } from "../constants/formOptions";
import { selectStyles } from "../constants/selectStyles";

export default function CommuteInput({
  transport,
  setTransport,
  distance,
  setDistance,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">Daily Commute</label>
      <Select
        options={transportOptions}
        value={transport}
        onChange={setTransport}
        classNamePrefix="react-select"
        styles={selectStyles}
      />
      <input
        type="number"
        inputMode="decimal"
        min="0"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className={`${inputClasses} mt-2`}
        placeholder={`Distance (${transport.value.unit}) per day`}
      />
    </div>
  );
}
