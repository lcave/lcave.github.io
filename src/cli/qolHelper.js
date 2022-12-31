const getLastCommand = (direction, currentCommandString, history) => {
  const commandHistory = [...new Set(history.map((c) => c.commandString))];
  const indexOfCommand = commandHistory.findIndex(
    (c) => c === currentCommandString
  );

  if (direction === "up") {
    return commandHistory.at(
      indexOfCommand === -1 ? -1 : Math.max(0, indexOfCommand - 1)
    );
  }
  if (direction === "down") {
    if (indexOfCommand === -1) {
      return "";
    } else {
      const command = commandHistory.at(indexOfCommand + 1);
      return command || "";
    }
  }
};

export { getLastCommand };
