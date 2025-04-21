const BASE_URL = "https://api.climatiq.io/data/v1";

export async function estimateEmission(id, params) {
  const res = await fetch(`${BASE_URL}/estimate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emission_factor: { id },
      parameters: params,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Estimate failed: ${err}`);
  }

  const { co2e } = await res.json();
  return co2e;
}
