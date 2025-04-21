export default function computeStats(annualKg) {
  return {
    annual: annualKg,
    monthly: annualKg / 12,
    daily: annualKg / 365,
  };
}
