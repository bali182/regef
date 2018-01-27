export const normalNodeStyle = {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 10px',
  border: '1px solid #ddd',
  borderRadius: '2px',
  height: '30px',
  fontSize: '.8em',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  cursor: 'default',
}

export const selectedNodeStyle = {
  ...normalNodeStyle,
  borderColor: '#006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}
