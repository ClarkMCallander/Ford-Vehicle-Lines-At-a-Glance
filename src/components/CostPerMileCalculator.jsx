import { useMemo, useState } from 'react';

const MILES_TO_ANALYZE = 10000;
const KWH_PER_GALLON_EQUIVALENT = 33.7;

function calculateCostEstimate(vehicle, gasPrice, electricityPrice) {
  const efficiency = vehicle.analytical_data.epa_estimated_mpg;
  const powertrain = vehicle.core_specs.powertrain_type;

  if (powertrain === 'BEV') {
    const kwhPer100Miles = (100 * KWH_PER_GALLON_EQUIVALENT) / efficiency.combined_mpge;
    const totalKwh = (MILES_TO_ANALYZE / 100) * kwhPer100Miles;
    return {
      energyType: 'electricity',
      unitsConsumed: totalKwh,
      estimatedCost: totalKwh * electricityPrice,
      efficiencyLabel: `${efficiency.combined_mpge} combined MPGe`,
    };
  }

  const gallonsUsed = MILES_TO_ANALYZE / efficiency.combined_mpg;
  return {
    energyType: 'gasoline',
    unitsConsumed: gallonsUsed,
    estimatedCost: gallonsUsed * gasPrice,
    efficiencyLabel: `${efficiency.combined_mpg} combined MPG`,
  };
}

/**
 * Ownership utility component that translates efficiency into a concrete
 * 10,000-mile spend estimate. The output shape is intentionally simple so it
 * can later feed charting libraries or comparison tables.
 */
function CostPerMileCalculator({ vehicle }) {
  const [gasPrice, setGasPrice] = useState(3.5);
  const [electricityPrice, setElectricityPrice] = useState(0.16);

  const result = useMemo(
    () => calculateCostEstimate(vehicle, Number(gasPrice), Number(electricityPrice)),
    [vehicle, gasPrice, electricityPrice]
  );

  return (
    <section className="data-card calculator-card">
      <div className="panel-header">
        <div>
          <h3>Cost Per Mile Calculator</h3>
          <p>
            Estimate the energy cost to drive <strong>{MILES_TO_ANALYZE.toLocaleString()}</strong>{' '}
            miles using local energy pricing inputs.
          </p>
        </div>
      </div>

      <div className="calculator-grid">
        <label>
          Local gas price ($/gal)
          <input
            type="number"
            min="0"
            step="0.01"
            value={gasPrice}
            onChange={(event) => setGasPrice(event.target.value)}
          />
        </label>

        <label>
          Local electricity cost ($/kWh)
          <input
            type="number"
            min="0"
            step="0.01"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(event.target.value)}
          />
        </label>
      </div>

      <div className="calculator-result">
        <p className="result-label">Estimated energy spend</p>
        <strong>${result.estimatedCost.toFixed(0)}</strong>
        <p>
          Based on {result.efficiencyLabel}, this vehicle would consume approximately{' '}
          <strong>
            {result.unitsConsumed.toFixed(1)} {result.energyType === 'electricity' ? 'kWh' : 'gallons'}
          </strong>{' '}
          over {MILES_TO_ANALYZE.toLocaleString()} miles.
        </p>
      </div>
    </section>
  );
}

export default CostPerMileCalculator;
