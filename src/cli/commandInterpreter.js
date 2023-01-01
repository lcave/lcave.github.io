import * as ReactDOMServer from "react-dom/server";
import Cat from "../components/commands/Cat";
import { list, pwd } from "./navigator";

const executeCommand = async (command) => {
  if (!command) return getCommandHistory();
  const commandArr = command.split(" ");
  await interpretCommand(commandArr.shift(), commandArr);
  return getCommandHistory();
};

const pushCommandToHistory = (command, result) => {
  localStorage.setItem(
    "commandHistory",
    JSON.stringify([
      ...getCommandHistory(),
      { commandString: command, result: result },
    ])
  );
};

const getCommandHistory = () => {
  return JSON.parse(localStorage.getItem("commandHistory")) || [];
};

const availableCommands = () => {
  return Object.keys(COMMANDS).sort();
};

export {
  executeCommand,
  getCommandHistory,
  pushCommandToHistory,
  availableCommands,
};

const COMMANDS = {
  clear() {
    localStorage.setItem("commandHistory", null);
  },
  ls() {
    return list();
  },
  async cat(filename) {
    const path = "/" + pwd() + `/${filename}`;
    let res;
    try {
      res = await fetch(path);
    } catch (e) {
      return "Failed to fetch file";
    }
    if (res.status === 404) return "No such file or directory";
    const text = await res.text();
    return <Cat content={text} />;
  },
};

const interpretCommand = async (commandString, args) => {
  if (typeof COMMANDS[commandString] === "function") {
    const result = await COMMANDS[commandString](...args);
    if (result)
      pushCommandToHistory(
        commandString + ` ${args.join(" ")}`,
        renderResult(result)
      );
  } else {
    pushCommandToHistory("command not found: " + commandString, null);
  }
};

const renderResult = (component) => {
  return ReactDOMServer.renderToString(component);
};
