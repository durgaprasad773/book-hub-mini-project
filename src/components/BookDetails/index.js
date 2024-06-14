import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const bookDetailsApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookDetails: [], bookDetailsApi: bookDetailsApiStatus.initial}

  componentDidMount() {
    this.getBookDetailsData()
  }

  getBookDetailsData = async () => {
    this.setState({bookDetailsApi: bookDetailsApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const responseBookData = await fetch(apiUrl, options)
    if (responseBookData.ok === true) {
      const responseData = await responseBookData.json()
      console.log(responseData)
      const updatedData = {
        id: responseData.id,
        authorName: responseData.book_details.author_name,
        coverPic: responseData.book_details.cover_pic,
        aboutBook: responseData.book_details.about_book,
        rating: responseData.book_details.rating,
        readStatus: responseData.book_details.read_status,
        title: responseData.book_details.title,
        aboutAuthor: responseData.book_details.about_author,
      }

      this.setState({
        bookDetails: updatedData,
        bookDetailsApi: bookDetailsApiStatus.success,
      })
    }
  }

  onClickBookDetailsTryAgain = () => {
    this.getBookDetailsData()
  }

  renderBookDetailsSuccessView = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails
    console.log(aboutAuthor)

    return (
      <div className="book-details-container">
        <div className="book-details-cover-pic-content-container">
          <img src={coverPic} alt={title} className="book-details-cover-pic" />
          <div className="book-details-content-container">
            <h1 className="book-details-title" key={title}>
              {title}
            </h1>
            <p className="book-details-author">{authorName}</p>
            <p className="book-details-rating">
              Avg Rating <BsFillStarFill className="book-details-star-icon" />{' '}
              {rating}
            </p>
            <p className="book-details-status">
              Status:{' '}
              <span className="book-details-status-view">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="break-line" />
        <div className="book-details-about-author-container">
          <h1 className="about-heading">About Author</h1>
          <p className="about-description">{aboutAuthor}</p>
          <h1 className="about-heading">About Book</h1>
          <p className="about-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderBookDetailsFailureView = () => (
    <div className="failure-book-details-page">
      <img
        src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717823270/BookHub%20Project/nihzekkl2lfjoic8uiin.png"
        className="book-details-failure-image"
        alt="failure view"
      />
      <p className="book-details-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="book-details-failure-btn"
        onClick={this.onClickBookDetailsTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookDetails = () => {
    const {bookDetailsApi} = this.state
    switch (bookDetailsApi) {
      case bookDetailsApiStatus.success:
        return this.renderBookDetailsSuccessView()
      case bookDetailsApiStatus.inProgress:
        return this.renderBookDetailLoadingView()
      case bookDetailsApiStatus.failure:
        return this.renderBookDetailsFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-main-container">
          {this.renderBookDetails()}
          <Footer />
        </div>
      </>
    )
  }
}

export default BookDetails
