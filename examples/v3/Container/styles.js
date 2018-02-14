export const normalContainerStyle = {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: '2px',
  fontSize: '.8em',
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
  padding: '5px 7px',
}
