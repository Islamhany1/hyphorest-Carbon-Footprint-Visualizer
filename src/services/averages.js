const OWID_URL =
  "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json";

let cachedMap = null;

export async function getCountryAnnualAvgs() {
  if (cachedMap) {
    return cachedMap;
  }
  const res = await fetch(OWID_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch OWID data: ${res.status}`);
  }
  const data = await res.json();
  const map = {};

  for (const [iso, entry] of Object.entries(data)) {
    const arr = entry.data || [];
    // grab the element before the last one, or the last if there's only one
    const rec =
      arr.length > 1
        ? arr[arr.length - 2]
        : arr.length === 1
        ? arr[0]
        : undefined;

    if (rec?.co2_per_capita != null) {
      // convert tonnes to kg
      map[iso] = rec.co2_per_capita * 1000;
    }
  }

  cachedMap = map;
  return map;
}

// Global annual average in kg CO₂
export const GLOBAL_ANNUAL_AVG = 4600;
