import React from "react";
import { Link } from "react-router-dom";
import "../scss/CharactersTable.scss";

import { checkIfAlive, checkForName } from "../functions";

const CharactersTable = ({ characters }) => {
  const renderAllegiancesLink = (houseId) => {
    if (houseId.length > 1) {
      const multipleAllegiances = houseId.map((id, index) => {
        return (
          <Link className='charactersTable__link' key={index} to={`/house/${id}`} style={{ textDecoration: "none" }}>
            {`${id} `}
          </Link>
        );
      });

      return multipleAllegiances;
    } else {
      return (
        <Link className='charactersTable__link' to={`/house/${houseId}`} style={{ textDecoration: "none" }}>
          {houseId}
        </Link>
      );
    }
  };

  const renderCharacters = () =>
    characters.map((character, index) => {
      const { name, aliases, died, born, gender, culture, allegiances, books } =
        character;

      // Check for name
      let ifNameExists = name.length > 0;
      let ifAliasesExists = aliases[0].length > 0;
      let checkName = checkForName(ifNameExists, ifAliasesExists, character);

      // Check for age
      let ifBornExist = born.length > 0;
      let ifDiedExist = died.length > 0;
      const isAlive = checkIfAlive(ifBornExist, ifDiedExist, character);

      let houseId = [];

      if (allegiances.length !== 0) {
        for (const url of allegiances) {
          houseId.push(url.slice(url.lastIndexOf("/") + 1, url.length));
        }
      }

      return (
        <tr key={index}>
          <td>{checkName}</td>
          <td>{isAlive}</td>
          <td>{gender}</td>
          <td>{culture.length > 0 ? culture : "Unknown"}</td>
          <td>{renderAllegiancesLink(houseId)}</td>
          <td>{books.length}</td>
        </tr>
      );
    });

  return (
    <>
      <table className="charactersTable__table">
        <thead>
          <tr>
            <th>Character</th>
            <th>Alive</th>
            <th>Gender</th>
            <th>Culture</th>
            <th>Allegiances</th>
            <th># of Books</th>
          </tr>
        </thead>
        <tbody>{renderCharacters()}</tbody>
      </table>
    </>
  );
};

export default CharactersTable;
