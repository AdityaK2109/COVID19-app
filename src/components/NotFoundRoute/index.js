import './index.css'

const NotFoundRoute = props => {
  const onClickHomeButton = () => {
    console.log(props)
    const {history} = props
    return history.replace('/')
  }

  return (
    <div className="not-found-page-container">
      <img
        src="https://res.cloudinary.com/adityak/image/upload/v1650132170/NotFoundImg_n2kxno.svg"
        alt="not-found-pic"
        className="not-found-img"
      />
      <h1 className="page-not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
      </p>
      <p className="not-found-description">Please go back to the homepage</p>
      <button type="button" className="home-button" onClick={onClickHomeButton}>
        Home
      </button>
    </div>
  )
}

export default NotFoundRoute
