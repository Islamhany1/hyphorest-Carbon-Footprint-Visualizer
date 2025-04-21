import React from "react";
import Select from "react-select";
import {
  dietOptions,
  currencyOptions,
  inputClasses,
} from "../constants/formOptions";

import { selectStyles } from "../constants/selectStyles";

export default function DietInput({
  diet,
  setDiet,
  dietValue,
  setDietValue,
  dietCurrency,
  setDietCurrency,
}) {
  const isMoney = [dietOptions[0].value.id, dietOptions[1].value.id].includes(
    diet.value.id
  );

  return (
    <div>
      <label className="block mb-1 font-medium">Dietary Preference</label>
      <Select
        options={dietOptions}
        value={diet}
        onChange={(opt) => {
          setDiet(opt);
          setDietValue("");
          setDietCurrency("usd");
        }}
        classNamePrefix="react-select"
        styles={selectStyles}
      />
      {isMoney ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={dietValue}
            onChange={(e) => setDietValue(e.target.value)}
            className={inputClasses}
            placeholder="Amount spent per month"
          />
          <Select
            options={currencyOptions}
            value={currencyOptions.find((c) => c.value === dietCurrency)}
            onChange={(opt) => setDietCurrency(opt.value)}
            classNamePrefix="react-select"
            isSearchable={false}
            styles={selectStyles}
          />
        </div>
      ) : (
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={dietValue}
          onChange={(e) => setDietValue(e.target.value)}
          className={`${inputClasses} mt-2`}
          placeholder="Weight (kg) per month"
        />
      )}
    </div>
  );
}
