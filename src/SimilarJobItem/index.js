import './index.css'
import {GiRoundStar} from 'react-icons/gi'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    employmentType,
    jobDescription,
    companyLogoUrl,
    location,

    rating,
    title,
  } = jobDetails
  return (
    <div className="similarCardContainer">
      <div className="image-title">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-employType">
        <p className="location">{location}</p>
        <p>{employmentType}</p>
      </div>
    </div>
  )
}
export default SimilarJobItem
