import "./styles.scss";
import SearchBar from "./SearchBar";
import countryData from "./country.json";
// import names from "./names.json";
import { useEffect, useState } from 'react';

const termFinder = (term) => {
  return countryData.filter((d) =>
    d.country.toLowerCase().startsWith(term.toLowerCase())
  );
};
export default function App() {
  const [data, setData] = useState([]);

  const fetchData = async (q) => {
    const r = await fetch(`/api/v1/names?q=${q}`)
      .then(d => d.json())
      .then(d => {
          setData(d.data);
          return d.data;
      });
    return r;
  }
  const nameFinder = async (term) => {
    let _data = data;
    if (term.length == 1) {
      _data = await fetchData(term[0]);
    }
    return _data.filter((d) => {
      return d.firstname.toLowerCase().startsWith(term.toLowerCase());
    });
  };

  return (
    <div className="App">
      {termFinder !== null && (
        //<SearchBar searchFunc={termFinder}
         // fields={["region", "country"]} placeholder="search country..." />
        <SearchBar
          searchFunc={nameFinder}
          placeholder="search name..."
          fields={["firstname", "lastname"]} />
      )}
    </div>
  );
}
