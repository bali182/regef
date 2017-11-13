const composeCommandsArray = (commands) => () => {
  for (let i = 0; i < commands.length; i += 1) {
    commands[i]()
  }
}

const isExecutable = (command) => command !== null

export const compose = (...commands) => {
  let commandsArray = null
  if (commands.length === 1 && Array.isArray(commands[0])) {
    commandsArray = commands[0]
  } else {
    commandsArray = commands
  }
  return composeCommandsArray(commandsArray.filter(isExecutable))
}

export const first = (...commands) => {
  for (let i = 0; i < commands.length; i += 1) {
    const command = commands[i]
    if (isExecutable(command)) {
      return command
    }
  }
  return null
}