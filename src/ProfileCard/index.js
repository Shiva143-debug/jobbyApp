import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {withRouter} from 'react-router-dom'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  // const {employmentTypesList,salaryRangesList}=props
  state = {profileList: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.profile_details)
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,

        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileCard = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    console.log(name)
    console.log(profileList)
    return (
      <div className="profileCardContainer">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="name">Shiva</h1>
        <p className="shortBio">Full stack Developer</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button type="button" className="retry-button" onClick={this.getProfile}>
      retry
    </button>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileCardsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileCard()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-card">
        {this.renderProfileCardsView()}
        <hr className="hr" />

        {/* <div className="Employment-category"></div> */}
      </div>
    )
  }
}
export default ProfileCard
