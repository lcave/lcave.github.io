import { availableCommands } from "./commandInterpreter";

const getUniqueCommandStrings = (history) => {
  return [
    ...new Set(
      history.map((c) => c.commandString.replace("command not found: ", ""))
    ),
  ];
};

const getLastCommand = (direction, currentCommandString, history) => {
  const commandHistory = getUniqueCommandStrings(history);
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

const autocomplete = (
  currentCommandString,
  currentOptions,
  setInputStringCallback,
  setAutocompleteOptionsCallback
) => {
  if (currentOptions.length > 0) {
    let index = currentCommandString
      ? currentOptions.indexOf(currentCommandString) + 1
      : 0;
    setInputStringCallback(currentOptions[index]);
    return;
  }

  const matchingCommands = availableCommands().filter((c) =>
    c.startsWith(currentCommandString)
  );

  if (matchingCommands.length === 1) {
    setInputStringCallback(matchingCommands[0]);
  } else if (matchingCommands.length > 0) {
    setAutocompleteOptionsCallback(matchingCommands);
  }
};

export { getLastCommand, autocomplete };
