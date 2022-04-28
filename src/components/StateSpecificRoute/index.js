import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
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

const checkDigitValue = data => {
  if (data === undefined) {
    return 0
  }
  return data
}

const options = {
  method: 'GET',
}

const dataFormatter = number => {
  if (number > 100000) {
    return `${(number / 100000).toFixed(1).toString()}L`
  }
  if (number > 1000) {
    return `${(number / 1000).toFixed(1).toString()}K`
  }
  return number.toString()
}

class StateSpecificRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    graphApiStatus: apiStatusConstants.initial,
    activeButton: 'CONFIRMED',
    selectedStateObject: {},
    topDistrictList: [],
    graphDataObject: {},
    barGraphData: [],
  }

  componentDidMount() {
    this.getApiResponse()
    this.getGraphDetailsResponse()
  }

  onCLickConfirmedCard = () => {
    const {selectedStateObject, graphDataObject} = this.state
    const initialList = selectedStateObject.districts.map(eachItem => ({
      id: eachItem.id,
      data: eachItem.confirmed,
    }))
    const topDistrictList = initialList.sort((initial, next) =>
      initial.data > next.data ? -1 : 1,
    )
    const barGraphData = graphDataObject.countryData.map(each => {
      console.log(each)
      return {
        date: new Date(each.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        data: each.confirmed,
        labelValue: dataFormatter(each.confirmed ? each.confirmed : 0),
      }
    })
    this.setState({activeButton: 'CONFIRMED', topDistrictList, barGraphData})
  }

  onCLickActiveCard = () => {
    const {selectedStateObject, graphDataObject} = this.state
    const initialList = selectedStateObject.districts.map(eachItem => ({
      id: eachItem.id,
      data: eachItem.active,
    }))
    const topDistrictList = initialList.sort((initial, next) =>
      initial.data > next.data ? -1 : 1,
    )
    const barGraphData = graphDataObject.countryData.map(each => {
      console.log(each)
      return {
        date: new Date(each.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        data: each.active,
        labelValue: dataFormatter(each.active ? each.active : 0),
      }
    })
    this.setState({activeButton: 'ACTIVE', topDistrictList, barGraphData})
  }

  onCLickRecoveredCard = () => {
    const {selectedStateObject, graphDataObject} = this.state
    const initialList = selectedStateObject.districts.map(eachItem => ({
      id: eachItem.id,
      data: eachItem.recovered,
    }))
    const topDistrictList = initialList.sort((initial, next) =>
      initial.data > next.data ? -1 : 1,
    )
    const barGraphData = graphDataObject.countryData.map(each => {
      console.log(each)
      return {
        date: new Date(each.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        data: each.recovered,
        labelValue: dataFormatter(each.recovered ? each.recovered : 0),
      }
    })
    this.setState({activeButton: 'RECOVERED', topDistrictList, barGraphData})
  }

  onCLickDeceasedCard = () => {
    const {selectedStateObject, graphDataObject} = this.state
    const initialList = selectedStateObject.districts.map(eachItem => ({
      id: eachItem.id,
      data: eachItem.deceased,
    }))
    const topDistrictList = initialList.sort((initial, next) =>
      initial.data > next.data ? -1 : 1,
    )
    const barGraphData = graphDataObject.countryData.map(each => {
      console.log(each)
      return {
        date: new Date(each.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        data: each.deceased,
        labelValue: dataFormatter(each.deceased ? each.deceased : 0),
      }
    })
    this.setState({activeButton: 'DECEASED', topDistrictList, barGraphData})
  }

  getStateConfirmedData = () => {
    const {graphDataObject} = this.state
    const {stateData} = graphDataObject
    console.log('bbb')
    console.log(stateData)
    return stateData.map(each => ({
      date: each.date,
      data: each.confirmed,
    }))
  }

  getStateActiveData = () => {
    const {graphDataObject} = this.state
    const {stateData} = graphDataObject
    return stateData.map(each => ({
      date: each.date,
      data: each.active,
    }))
  }

  getStateRecoveredData = () => {
    const {graphDataObject} = this.state
    const {stateData} = graphDataObject
    return stateData.map(each => ({
      date: each.date,
      data: each.recovered,
    }))
  }

  getStateDeceasedData = () => {
    const {graphDataObject} = this.state
    const {stateData} = graphDataObject
    return stateData.map(each => ({
      date: each.date,
      data: each.deceased,
    }))
  }

  getStateTestedData = () => {
    const {graphDataObject} = this.state
    const {stateData} = graphDataObject
    return stateData.map(each => ({
      date: each.date,
      data: each.tested,
    }))
  }

  getGraphDetailsResponse = async () => {
    const {match} = this.props
    const {params} = match
    console.log(params)
    const {stateCode} = params
    this.setState({graphApiStatus: apiStatusConstants.loading})
    const graphResponse = await fetch(
      'https://apis.ccbp.in/covid19-timelines-data',
      options,
    )
    if (graphResponse.ok === true) {
      const graphData = await graphResponse.json()
      const selectedState = graphData[stateCode].dates
      const acrossCountryData = graphData.TT.dates
      const graphDataObject = {
        stateData: Object.entries(selectedState).map(each => ({
          date: each[0],
          confirmed: checkDigitValue(each[1].delta.confirmed),
          recovered: checkDigitValue(each[1].delta.recovered),
          deceased: checkDigitValue(each[1].delta.deceased),
          tested: checkDigitValue(each[1].delta.tested),
          active:
            checkDigitValue(each[1].total.confirmed) -
            checkDigitValue(each[1].total.recovered) -
            checkDigitValue(each[1].total.deceased),
        })),
        countryData: Object.entries(acrossCountryData)
          .map(each => ({
            date: each[0],
            confirmed: checkDigitValue(each[1].delta.confirmed),
            recovered: checkDigitValue(each[1].delta.recovered),
            deceased: checkDigitValue(each[1].delta.deceased),
            active:
              checkDigitValue(each[1].total.confirmed) -
              checkDigitValue(each[1].total.recovered) -
              checkDigitValue(each[1].total.deceased),
          }))
          .slice(-10),
      }
      const barGraphData = graphDataObject.countryData.map(each => ({
        date: new Date(each.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        data: each.confirmed ? each.confirmed : 0,
        labelValue: dataFormatter(each.confirmed ? each.confirmed : 0),
      }))
      this.setState({
        graphApiStatus: apiStatusConstants.success,
        graphDataObject,
        barGraphData,
      })
    }
  }

  getApiResponse = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    this.setState({
      apiStatus: apiStatusConstants.loading,
      stateCode,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const filteredObject = data[stateCode]
      const initialDistrictList = Object.entries(filteredObject.districts).map(
        eachData => ({
          id: eachData[0],
          ...eachData[1],
        }),
      )

      const finalDistrictList = initialDistrictList.map(eachDistrict => {
        const confirmed = eachDistrict.total.confirmed
          ? eachDistrict.total.confirmed
          : 0
        const deceased = eachDistrict.total.deceased
          ? eachDistrict.total.deceased
          : 0
        const recovered = eachDistrict.total.recovered
          ? eachDistrict.total.recovered
          : 0
        const tested = eachDistrict.total.tested ? eachDistrict.total.tested : 0
        const {population} = eachDistrict.meta
          ? eachDistrict.meta
          : {population: 0}
        return {
          id: eachDistrict.id,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - deceased - recovered,
        }
      })

      const selectedStateObject = {
        total: {
          confirmed: checkDigitValue(filteredObject.total.confirmed),
          deceased: checkDigitValue(filteredObject.total.deceased),
          recovered: checkDigitValue(filteredObject.total.recovered),
          tested: checkDigitValue(filteredObject.total.tested),
        },
        date: filteredObject.meta.last_updated,
        districts: finalDistrictList,
      }

      const initialList = selectedStateObject.districts.map(eachItem => ({
        id: eachItem.id,
        data: eachItem.confirmed,
      }))
      const topDistrictList = initialList.sort((initial, next) =>
        initial.data > next.data ? -1 : 1,
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        selectedStateObject,
        topDistrictList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  barColorValue = activeButton => {
    switch (activeButton) {
      case 'CONFIRMED':
        return '#9A0E31'
      case 'ACTIVE':
        return '#0A4FA0'
      case 'RECOVERED':
        return '#216837'
      case 'DECEASED':
        return '#474C57'
      default:
        return null
    }
  }

  render() {
    const {
      apiStatus,
      stateCode,
      selectedStateObject,
      activeButton,
      topDistrictList,
      barGraphData,
      graphApiStatus,
    } = this.state

    console.log('aaa')

    console.log(barGraphData)

    const formatDate = date => {
      const newDate = new Date(date)
      console.log(date)
      let day = newDate.getDate()
      switch (day % 10) {
        case 1:
          day = `${day}st`
          break
        case 2:
          day = `${day}nd`
          break
        case 3:
          day = `${day}rd`
          break
        default:
          day = `${day}th`
          break
      }
      const monthList = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ]

      const month = monthList[newDate.getMonth()]
      return `${month} ${day} ${newDate.getFullYear()}`
    }

    const renderLoadingView = () => (
      <div testid="stateDetailsLoader" className="loading-container">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    )

    const lineChartFunction = (data, color, labelText) => {
      const DataFormate = number => {
        if (number > 1000) {
          return `${(number / 1000).toString()}K`
        }
        if (number > 100000) {
          return `${(number / 100000).toString()}L`
        }
        return number.toString()
      }
      return (
        <div className={labelText}>
          <p className="graph-name">{labelText}</p>
          <LineChart width={800} height={300} data={data}>
            <XAxis
              fill={color}
              tick={{fontSize: 14, strokeWidth: 0, fill: color}}
              minTickGap={150}
              dataKey="date"
              stroke={color}
            />

            <YAxis
              tick={{fontSize: 13, strokeWidth: 0, fill: color}}
              dataKey="data"
              tickFormatter={DataFormate}
              stroke={color}
            />

            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="data"
              stroke={color}
              dot={{stroke: color, strokeWidth: 1, fill: color}}
            />
          </LineChart>
        </div>
      )
    }

    const renderGraphLoadingView = () => (
      <div testid="timelinesDataLoader" className="loading-container">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    )

    const renderGraphSuccessView = () => (
      <>
        <div className="bar-chart-container">
          <BarChart width={800} height={400} data={barGraphData}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                strokeWidth: '0',
                fill: this.barColorValue(activeButton),
              }}
              tickMargin="10"
              padding={{left: 30, right: 30}}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              dataKey="data"
              tick={false}
            />
            <Legend />
            <Bar
              dataKey="data"
              fill={this.barColorValue(activeButton)}
              label={{
                position: 'top',
                content: 'labelValue',
              }}
              radius={[8, 8, 0, 0]}
              barSize="40%"
              maxBarSize={42}
            >
              <LabelList
                dataKey="labelValue"
                position="top"
                fill={this.barColorValue(activeButton)}
                fontSize={15}
                offset={10}
              />
            </Bar>
          </BarChart>
        </div>
        <div className="line-charts-container">
          <h1 className="daily-spread-trends-text">Daily Spread Trends</h1>
          <div testid="lineChartsContainer">
            {lineChartFunction(
              this.getStateConfirmedData(),
              '#FF073A',
              'Confirmed',
            )}
            {lineChartFunction(this.getStateActiveData(), '#007BFF', 'Active')}
            {lineChartFunction(
              this.getStateRecoveredData(),
              '#27A243',
              'Recovered',
            )}
            {lineChartFunction(
              this.getStateDeceasedData(),
              '#6C757D',
              'Deceased',
            )}
            {lineChartFunction(this.getStateTestedData(), '#9673B9', 'Tested')}
          </div>
        </div>
      </>
    )

    const renderSuccessView = () => {
      console.log(activeButton)
      const stateName = statesList.filter(
        eachState => eachState.state_code === stateCode,
      )
      const {confirmed, deceased, recovered} = selectedStateObject.total
      const active = confirmed - recovered - deceased

      return (
        <>
          <div className="state-details-container">
            <div className="state-name-and-tested-container">
              <h1 className="state-specific-state-name">
                {stateName[0].state_name}
              </h1>
              <div className="tested-text-and-count-container">
                <p className="tested-text">Tested</p>
                <p className="tested-count">
                  {selectedStateObject.total.tested}
                </p>
              </div>
            </div>
            <p className="last-updated-date-text">
              Last update on {formatDate(selectedStateObject.date)}.
            </p>
            <div className="button-container">
              <button
                className={`${
                  activeButton === 'CONFIRMED' && 'active-confirmed-button'
                } state-specific-card confirmed-card`}
                type="button"
                onClick={this.onCLickConfirmedCard}
              >
                <div testid="stateSpecificConfirmedCasesContainer">
                  <p className="each-card-name">Confirmed</p>
                  <img
                    src="https://res.cloudinary.com/adityak/image/upload/v1650121485/ConfirmedImg_u9v5ph.svg"
                    alt="state specific confirmed cases pic"
                  />
                  <p className="card-digits">{confirmed}</p>
                </div>
              </button>
              <button
                className={`state-specific-card active-card ${
                  activeButton === 'ACTIVE' && 'active-active-button'
                }`}
                type="button"
                onClick={this.onCLickActiveCard}
              >
                <div testid="stateSpecificActiveCasesContainer">
                  <p className="each-card-name">Active</p>
                  <img
                    src="https://res.cloudinary.com/adityak/image/upload/v1650121763/ActiveImg_tokkht.svg"
                    alt="state specific active cases pic"
                  />
                  <p className="card-digits">{active}</p>
                </div>
              </button>
              <button
                className={`state-specific-card recovered-card ${
                  activeButton === 'RECOVERED' && 'active-recovered-button'
                }`}
                type="button"
                onClick={this.onCLickRecoveredCard}
              >
                <div testid="stateSpecificRecoveredCasesContainer">
                  <p className="each-card-name">Recovered</p>
                  <img
                    src="https://res.cloudinary.com/adityak/image/upload/v1650121887/RecoveredImg_ipnv48.svg"
                    alt="state specific recovered cases pic"
                  />
                  <p className="card-digits">{recovered}</p>
                </div>
              </button>
              <button
                className={`state-specific-card deceased-card ${
                  activeButton === 'DECEASED' && 'active-deceased-button'
                }`}
                type="button"
                onClick={this.onCLickDeceasedCard}
              >
                <div testid="stateSpecificDeceasedCasesContainer">
                  <p className="each-card-name">Deceased</p>
                  <img
                    src="https://res.cloudinary.com/adityak/image/upload/v1650121923/DeceasedImg_cpd8x8.svg"
                    alt="state specific deceased cases pic"
                  />
                  <p className="card-digits">{deceased}</p>
                </div>
              </button>
            </div>
            <div>
              <h1 className="top-districts-text">Top Districts</h1>
              <ul
                testid="topDistrictsUnorderedList"
                className="top-districts-unordered-list"
              >
                {topDistrictList.map(eachDistrict => (
                  <li key={eachDistrict.id} className="each-district-container">
                    <p className="top-district-data-text">
                      {eachDistrict.data}
                    </p>
                    <p className="top-district-name-text">{eachDistrict.id}</p>
                  </li>
                ))}
              </ul>
            </div>
            {graphApiStatus === apiStatusConstants.loading
              ? renderGraphLoadingView()
              : renderGraphSuccessView()}
          </div>
          <Footer />
        </>
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

export default StateSpecificRoute
