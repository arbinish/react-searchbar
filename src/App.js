import "./styles.scss";
import SearchBar from "./SearchBar";
import countryData from "./country.json";
import names from "./names.json";

const nameFinder = (term) => {
  return names.filter((d) => {
    return d.firstname.toLowerCase().startsWith(term.toLowerCase());
  });
};

const termFinder = (term) => {
  return countryData.filter((d) =>
    d.country.toLowerCase().startsWith(term.toLowerCase())
  );
};
export default function App() {
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
