function generateRandomId() {
  return Math.round(Math.random() * 1000000000)
}

function isValidMessage(m) {
  let messageIsValid = m.message !== ""
  
  if(!messageIsValid) {
    return false
  }

  return true
}

export {generateRandomId, isValidMessage}