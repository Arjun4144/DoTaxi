import React from "react";

const LocationSearchPanel = (props) => {
  // sample array location
  const locations = [
    "20A,near kapoor's cafe,school of coding",
    "21B,near raju's cafe,school of coding",
    "22C,near lalit's cafe,school of coding",
    "23D,near haalu's cafe,school of coding",
  ];

  return (
    <div>
      {/* sample data */}
      {locations.map(function(elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-grey-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
