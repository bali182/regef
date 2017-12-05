export const buildDeltas = ({ clientX, clientY }, element) => {
  const { top, left } = element.getBoundingClientRect()
  const deltaX = clientX - left
  const deltaY = clientY - top
  return {
    deltaX,
    deltaY,
  }
}

export const buildCoordinates = ({ clientX, clientY }, { deltaX, deltaY }) => ({
  x: clientX - deltaX,
  y: clientY - deltaY,
})
