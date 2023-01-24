import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <div className="s-container">
      <img src={imageUrl} alt={name} className="s-image" />
      <h1 className="h-head">{name}</h1>
    </div>
  )
}
export default SkillsCard
