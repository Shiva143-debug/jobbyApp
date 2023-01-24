import './index.css'

const FiltersGroup = props => {
  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(each => {
      const {changeEmployeeList} = props
      const onSelectEmployeeType = event => {
        changeEmployeeList(event.target.value)
      }

      //   const ratingClassName =
      //     activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`

      return (
        <li
          className="employee-item"
          key={each.employmentTypeId}
          onChange={onSelectEmployeeType}
        >
          <input
            type="checkbox"
            id={each.employmentTypeId}
            value={each.employmentTypeId}
          />
          <label className="label" htmlFor={each.employmentTypeId}>
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentFilters = () => (
    <div>
      <h1 className="Employment-heading">Type of Employment</h1>
      <ul className="ratings-list">{renderEmploymentList()}</ul>
    </div>
  )

  const renderSalaryList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {changeSalary} = props
      const onClickSalary = () => {
        changeSalary(salary.salaryRangeId)
      }
      //   const isActive = category.categoryId === activeCategoryId
      // const categoryClassName = isActive
      //   ? `category-name active-category-name`
      //   : `category-name`

      return (
        <li
          className="category-item"
          key={salary.salaryRangeId}
          onClick={onClickSalary}
        >
          <input type="radio" id={salary.salaryRangeId} />
          <label className="label" htmlFor={salary.salaryRangeId}>
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryFilter = () => (
    <>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="categories-list">{renderSalaryList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentFilters()}
      {renderSalaryFilter()}
    </div>
  )
}

export default FiltersGroup
