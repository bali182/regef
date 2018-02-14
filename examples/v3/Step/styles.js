export const normalStepStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3px 5px',
  textAlign: 'center',
  borderRadius: '2px',
  userSelect: 'none',
  MozUserSelect: 'none',
  fontSize: '.8em',
  minWidth: '40px',
  minHeight: '40px',
  border: '1px solid #ccc',
  cursor: 'default',
  margin: '7px',
  backgroundColor: '#fff',
}

export const selectedStepStyle = {
  ...normalStepStyle,
  border: '1px solid #006db6',
  boxShadow: '0px 0px 20px -5px #006db6',
}
