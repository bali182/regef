export const normalContainerStyle = {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: '2px',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  cursor: 'default',
  backgroundColor: '#fff',
}

export const selectedContainerStyle = {
  ...normalContainerStyle,
  border: '1px solid #006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}

export const normalTitleStyle = {
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  padding: '5px 10px',
  textAlign: 'center',
  borderBottom: '1px solid #ccc',
  minHeight: '20px',
  width: '100%',
  userSelect: 'none',
  MozUserSelect: 'none',
  fontSize: '26px',
  fontWeight: '400',
}

export const selectedTitleStyle = {
  ...normalTitleStyle,
  borderBottom: '1px solid #006db6',
}

export const laneStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 12px',
  minHeight: '30px',
}
