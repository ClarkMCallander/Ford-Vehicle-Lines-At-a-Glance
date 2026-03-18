import CostPerMileCalculator from './CostPerMileCalculator';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function MetricCard({ label, value }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default function VehicleDetailView({ vehicle }) {
  const { core_specs, analytical_data, engineering_details, smart_tags } = vehicle;
  const efficiency = analytical_data.epa_estimated_mpg;

  return (
    <main className="vehicle-detail-view">
      <section className="hero panel">
        <div>
          <p className="eyebrow">{core_specs.make} analytical profile</p>
          <h1>
            {core_specs.year} {core_specs.model}
          </h1>
          <p className="hero-copy">
            Compare MSRP, capability, efficiency, and engineering highlights in a single dashboard
            view designed to support future charts and deeper side-by-side analysis.
          </p>
        </div>
        <div className="hero-price-block">
          <span>Starting MSRP</span>
          <strong>{formatCurrency(core_specs.starting_msrp)}</strong>
          <small>Fully loaded: {formatCurrency(core_specs.fully_loaded_msrp)}</small>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Powertrain" value={core_specs.powertrain_type} />
        <MetricCard label="Seating" value={`${core_specs.seating_capacity} passengers`} />
        <MetricCard label="Cargo Volume" value={`${core_specs.cargo_volume_cu_ft} cu ft`} />
        <MetricCard label="Ground Clearance" value={`${core_specs.ground_clearance_inches} in`} />
        <MetricCard label={`EPA ${efficiency.unit}`} value={`${efficiency.combined} combined`} />
        <MetricCard label="Max Towing" value={`${analytical_data.max_towing_lbs.toLocaleString()} lbs`} />
      </section>

      <section className="detail-grid">
        <section className="panel">
          <div className="section-heading">
            <h3>Core specs</h3>
            <p>Baseline product positioning for lineup comparison and filtering.</p>
          </div>
          <ul className="detail-list">
            <li><span>Trim levels</span><strong>{core_specs.trim_levels.join(', ')}</strong></li>
            <li><span>Payload</span><strong>{analytical_data.max_payload_lbs.toLocaleString()} lbs</strong></li>
            <li><span>Battery capacity</span><strong>{analytical_data.battery_capacity_kwh ? `${analytical_data.battery_capacity_kwh} kWh` : 'N/A'}</strong></li>
            <li><span>Assembly plant</span><strong>{engineering_details.assembly_plant}</strong></li>
            <li><span>Platform</span><strong>{engineering_details.platform_architecture}</strong></li>
          </ul>
        </section>

        <section className="panel">
          <div className="section-heading">
            <h3>Depreciation outlook</h3>
            <p>Structured for future chart components and retained-value trend visuals.</p>
          </div>
          <div className="depreciation-grid">
            {analytical_data.depreciation_estimates.map((entry) => (
              <article key={entry.year} className="metric-card depreciation-card">
                <span>Year {entry.year}</span>
                <strong>{entry.retained_value_percent}% retained value</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <h3>Engineering highlights</h3>
            <p>Distinctive features that shape use cases and buyer segmentation.</p>
          </div>
          <ul className="tag-list">
            {engineering_details.unique_features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="section-heading">
            <h3>Smart tags</h3>
            <p>Scenario tags make it easy to build future recommendation flows.</p>
          </div>
          <div className="smart-tag-row">
            {smart_tags.map((tag) => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        </section>
      </section>

      <CostPerMileCalculator vehicle={vehicle} />
    </main>
  );
}
