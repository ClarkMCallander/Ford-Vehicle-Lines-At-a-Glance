import { useMemo, useState } from 'react';
import vehiclesData from '../data/vehicles.json';
import VehicleDetailView from './VehicleDetailView';
import VehicleList from './VehicleList';

export default function VehicleDashboard() {
  const [selectedPowertrain, setSelectedPowertrain] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehiclesData[0].id);

  const availableTags = useMemo(() => {
    return [...new Set(vehiclesData.flatMap((vehicle) => vehicle.smart_tags))].sort();
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehiclesData.filter((vehicle) => {
      const matchesPowertrain =
        selectedPowertrain === 'All' || vehicle.core_specs.powertrain_type === selectedPowertrain;
      const matchesTag = selectedTag === 'All' || vehicle.smart_tags.includes(selectedTag);
      return matchesPowertrain && matchesTag;
    });
  }, [selectedPowertrain, selectedTag]);

  const selectedVehicle = useMemo(() => {
    const stillVisible = filteredVehicles.find((vehicle) => vehicle.id === selectedVehicleId);
    return stillVisible ?? filteredVehicles[0] ?? vehiclesData[0];
  }, [filteredVehicles, selectedVehicleId]);

  return (
    <div className="dashboard-shell">
      <VehicleList
        vehicles={filteredVehicles}
        selectedVehicleId={selectedVehicle?.id}
        selectedPowertrain={selectedPowertrain}
        selectedTag={selectedTag}
        availableTags={availableTags}
        onPowertrainChange={setSelectedPowertrain}
        onTagChange={setSelectedTag}
        onSelectVehicle={setSelectedVehicleId}
      />
      {selectedVehicle ? (
        <VehicleDetailView vehicle={selectedVehicle} />
      ) : (
        <main className="vehicle-detail-view empty-state panel">
          <h2>No vehicles match the current filters.</h2>
          <p>Adjust powertrain or smart-tag criteria to restore results.</p>
        </main>
      )}
    </div>
  );
}
