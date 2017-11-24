const initial = {
  root: {
    x: 0,
    y: 0,
    children: [
      'a',
      'b',
      'd',
    ],
  },
  a: {
    x: 300,
    y: 100,
    children: [
      'c',
    ],
  },
  b: {
    x: 0,
    y: 0,
    children: [],
  },
  c: {
    x: 0,
    y: 0,
    children: [],
  },
  d: {
    x: 100,
    y: 100,
    children: [],
  },
}

export default initial
