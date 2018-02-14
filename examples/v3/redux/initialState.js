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
        'filter',
        'map',
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
    filter: {
      type: 'STEP',
    },
    map: {
      type: 'STEP',
    },
    reduce: {
      type: 'STEP',
    },
  },
  selection: [],
}

export default initial
