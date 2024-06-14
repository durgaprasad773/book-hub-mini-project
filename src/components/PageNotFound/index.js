import {withRouter, Link} from 'react-router-dom'

import './index.css'

const PageNotFound = props => {
  const onClickGoBackHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content-container">
        <img
          src="https://res.cloudinary.com/du4atyy1w/image/upload/v1718277086/njqa9wxtaslgygsgzhse.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="page-not-found-heading">Page Not Found</h1>
        <p className="page-not-found-description">
          we are sorry, the page you requested could not be found, Please go
          back to the homepage.
        </p>
        <Link to="/">
          <button
            type="button"
            className="go-back-home-btn"
            onClick={onClickGoBackHome}
          >
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(PageNotFound)
