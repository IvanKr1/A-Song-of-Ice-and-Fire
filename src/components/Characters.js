import React from "react";
import "../scss/Characters.scss";
import { checkIfAlive, checkForAllegiances, checkForName } from "../functions";

const Characters = ({ characters }) => {
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

      return (
        <tr key={index}>
          <td>{checkName}</td>
          <td>{isAlive}</td>
          <td>{gender}</td>
          <td>{culture.length > 0 ? culture : "Unknown"}</td>
          <td>{"allegiances"}</td>
          <td>{books.length}</td>
        </tr>
      );
    });

  return (
    <div className="characters__container">
      <table className="characters__table">
        <tr>
          <th>Character</th>
          <th>Alive</th>
          <th>Gender</th>
          <th>Culture</th>
          <th>Allegiances</th>
          <th># of Books</th>
        </tr>
        {renderCharacters()}
      </table>
    </div>
  );
};

export default Characters;
