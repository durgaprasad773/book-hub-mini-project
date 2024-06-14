import './index.css'

const TabItem = props => {
  const {tabDetails, onClickActiveTabId, isActive} = props
  const {label, value} = tabDetails

  const activeClass = isActive ? 'active-btn' : 'tab-btn'

  const onClickTab = () => {
    onClickActiveTabId(value, label)
  }

  return (
    <li className="tab-btn-container">
      <button type="button" className={activeClass} onClick={onClickTab}>
        {label}
      </button>
    </li>
  )
}
export default TabItem
