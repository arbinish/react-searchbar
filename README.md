# react
Just another searchbar using React.


## Usage

Component is SearchBar. Import using

```js
import SearchBar from './SearchBar';
```

### Input Data
Input data is expected to be an array of objects. Search result can be further customized
using the `fields` prop, by providing an array of strings from the input data.

### Properties

 Property | Value
---|---
| searchFunc | A function that accepts a term (string) and returns an array of records |
| placeholder | Placeholder text to display in search input box |
| fields | fields in the input set of records to display |

### Example
Assuming the data is
```js
const data = [{"country": xxx, "capital": xxx}, ...]
```
Initiate _SearchBar_ component using
```js
const countryFinder = (term) => {
    return data.filter( e =>
    e.country.toLowerCase().startsWith(term.toLowerCase()))
}

<SearchBar
    searchFunc={countryFinder}
    placeholder="Search Country..."
    fields={["country", "capital"]}/>
```

### Styling

CSS Class | Purpose
--- | ---
.SearchWrapper | DOM Node that wraps input and svg logs
.svg-search | search log (lens)
.svg-close | close or dismiss selected item (x)
.SearchResults | search result entries that matches the current term



### Dev guide

Use the python web service api.py as a simple rest endpoint. Ensure you have flask installed.
1. cd src; python ./api.py
2. npm start

Open the url listed in the output of npm start.
