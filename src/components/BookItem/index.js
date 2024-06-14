import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const BookItem = props => {
  const {bookItemDetails} = props
  const {id, authorName, title, readStatus, coverPic, rating} = bookItemDetails

  return (
    <Link to={`books/${id}`} className="book-item-link">
      <li className="book-item-container">
        <img src={coverPic} alt={title} className="book-shelve-cover-pic" />
        <div className="book-shelve-content">
          <h1 className="book-shelve-item-title">{title}</h1>
          <p className="book-shelve-item-author">{authorName}</p>
          <p className="book-shelve-item-rating">
            Avg Rating <FaStar className="star-icon" /> {rating}
          </p>
          <p className="book-shelve-item-status">
            Status: <span className="book-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
