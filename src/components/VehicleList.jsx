const POWERTRAIN_OPTIONS = ['ALL', 'ICE', 'HEV', 'PHEV', 'BEV'];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Sidebar list that doubles as the filtering surface.
 * It is intentionally presentation-focused so future data queries can be
 * connected above this component without rewrites.
 */
function VehicleList({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  powertrainFilter,
  onPowertrainFilterChange,
  tagFilter,
  onTagFilterChange,
  availableTags,
}) {
  return (
    <aside className="panel sidebar-panel">
      <div className="panel-header">
        <h2>Vehicle Explorer</h2>
        <p>Filter by propulsion strategy or real-world usage scenario.</p>
      </div>

      <div className="filter-group">
        <label htmlFor="powertrain-filter">Powertrain</label>
        <select
          id="powertrain-filter"
          value={powertrainFilter}
          onChange={(event) => onPowertrainFilterChange(event.target.value)}
        >
          {POWERTRAIN_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="tag-filter">Scenario Tag</label>
        <select id="tag-filter" value={tagFilter} onChange={(event) => onTagFilterChange(event.target.value)}>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="vehicle-list">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <button
              type="button"
              key={vehicle.id}
              className={`vehicle-card ${selectedVehicleId === vehicle.id ? 'is-selected' : ''}`}
              onClick={() => onSelectVehicle(vehicle.id)}
            >
              <div className="vehicle-card-topline">
                <span className="vehicle-year">{vehicle.core_specs.year}</span>
                <span className="vehicle-powertrain">{vehicle.core_specs.powertrain_type}</span>
              </div>
              <h3>
                {vehicle.core_specs.make} {vehicle.core_specs.model}
              </h3>
              <p className="vehicle-price">From {formatCurrency(vehicle.core_specs.starting_msrp)}</p>
              <div className="tag-row">
                {vehicle.smart_tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="tag-chip subdued">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))
        ) : (
          <div className="empty-state">
            <p>No vehicles match the active filters.</p>
            <p>Try broadening your powertrain or scenario selection.</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default VehicleList;
