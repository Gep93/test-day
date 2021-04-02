import React from "react";
import "./App.css";
import VehicleData from "./VehicleData/index";
import Header from "./Common/Header";
import { CopyProvider } from "./contexts/CopyContext";

function App() {
  return (
    <div className="App">
      <CopyProvider>
        <Header>Test-App</Header>
        <VehicleData numPages={10} />
      </CopyProvider>
    </div>
  );
}

export default App;
