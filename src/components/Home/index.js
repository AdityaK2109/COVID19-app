import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingDesc, FcGenericSortingAsc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    showSuggestionBox: false,
    stateViseCovidList: [],
    isDescending: false,
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = Object.entries(data).map(eachData => ({
        id: eachData[0],
        ...eachData[1],
      }))

      this.setState({
        stateViseCovidList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onChangeSearchInput = event => {
    let updatedValue = true
    if (event.target.value === '') {
      updatedValue = false
    }
    this.setState({
      searchInput: event.target.value,
      showSuggestionBox: updatedValue,
    })
  }

  onClickAsc = () => {
    const {isDescending, stateViseCovidList} = this.state
    if (isDescending === true) {
      let updatedList = []
      stateViseCovidList.map(eachState => {
        updatedList = [eachState, ...updatedList]
        return updatedList
      })
      console.log(updatedList)
      this.setState({stateViseCovidList: updatedList, isDescending: false})
    }
  }

  onClickDesc = () => {
    const {isDescending, stateViseCovidList} = this.state
    if (isDescending === false) {
      let updatedList = []
      stateViseCovidList.map(eachState => {
        updatedList = [eachState, ...updatedList]
        return updatedList
      })
      console.log(updatedList)
      this.setState({stateViseCovidList: updatedList, isDescending: true})
    }
  }

  render() {
    const {
      apiStatus,
      searchInput,
      showSuggestionBox,
      stateViseCovidList,
    } = this.state
    console.log(stateViseCovidList)
    const updatedList = statesList.filter(eachState =>
      eachState.state_code.toLowerCase().startsWith(searchInput.toLowerCase()),
    )

    const renderLoadingView = () => (
      <div testid="homeRouteLoader" className="loading-container">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    )

    const renderSuccessView = () => {
      const totalObject = stateViseCovidList.filter(each => each.id === 'TT')[0]
      const total = {...totalObject}
      const {confirmed, deceased, recovered} = {...total.total}
      const active = confirmed - recovered - deceased
      return (
        <div className="page-content-container">
          <div className="search-bar-and-suggestion-box-container">
            <div className="search-bar-container">
              <BsSearch color="#94a3b8" size={15} />
              <input
                type="search"
                placeholder="Enter the State"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="input-tag"
              />
            </div>
            {showSuggestionBox && (
              <ul
                testid="searchResultsUnorderedList"
                className="search-results-unordered-list"
              >
                {updatedList.map(eachState => (
                  <Link
                    to={`/state/${eachState.state_code}`}
                    style={{textDecoration: 'none'}}
                    key={eachState.state_code}
                  >
                    <li className="each-state-item">
                      <p className="state-name">{eachState.state_name}</p>
                      <div className="state-code-container">
                        <p className="state-code-text">
                          {eachState.state_code}
                        </p>
                        <BiChevronRightSquare size={24} color="#facc15" />
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
          <div className="cards-container">
            <div
              testid="countryWideConfirmedCases"
              className="country-wide-card confirmed-card"
            >
              <p className="each-card-name">Confirmed</p>
              <img
                src="https://res.cloudinary.com/adityak/image/upload/v1650121485/ConfirmedImg_u9v5ph.svg"
                alt="country wide confirmed cases pic"
              />
              <p className="each-card-digits">{confirmed}</p>
            </div>
            <div
              testid="countryWideActiveCases"
              className="country-wide-card active-card"
            >
              <p className="each-card-name">Active</p>
              <img
                src="https://res.cloudinary.com/adityak/image/upload/v1650121763/ActiveImg_tokkht.svg"
                alt="country wide active cases pic"
              />
              <p className="each-card-digits">{active}</p>
            </div>
            <div
              testid="countryWideRecoveredCases"
              className="country-wide-card recovered-card"
            >
              <p className="each-card-name">Recovered</p>
              <img
                src="https://res.cloudinary.com/adityak/image/upload/v1650121887/RecoveredImg_ipnv48.svg"
                alt="country wide recovered cases pic"
              />
              <p className="each-card-digits">{recovered}</p>
            </div>
            <div
              testid="countryWideDeceasedCases"
              className="country-wide-card deceased-card"
            >
              <p className="each-card-name">Deceased</p>
              <img
                src="https://res.cloudinary.com/adityak/image/upload/v1650121923/DeceasedImg_cpd8x8.svg"
                alt="country wide deceased cases pic"
              />
              <p className="each-card-digits">{deceased}</p>
            </div>
          </div>
          <div className="table-container" testid="stateWiseCovidDataTable">
            <ul className="state-wise-covid-data-table">
              <li className="header-row" key="header-row">
                <div className="state-ut-container">
                  <p className="header-text">States/UT</p>
                  <button
                    type="button"
                    className="btn"
                    onClick={this.onClickAsc}
                    testid="ascendingSort"
                  >
                    <FcGenericSortingAsc color="#94A3B8" size={20} />
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={this.onClickDesc}
                    testid="descendingSort"
                  >
                    <FcGenericSortingDesc color="#94A3B8" size={20} />
                  </button>
                </div>
                <div className="confirmed-container">
                  <p className="header-text">Confirmed</p>
                </div>
                <div className="active-container">
                  <p className="header-text">Active</p>
                </div>
                <div className="recovered-container">
                  <p className="header-text">Recovered</p>
                </div>
                <div className="deceased-container">
                  <p className="header-text">Deceased</p>
                </div>
                <div className="population-container">
                  <p className="header-text">Population</p>
                </div>
              </li>
              {stateViseCovidList.map(eachState => {
                if (eachState.id !== 'TT') {
                  const activeCases =
                    eachState.total.confirmed -
                    eachState.total.recovered -
                    eachState.total.deceased
                  const stateName = statesList.find(
                    eachData => eachData.state_code === eachState.id,
                  )
                  return (
                    <li className="each-row" key={eachState.id}>
                      <div className="state-ut-container">
                        <p className="state-ut-text">{stateName.state_name}</p>
                      </div>
                      <div className="confirmed-container">
                        <p className="confirmed-text">
                          {eachState.total.confirmed}
                        </p>
                      </div>
                      <div className="active-container">
                        <p className="active-text">{activeCases}</p>
                      </div>
                      <div className="recovered-container">
                        <p className="recovered-text">
                          {eachState.total.recovered}
                        </p>
                      </div>
                      <div className="deceased-container">
                        <p className="deceased-text">
                          {eachState.total.deceased}
                        </p>
                      </div>
                      <div className="population-container">
                        <p className="population-text">
                          {eachState.meta.population}
                        </p>
                      </div>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
          <Footer />
        </div>
      )
    }

    const renderDifferentViews = () => {
      switch (apiStatus) {
        case apiStatusConstants.loading:
          return renderLoadingView()
        case apiStatusConstants.success:
          return renderSuccessView()
        default:
          return null
      }
    }
    return (
      <div className="page-container">
        <Header />
        {renderDifferentViews()}
      </div>
    )
  }
}

export default Home
