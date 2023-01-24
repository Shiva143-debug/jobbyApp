import './index.css'
import {Link} from 'react-router-dom'
import {GiRoundStar} from 'react-icons/gi'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobsCard = props => {
  const {jobsListDetails} = props
  const {
    id,
    employmentType,
    jobDescription,
    CompanyLogoUrl,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsListDetails

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/jobs/${id}`}>
      <li className="job-item">
        <div className="job-container">
          <div className="image-title">
            <img src={CompanyLogoUrl} alt="company logo" className="image" />
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

          <h1 className="Description">Description</h1>
          <p className="jobDescription">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobsCard
