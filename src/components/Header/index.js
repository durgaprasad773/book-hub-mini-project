import {Component} from 'react'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'

import './index.css'

import {withRouter, Link} from 'react-router-dom'

class Header extends Component {
  state = {isMenuClick: false}

  onClickLogout = () => {
    const jwtToken = Cookies.get('jwt_token')
    Cookies.remove(jwtToken)
  }

  onClickMenuBtn = () => {
    this.setState(prevState => ({
      isMenuClick: !prevState.isMenuClick,
    }))
  }

  onClickClose = () => {
    this.setState({isMenuClick: false})
  }

  render() {
    const {isMenuClick} = this.state
    const {home, shelf} = this.props
    const isActiveHome = home ? 'active-home' : ''
    const isActiveShelf = shelf ? 'active-shelf' : ''
    return (
      <div className="nav-main-container">
        <nav className="nav-container">
          <div className="nav-logo-items-container">
            <Link to="/" className="link-item">
              <img
                src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717394100/BookHub%20Project/su9ig0g5bzv8xcmzkmrb.png"
                alt="website logo"
                className="nam-website-logo"
              />
            </Link>
            <ul className="desktop-nav-items">
              <Link to="/" className="link-item">
                <li className={`nav-item ${isActiveHome}`}>Home</li>
              </Link>
              <Link to="/shelf" className="link-item">
                <li className={`nav-item ${isActiveShelf}`}>Bookshelves</li>
              </Link>
              <li className="nav-item">
                <button
                  type="button"
                  className="log-out-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="menu-btn"
              onClick={this.onClickMenuBtn}
            >
              {' '}
              <FiMenu className="menu-icon" />
            </button>
          </div>
        </nav>
        {isMenuClick && (
          <div className="mobile-nav-container">
            <ul className="mobile-nav-items-container">
              <Link to="/" className="link-item">
                <li className={`nav-item ${isActiveHome}`}>Home</li>
              </Link>
              <Link to="/shelf" className="link-item">
                <li className={`nav-item ${isActiveShelf}`}>Bookshelves</li>
              </Link>
              <Link to="/login" className="link-item">
                <li className="nav-item">
                  <button
                    type="button"
                    className="log-out-btn"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </Link>
              <button
                type="button"
                className="close-btn"
                onClick={this.onClickClose}
              >
                <RiCloseCircleFill className="cross-icon" />
              </button>
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(Header)
