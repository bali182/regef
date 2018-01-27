const initial = {
  components: {
    root: {
      type: 'ROOT',
      children: [
        'input',
        'transform',
        'output',
      ],
    },
    input: {
      type: 'NODE',
      x: 10,
      y: 10,
      connections: [
        'transform',
      ],
    },
    transform: {
      type: 'CONTAINER',
      x: 100,
      y: 100,
      children: [
        'map',
        'filter',
        'reduce',
      ],
      connections: [
        'output',
      ],
    },
    output: {
      type: 'NODE',
      x: 200,
      y: 10,
    },
    map: {
      type: 'STEP',
    },
    filter: {
      type: 'STEP',
    },
    reduce: {
      type: 'STEP',
    },
  },
  selection: [],
}

export default initial
