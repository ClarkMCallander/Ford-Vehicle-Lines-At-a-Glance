import { useMemo, useState } from 'react';

const ANNUAL_MILES = 10000;

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CostPerMileCalculator({ vehicle }) {
  const [gasPrice, setGasPrice] = useState(3.75);
  const [electricityPrice, setElectricityPrice] = useState(0.16);

  const { powertrain_type } = vehicle.core_specs;
  const efficiency = vehicle.analytical_data.epa_estimated_mpg;

  const calculation = useMemo(() => {
    if (powertrain_type === 'BEV') {
      const kwhPer100Miles = efficiency.kwh_per_100_miles;
      const annualKwhUse = (ANNUAL_MILES / 100) * kwhPer100Miles;
      return {
        energyLabel: 'Estimated electricity cost',
        annualFuelCost: annualKwhUse * electricityPrice,
        usageSummary: `${annualKwhUse.toFixed(0)} kWh over ${ANNUAL_MILES.toLocaleString()} miles`,
      };
    }

    const gallonsUsed = ANNUAL_MILES / efficiency.combined;
    return {
      energyLabel: 'Estimated fuel cost',
      annualFuelCost: gallonsUsed * gasPrice,
      usageSummary: `${gallonsUsed.toFixed(0)} gallons over ${ANNUAL_MILES.toLocaleString()} miles`,
    };
  }, [efficiency, electricityPrice, gasPrice, powertrain_type]);

  return (
    <section className="panel calculator-panel">
      <div className="section-heading">
        <h3>Cost-per-10,000-mile calculator</h3>
        <p>Quick local fuel-cost scenario modeling for the selected vehicle.</p>
      </div>

      <div className="calculator-inputs">
        <label>
          Gas price / gallon
          <input
            type="number"
            min="0"
            step="0.01"
            value={gasPrice}
            onChange={(event) => setGasPrice(Number(event.target.value))}
          />
        </label>

        <label>
          Electricity cost / kWh
          <input
            type="number"
            min="0"
            step="0.01"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="calculator-result">
        <span>{calculation.energyLabel}</span>
        <strong>{formatCurrency(calculation.annualFuelCost)}</strong>
        <p>{calculation.usageSummary}</p>
      </div>
    </section>
  );
}
