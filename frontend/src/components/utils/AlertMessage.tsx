import React from "react"

interface AlertMessageProps {
  open: boolean
  setOpen: Function
  severity: "error" | "success" | "info" | "warning"
  message: string
}

const AlertMessage = ({ open, setOpen, severity, message }: AlertMessageProps) => {
  const handleCloseAlertMessage = () => {
    setOpen(false)
  }

  if (!open) return null

  const alertStyles: React.CSSProperties = {
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '4px',
    color: '#fff',
    position: 'fixed',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    minWidth: '300px',
    textAlign: 'center',
  }

  switch (severity) {
    case "error":
      alertStyles.backgroundColor = '#f44336'
      break
    case "success":
      alertStyles.backgroundColor = '#4caf50'
      break
    case "info":
      alertStyles.backgroundColor = '#2196f3'
      break
    case "warning":
      alertStyles.backgroundColor = '#ff9800'
      break
  }

  return (
    <div style={alertStyles} onClick={handleCloseAlertMessage}>
      {message}
    </div>
  )
}

export default AlertMessage
