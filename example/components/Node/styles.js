export const normalNodeStyle = {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 16px',
  border: '1px solid #ccc',
  borderRadius: '2px',
  height: '30px',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  MozUserSelect: 'none',
  cursor: 'default',
  backgroundColor: '#fff',
  fontSize: '25px',
  fontWeight: '400',
}

export const selectedNodeStyle = {
  ...normalNodeStyle,
  border: '1px solid #006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}
