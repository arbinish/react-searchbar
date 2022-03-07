import { useState, useRef } from "react";
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";

export default function SearchBar({ searchFunc, fields, placeholder }) {
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(false);
  const textRef = useRef("");

  const closeHandler = (e) => {
    textRef.current.value = "";
    setSelected(false);
  };
  const clickHandler = (e, record) => {
    const val = fields.map((k) => record[k]);
    textRef.current.value = val.join(", ");
    setSelected(true);
    setShowResults(false);
  };
  const onChangeHandler = async (e) => {
    let term = e.target.value;
    if (term.length < 1) {
      setShowResults(false);
      setSelected(false);
    } else {
      // assign to local var and compare length
      // state change, ie `data` mutation, may be async
      let response = await searchFunc(term);
      setData(response);
      if (response.length > 0) {
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }
  };
  return (
    <>
      <div className="SearchWrapper">
        <FaSearch className="svg-search" />
        <input
          type="text"
          ref={textRef}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
        <FaRegTimesCircle
          onClick={closeHandler}
          className="svg-close"
          style={
            selected === true
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        />
      </div>
      {showResults === true && (
        <div className="SearchResults">
          <ul>
            {data.map((d, i) => (
              <li key={i} onClick={(e) => clickHandler(e, d)}>
                {fields.map((f) => (
                  <p key={`${f}_${i}`}> {d[f]} </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
