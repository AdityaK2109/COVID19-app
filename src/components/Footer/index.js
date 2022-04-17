import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-heading">
        COVID19<span className="india-text">INDIA</span>
      </h1>
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
      <div className="icons-container">
        <VscGithubAlt className="each-icon" />
        <FiInstagram className="each-icon" />
        <FaTwitter className="each-icon" />
      </div>
    </div>
  )
}
