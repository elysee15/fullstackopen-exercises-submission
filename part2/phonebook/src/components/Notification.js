const Notification = ({type, message}) => {
  if (message === ''){
      return '';
  }
  return (
      <div className={type}>
          {message}
      </div>
  )
}

export default Notification