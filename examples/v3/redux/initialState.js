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
        'a',
        'b',
        'c',
        'd',
        'e',
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
    a: {
      type: 'STEP',
    },
    b: {
      type: 'STEP',
    },
    c: {
      type: 'STEP',
    },
    d: {
      type: 'STEP',
    },
    e: {
      type: 'STEP',
    },
  },
  selection: [],
}

export default initial
