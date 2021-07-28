import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "../scss/Characters.scss";
import { checkIfAlive, checkForName } from "../functions";

const Characters = ({ characters }) => {
  const [params, setParams] = useState(null)

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
          <td>
            <Link onClick={(e) => setParams(e.target.innerHTML)} to={`/house/${params}`} style={{ textDecoration: "none" }}>
              {houseId.length > 1 ? `${houseId}` : houseId}{" "}
            </Link>
          </td>
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
