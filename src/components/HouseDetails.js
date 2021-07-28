import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../scss/HouseDetails.scss";

const HouseDetails = (props) => {
  const [houseDetails, setHouseDetails] = useState("");
  const houseId = props.match.params.houseId;

  useEffect(() => {
    const fetchHouse = async () => {
      const res = await axios.get(
        `https://www.anapioficeandfire.com/api/houses/${houseId}`
      );

      const {titles, seats} = res.data

      if (titles[0] === "") titles[0] = "Unknown"
      if (seats[0] === "") seats[0] = "Unknown"

      setHouseDetails(res.data);
    };

    fetchHouse();
  }, []);

//   console.log(`houseDetails`, );
//   console.log(`houseDetails`, houseDetails)
  const {
    name,
    words,
    coatOfArms,
    titles,
    seats,
    diedOut,
    cadetBranches,
    overlord,
    region
 } = houseDetails;


  return (
    <div className="houseDetails__container">
          <h1 className="houseDetails__heading">
            <span className="houseDetails__heading__span">House: {name}</span>
          </h1>
          <h4 className="houseDetails__subHeading">House Details</h4>
          <ul className="houseDetails__list__group">
            <li>
              Region: <span>{region ? region : "Unknown"}</span>
            </li>
            <li>
              Coat of Arms: <span>{coatOfArms}</span>
            </li>
            <li>
              Words: <span>{words ? words : "Unknown"}</span>
            </li>
            <li>
              Titles: <span>{`${titles}`}</span>
            </li>
            <li>
              Seats: <span>{ `${seats}`}</span>
            </li>
            <li>
              Has died out: <span>{diedOut ? diedOut : "Unknown"}</span>
            </li>
            <li>
              Has overlord:<span>{overlord ? " Yes" : " No"} </span>
            </li>
            <li>
              Number of Cadet Branches:<span> {cadetBranches ? cadetBranches.length : 0}</span>
            </li>
          </ul>
          <hr style={{ color: "#000" }} />
          <Link to="/" className="houseDetails__button__back">
            Back
          </Link>
    </div>
  );
};

export default HouseDetails;
