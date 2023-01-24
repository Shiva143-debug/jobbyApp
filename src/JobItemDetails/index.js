import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiRoundStar} from 'react-icons/gi'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobsData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  //   getFormattedData = data => ({
  //     companyLogoUrl: data.company_logo_url,
  //     companyWebsiteUrl: data.company_website_url,
  //     employmentType: data.employment_type,
  //     id: data.id,
  //     jobDescription: data.job_description,
  //     imageUrl: data.image_url,
  //     name: data.name,
  //   })
  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItemData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarData(eachSimilarJob),
      )

      this.setState({
        jobsData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobsData, similarJobsData} = this.state
    console.log(similarJobsData)

    const {
      employmentType,
      companyWebsiteUrl,
      jobDescription,
      CompanyLogoUrl,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobsData
    const {description, imageUrl} = lifeAtCompany
    return (
      //   <div className="jobDetails">
      //     <p className="color">{employmentType}</p>
      //   </div>

      <div className="job-itemDetails">
        <div className="jobCard-container">
          <div className="image-title">
            <img
              src={CompanyLogoUrl}
              alt="job details company logo"
              className="image"
            />
            <div className="title-rating">
              <h1 className="title">{title}</h1>
              <div className="star-rating">
                <GiRoundStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employmentType-package">
            <div className="location-employmentType">
              <MdLocationOn className="location-img" />
              <p className="location">{location}</p>
              <BsFillBriefcaseFill className="briefCaseImg" />
              <p className="employmentType">{employmentType}</p>
            </div>
            <p className="packagePerAnnum">{packagePerAnnum}</p>
          </div>

          <hr className="hr" />
          <div className="description-visit">
            <h1 className="Description">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-heading">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="jobDescription">{jobDescription}</p>
          <h1 className="skills">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="life">Life at Company</h1>
          <div className="life-container">
            <p className="life-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-Jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureViews = () => {
    const {match} = this.props
    const {params} = match
    // eslint-disable-next-line
    const {id} = params
    return (
      <div className="jobs-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <h1 className="jobs-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="jobs-failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="retry-button"
          id="button"
          onClick={this.getJobItemData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureViews()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="detailsContainer">
        <div>
          <Header />
        </div>
        <div>{this.renderView()}</div>
      </div>
    )
  }
}
export default JobItemDetails
