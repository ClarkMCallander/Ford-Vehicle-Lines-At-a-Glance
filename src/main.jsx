import React from 'react';
import ReactDOM from 'react-dom/client';
import VehicleDashboard from './components/VehicleDashboard';
import vehicles from './data/vehicles.json';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VehicleDashboard initialVehicles={vehicles} />
  </React.StrictMode>
);
