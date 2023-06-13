// funktion för generera ett random id.
function generateRandomId() {
  return Math.round(Math.random() * 1000000000);
}

// funktion som kollar om medelandet är giltig.
function isValidMessage(m) {
  return m.message !== "";
}



// funktion som kollar om id är giltig.
function isValidId(id) {
  let maybeId = Number(id);

  if (isNaN(maybeId)) {
    return false;
  }
  return maybeId >= 0;
}

// funktion som kollar om en ny användar som läggs till är giltig.
function isValidUser(u) {
  if (typeof u !== "object" || u === null) {
    return false;
  }

  let nameIsValid = typeof u.name === "string";
  nameIsValid = nameIsValid && u.name !== "";
  let passwordIsValid = typeof u.password === "string";
  passwordIsValid = passwordIsValid && u.password !== "";

  if (!nameIsValid) {
    return false;
  } else if (!passwordIsValid) {
    return false;
  }

  return true;
}

export { generateRandomId, isValidMessage, isValidId, isValidUser };
