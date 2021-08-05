import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./components/Heading";
import SearchField from "./components/SearchField";
import CharactersTable from "./components/CharactersTable";
import Pagination from "./components/Pagination";
import Select from "./components/Select";
import HouseDetails from "./pages/HouseDetails";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./scss/App.scss";

const selectGenderOptions = ["All", "Female", "Male", "Unknown"];
const selectResultsByPage = [10, 25, 50];

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentCulture, setCurrentCulture] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGender, setCurrentGender] = useState("");
  const [resultsByPage, setResultsByPage] = useState(10);
  const [maxPageLength, setMaxPageLength] = useState(214);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://www.anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=${resultsByPage}`
      );

      for (const character of res.data) {
        if (character.gender === "") {
          character.gender = "Unknown";
        }
      }

      setCharacters(res.data);
      setLoading(false);
    };

    fetchCharacters();
  }, [currentPage, resultsByPage]);

  const onSearchCulture = (value) => {
    setCurrentCulture(value);
  };

  const getFirstPage = () => {
    setCurrentPage(1);
  };

  const getLastPage = () => {
    switch (resultsByPage) {
      case "25":
        setCurrentPage(86)
        break;
      case "50":
        setCurrentPage(43)
      break;
      default:
        setCurrentPage(214)
        break;
    }
  };

  const getPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPage = () => {
    if (currentPage < maxPageLength) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSelectGender = (value) => {
    value === "All" ? setCurrentGender("") : setCurrentGender(value);
  };

  const onSelectResultsPerPage = (value) => {
    switch (value) {
      case "25":
        setMaxPageLength(86)
        break;
      case "50":
        setMaxPageLength(43)
      break;
      default:
        setMaxPageLength(214)
        break;
    }

    setResultsByPage(value);
    setCurrentPage(1)
  };


  const filterCharacters = characters.filter((character) => {
    const { culture, gender } = character;

    let isCurrentGender = currentGender.length !== 0;
    let isCurrentCulture = currentCulture.length !== 0;

    if (isCurrentGender && isCurrentCulture) {
      return (
        culture.toLowerCase().includes(currentCulture.toLowerCase()) &&
        gender.toLowerCase() === currentGender.toLowerCase()
      );
    } else if (isCurrentGender && !isCurrentCulture) {
      return currentGender === ""
        ? character
        : currentGender.toLowerCase() === gender.toLowerCase();
    } else {
      return culture.toLowerCase().includes(currentCulture.toLowerCase());
    }
  });

  return (
    <Router>
      <div className="App">
        <Heading />
        <Route exact path="/">
          <SearchField onSearchCulture={onSearchCulture} value={currentCulture}/>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="app__selectPagination">
                <Pagination
                  onClickFirstPage={getFirstPage}
                  onClickLastPage={getLastPage}
                  onClickPreviousPage={getPreviousPage}
                  onClickNextPage={getNextPage}
                />
                <Select
                  label="Filter By Gender"
                  options={selectGenderOptions}
                  onChange={onSelectGender}
                  value={currentGender}
                />
              </div>
              <CharactersTable characters={filterCharacters} />
            </>
          )}
          <div
            className={
              loading
                ? "loading app__select__characters"
                : "app__select__characters"
            }
          >
            <Select
              label="Characters Per Page"
              options={selectResultsByPage}
              onChange={onSelectResultsPerPage}
              value={resultsByPage}
            />
          </div>
        </Route>
        <Route exact path="/house/:houseId" component={HouseDetails} />
      </div>
    </Router>
  );
};

export default App;
