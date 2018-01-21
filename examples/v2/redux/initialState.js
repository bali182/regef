const initial = {
  nodes: {
    root: {
      x: 0,
      y: 0,
      children: [
        'a',
        'b',
        'c',
        'd',
        'e',
      ],
      connections: [],
    },
    a: {
      color: 'green',
      x: 220,
      y: 100,
      children: [],
      connections: ['b'],
    },
    b: {
      color: 'yellow',
      x: 50,
      y: 70,
      children: [],
      connections: [],
    },
    c: {
      color: 'red',
      x: 0,
      y: 0,
      children: [],
      connections: [],
    },
    d: {
      color: 'coral',
      x: 10,
      y: 150,
      children: [],
      connections: [],
    },
    e: {
      color: 'cyan',
      x: 200,
      y: 30,
      children: [],
      connections: ['c'],
    },
  },
  selection: [],
}

export default initial
