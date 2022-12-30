import * as ReactDOMServer from 'react-dom/server';
import TestCommand from '../components/commands/TestCommand';

const executeCommand = (commandString) => {
  pushCommandToHistory(
    { commandString: commandString, result: ReactDOMServer.renderToString(<TestCommand />) }
  )
  return getCommandHistory()
}

const pushCommandToHistory = (command) => {
  localStorage.setItem("commandHistory", JSON.stringify([...getCommandHistory(), command]))
}

const getCommandHistory = () => {
  return JSON.parse(localStorage.getItem("commandHistory")) || []
}

export { executeCommand, getCommandHistory }