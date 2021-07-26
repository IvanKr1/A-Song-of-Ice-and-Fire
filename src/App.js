import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./components/Heading";
import SearchField from "./components/SearchField";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";
import Select from "./components/Select";
import "./scss/App.scss";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [culture, setCulture] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGender, setCurrentGender] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://www.anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=25`
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
  }, [currentPage]);

  const onSearchCulture = (value) => {
    setCulture(value);
  };

  const getFirstPage = async () => {
    setCurrentPage(1);
  };

  const getLastPage = async () => {
    setCurrentPage(214);
  };

  const getPreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPage = async () => {
    if (currentPage < 214) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSelectGender = (value) => {
    setCurrentGender(value);
  };

  const filterCharacters = characters.filter((character) => {
    if (currentGender.length !== 0 && culture.length !== 0) {
      if (currentGender === "All") return character;
      return (
        character.culture.toLowerCase().includes(culture.toLowerCase()) &&
        character.gender.toLowerCase() === currentGender.toLowerCase()
      );
    } else if(currentGender.length !== 0 && culture.length === 0) {
      if (currentGender === "All") return character;
      return character.gender.toLowerCase() === currentGender.toLowerCase();
    } else {
      return character.culture.toLowerCase().includes(culture.toLowerCase())
    }
  });

  const selectOptions = ["All", "Female", "Male", "Unknown"];

  return (
    <div className="App">
      <Heading />
      <SearchField onSearchCulture={onSearchCulture} />
      <Select options={selectOptions} onChange={onSelectGender} />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Characters characters={filterCharacters} />
          <Pagination
            onClickFirstPage={getFirstPage}
            onClickLastPage={getLastPage}
            onClickPreviousPage={getPreviousPage}
            onClickNextPage={getNextPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
