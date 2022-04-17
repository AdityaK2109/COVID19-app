import {Component} from 'react'
import './index.css'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
  state = {activeNavItem: ''}

  componentDidMount() {
    const {match} = this.props
    const {url} = match
    if (url === '/') {
      this.setState({activeNavItem: 'Home'})
    } else if (url === '/about') {
      this.setState({activeNavItem: 'About'})
    }
  }

  render() {
    const {activeNavItem} = this.state
    return (
      <nav className="navbar-container">
        <Link to="/" className="link-styling">
          <h1 className="header-heading">
            COVID19<span className="india-text">INDIA</span>
          </h1>
        </Link>
        <ul className="nav-items-container">
          <Link to="/" className="link-styling">
            <li>
              <button
                type="button"
                className={`nav-item-text ${
                  activeNavItem === 'Home' && 'active-nav-item'
                }`}
              >
                Home
              </button>
            </li>
          </Link>
          <Link to="/about" className="link-styling">
            <li>
              <button
                type="button"
                className={`nav-item-text ${
                  activeNavItem === 'About' && 'active-nav-item'
                }`}
              >
                About
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
