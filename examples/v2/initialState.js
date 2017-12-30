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
    },
    a: {
      color: 'green',
      x: 300,
      y: 100,
      children: [],
    },
    b: {
      color: 'blue',
      x: 50,
      y: 50,
      children: [],
    },
    c: {
      color: 'red',
      x: 0,
      y: 0,
      children: [],
    },
    d: {
      color: 'coral',
      x: 100,
      y: 100,
      children: [],
    },
    e: {
      color: 'cyan',
      x: 200,
      y: 70,
      children: [],
    },
  },
  connections: [
    {
      source: 'a',
      target: 'b',
    },
    {
      source: 'e',
      target: 'd',
    },
  ],
}

export default initial
