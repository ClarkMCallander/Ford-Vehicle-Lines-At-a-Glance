const powertrainFilters = ['All', 'ICE', 'HEV', 'BEV'];

export default function VehicleList({
  vehicles,
  selectedVehicleId,
  selectedPowertrain,
  selectedTag,
  availableTags,
  onPowertrainChange,
  onTagChange,
  onSelectVehicle,
}) {
  return (
    <aside className="vehicle-list panel">
      <div className="section-heading">
        <h2>Vehicle Explorer</h2>
        <p>Filter Ford's lineup by propulsion strategy and ownership scenario.</p>
      </div>

      <div className="filters">
        <label>
          Powertrain
          <select value={selectedPowertrain} onChange={(event) => onPowertrainChange(event.target.value)}>
            {powertrainFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </label>

        <label>
          Smart tag
          <select value={selectedTag} onChange={(event) => onTagChange(event.target.value)}>
            <option value="All">All</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="vehicle-card-list">
        {vehicles.map((vehicle) => {
          const isSelected = vehicle.id === selectedVehicleId;
          return (
            <button
              key={vehicle.id}
              type="button"
              className={`vehicle-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectVehicle(vehicle.id)}
            >
              <div>
                <h3>
                  {vehicle.core_specs.year} {vehicle.core_specs.model}
                </h3>
                <p>{vehicle.core_specs.powertrain_type}</p>
              </div>
              <div>
                <strong>${vehicle.core_specs.starting_msrp.toLocaleString()}</strong>
                <span>{vehicle.smart_tags[0]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
