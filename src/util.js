import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#ff073a",
    rgb: "rgb(220, 53, 69)",
    half_op: "rgba(220, 53, 69, 0.5)",
    multiplier: 400,
  },
  recovered: {
    hex: "#28a745",
    rgb: "rgb(40, 167, 69)",
    half_op: "rgba(40, 167, 69, 0.5)",
    multiplier: 600,
  },
  deaths: {
    hex: "#6c757d",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1000,
  },
  active: {
    hex: "#007bff",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 800,
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintStatTotal = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered:{numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths:{numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
