import CostPerMileCalculator from './CostPerMileCalculator';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value, suffix = '') {
  if (value === null || value === undefined) return 'N/A';
  return `${new Intl.NumberFormat('en-US').format(value)}${suffix}`;
}

function VehicleDetailView({ vehicle }) {
  if (!vehicle) {
    return (
      <section className="panel detail-panel empty-detail">
        <h2>No vehicle selected</h2>
        <p>Choose a Ford vehicle from the explorer to review its specs and ownership profile.</p>
      </section>
    );
  }

  const { core_specs: core, analytical_data: analytical, engineering_details: engineering } = vehicle;
  const efficiency = analytical.epa_estimated_mpg;

  return (
    <section className="panel detail-panel">
      <div className="detail-hero">
        <div>
          <p className="eyebrow">Selected vehicle</p>
          <h2>
            {core.year} {core.make} {core.model}
          </h2>
          <p className="dashboard-subtitle">
            Built for side-by-side analysis today, with a component structure that can support
            future chart layers, scoring models, and timeline views.
          </p>
        </div>
        <div className="hero-price-block">
          <span>MSRP range</span>
          <strong>
            {formatCurrency(core.starting_msrp)} - {formatCurrency(core.fully_loaded_msrp)}
          </strong>
        </div>
      </div>

      <div className="tag-row large-gap">
        {vehicle.smart_tags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>

      <div className="stats-grid">
        <article className="data-card">
          <h3>Core Specs</h3>
          <dl>
            <div><dt>Trim levels</dt><dd>{core.trim_levels.join(', ')}</dd></div>
            <div><dt>Seating</dt><dd>{formatNumber(core.seating_capacity)}</dd></div>
            <div><dt>Cargo volume</dt><dd>{formatNumber(core.cargo_volume_cu_ft, ' cu ft')}</dd></div>
            <div><dt>Ground clearance</dt><dd>{formatNumber(core.ground_clearance_inches, ' in')}</dd></div>
            <div><dt>Powertrain</dt><dd>{core.powertrain_type}</dd></div>
          </dl>
        </article>

        <article className="data-card">
          <h3>Analytical Data</h3>
          <dl>
            <div>
              <dt>Efficiency</dt>
              <dd>
                {efficiency.combined_mpge
                  ? `${efficiency.combined_mpge} combined MPGe / ${efficiency.range_miles} mi range`
                  : `${efficiency.combined_mpg} combined MPG`}
              </dd>
            </div>
            <div><dt>Battery capacity</dt><dd>{formatNumber(analytical.battery_capacity_kwh, ' kWh')}</dd></div>
            <div><dt>Payload</dt><dd>{formatNumber(analytical.max_payload_lbs, ' lbs')}</dd></div>
            <div><dt>Towing</dt><dd>{formatNumber(analytical.max_towing_lbs, ' lbs')}</dd></div>
            <div>
              <dt>Value retention</dt>
              <dd>
                {analytical.depreciation_estimates
                  .map((estimate) => `Year ${estimate.year}: ${estimate.retained_value_percent}%`)
                  .join(' • ')}
              </dd>
            </div>
          </dl>
        </article>

        <article className="data-card">
          <h3>Engineering Details</h3>
          <dl>
            <div><dt>Platform</dt><dd>{engineering.platform_architecture}</dd></div>
            <div><dt>Assembly plant</dt><dd>{engineering.assembly_plant}</dd></div>
            <div>
              <dt>Standout features</dt>
              <dd>
                <ul className="feature-list">
                  {engineering.unique_features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <CostPerMileCalculator vehicle={vehicle} />
    </section>
  );
}

export default VehicleDetailView;
