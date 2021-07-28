export const checkIfAlive = (ifBorn, ifDied, character) => {
  const { died, born } = character;

  let deathAge;
  let deathMsg;

  if (ifBorn && ifDied) {
    let bornYear = born.split(" ");
    let deathYear = died.split(" ");
    let parseBornYear = [];
    let parseDeathYear = [];

    bornYear.forEach((age) => {
      if (parseInt(age)) {
        parseBornYear.push(parseInt(age));
      }
    });

    deathYear.forEach((age) => {
      if (parseInt(age)) {
        parseDeathYear.push(parseInt(age));
      }
    });

    if (parseBornYear[0] && parseDeathYear[0]) {
      deathAge = parseDeathYear[0] - parseBornYear[0];
      deathMsg = `No, died at ${deathAge} years old`;
    } else {
      deathMsg = "Died " + died;
    }
  } else if (ifBorn && !ifDied) {
    deathMsg = "Yes";
  } else if (!ifBorn && !ifDied) {
    deathMsg = "Yes";
  } else {
    deathMsg = "Died " + died;
  }

  return deathMsg;
};

export const checkForName = (ifName, ifAliases, character) => {
  const { name, aliases } = character;

  let nameMsg;

  if (ifAliases && ifName) {
    nameMsg = `${name}, ${aliases}`;
  } else if (ifName && !ifAliases) {
    nameMsg = name;
  } else {
    nameMsg = aliases;
  }

  return nameMsg;
};
