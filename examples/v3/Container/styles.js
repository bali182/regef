export const normalContainerStyle = {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ddd',
  borderRadius: '2px',
  fontSize: '.8em',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  boxSizing: 'border-box',
  cursor: 'default',
}

export const selectedContainerStyle = {
  ...normalContainerStyle,
  borderColor: '#006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}

export const normalTitleStyle = {
  boxSizing: 'border-box',
  padding: '5px 10px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
  minHeight: '20px',
  width: '100%',
}

export const selectedTitleStyle = {
  ...normalTitleStyle,
  borderColor: '#006db6',
}

export const laneStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}
