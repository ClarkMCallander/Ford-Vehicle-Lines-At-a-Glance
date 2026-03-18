import { useMemo, useState } from 'react';
import VehicleList from './VehicleList';
import VehicleDetailView from './VehicleDetailView';

/**
 * Coordinates the vehicle dataset, active filters, and the selected vehicle.
 * This top-level state layout makes it easy to add charting, URL sync,
 * or remote API data sources later.
 */
function VehicleDashboard({ initialVehicles }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicles[0]?.id ?? null);
  const [powertrainFilter, setPowertrainFilter] = useState('ALL');
  const [tagFilter, setTagFilter] = useState('ALL');

  const availableTags = useMemo(() => {
    const tags = new Set();
    initialVehicles.forEach((vehicle) => {
      vehicle.smart_tags.forEach((tag) => tags.add(tag));
    });
    return ['ALL', ...Array.from(tags).sort()];
  }, [initialVehicles]);

  const filteredVehicles = useMemo(() => {
    return initialVehicles.filter((vehicle) => {
      const matchesPowertrain =
        powertrainFilter === 'ALL' || vehicle.core_specs.powertrain_type === powertrainFilter;
      const matchesTag = tagFilter === 'ALL' || vehicle.smart_tags.includes(tagFilter);
      return matchesPowertrain && matchesTag;
    });
  }, [initialVehicles, powertrainFilter, tagFilter]);

  const selectedVehicle = useMemo(() => {
    const matchingVehicle = filteredVehicles.find((vehicle) => vehicle.id === selectedVehicleId);
    return matchingVehicle ?? filteredVehicles[0] ?? null;
  }, [filteredVehicles, selectedVehicleId]);

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Ford Vehicle Lines at a Glance</p>
          <h1>Analytical Vehicle Comparison Dashboard</h1>
          <p className="dashboard-subtitle">
            Compare Ford nameplates through specs, engineering context, and cost-per-mile
            ownership signals.
          </p>
        </div>
      </header>

      <section className="dashboard-layout">
        <VehicleList
          vehicles={filteredVehicles}
          selectedVehicleId={selectedVehicle?.id}
          onSelectVehicle={setSelectedVehicleId}
          powertrainFilter={powertrainFilter}
          onPowertrainFilterChange={setPowertrainFilter}
          tagFilter={tagFilter}
          onTagFilterChange={setTagFilter}
          availableTags={availableTags}
        />

        <VehicleDetailView vehicle={selectedVehicle} />
      </section>
    </main>
  );
}

export default VehicleDashboard;
