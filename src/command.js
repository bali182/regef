const noop = () => { }

const isExecutable = (command) => command !== null

const composeCommandsArray = (commands) => {
  switch (commands.length) {
    case 0: return noop
    case 1: return commands[0]
    default: return () => {
      for (let i = 0; i < commands.length; i += 1) {
        const command = commands[i]
        command()
      }
    }
  }
}

export const compose = (commands) => composeCommandsArray(commands.filter(isExecutable))
