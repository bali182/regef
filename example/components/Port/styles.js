export const normalPortStyle = {
  display: 'flex',
  flexDirection: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  cursor: 'default',
  width: 25,
  height: 25,
  userSelect: 'none',
  MozUserSelect: '-moz-none',
  position: 'absolute',
  backgroundColor: 'white',
  color: '#666',
  border: '1px solid #bbb',
  textAlign: 'center',
  right: -12.5,
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'opacity 0.5s ease',
  fontSize: '16px',
  zIndex: 10,
}

export const hiddenPortStyle = {
  ...normalPortStyle,
  opacity: 0,
}
