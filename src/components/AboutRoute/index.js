import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AboutRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, faqList: []}

  componentDidMount() {
    this.getAboutApiResponse()
  }

  getAboutApiResponse = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({apiStatus: apiStatusConstants.success, faqList: data.faq})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {apiStatus, faqList} = this.state
    console.log(faqList)

    const renderLoadingView = () => (
      <div testid="aboutRouteLoader" className="loading-container">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    )

    const renderSuccessView = () => (
      <>
        <div className="about-content-container">
          <h1 className="about-heading">About</h1>
          <p className="about-page-para">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul testid="faqsUnorderedList" className="faq-list-container">
            {faqList.map(eachFaq => (
              <li key={eachFaq.qno} className="each-faq-container">
                <p className="ques-text">{eachFaq.question}</p>
                <p className="answer-text">{eachFaq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
    return (
      <div className="page-container">
        <Header />
        {apiStatus === apiStatusConstants.loading
          ? renderLoadingView()
          : renderSuccessView()}
      </div>
    )
  }
}

export default AboutRoute
