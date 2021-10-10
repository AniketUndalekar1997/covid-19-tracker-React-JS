import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.8076,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const worldStat = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => setCountryInfo(data));
    };
    worldStat();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countriesObj = data.map((country) => ({
            name: country.country, // United States, France
            value: country.countryInfo.iso2, //UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countriesObj);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo?.lat, data.countryInfo?.long]);
        setMapZoom(4);
      });
  };

  console.log(mapCountries);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop through all countries and show a drop down */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Rocovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {mapCountries ? (
          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType="cases"
          />
        ) : (
          ""
        )}
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table  */}
          <Table countries={tableData} />
          <h3>worldwide new cases</h3>
          {/* Graph  */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
