import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const topRatedApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {topRatedBookData: [], topRatedApiStatus: topRatedApiStatuses.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatuses.inProgress})

    const topRatedBooksApi = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(topRatedBooksApi, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const booksList = fetchedData.books
      const updatedData = booksList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedApiStatus: topRatedApiStatuses.success,
        topRatedBookData: updatedData,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatuses.failure})
    }
  }

  renderSliderSuccessView = () => {
    const {topRatedBookData} = this.state
    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {topRatedBookData.map(eachBook => {
            const {coverPic, authorName, id, title} = eachBook
            return (
              <Link to={`/books/${id}`} className="home-book-shelve-link">
                <li className="slick-item-container" key={title}>
                  <div>
                    <img
                      src={coverPic}
                      className="slick-item-cover-pic"
                      alt={title}
                    />
                    <h1 className="slick-item-title">{title}</h1>
                    <p className="slick-item-author-name">{authorName}</p>
                  </div>
                </li>
              </Link>
            )
          })}
        </Slider>
      </ul>
    )
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  onClickTryAgainHome = () => {
    this.getTopRatedBooks()
  }

  renderSliderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSliderFailureView = () => (
    <div className="failure-home-page">
      <img
        src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717823270/BookHub%20Project/nihzekkl2lfjoic8uiin.png"
        className="home-failure-image"
        alt="failure view"
      />
      <p className="home-failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="home-failure-btn"
        onClick={this.onClickTryAgainHome}
      >
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return this.renderSliderSuccessView()
      case topRatedApiStatuses.inProgress:
        return this.renderSliderLoadingView()
      case topRatedApiStatuses.failure:
        return this.renderSliderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header home />
        <div className="home-container">
          <div className="home-content-container">
            <h1 className="home-heading" key="title">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you
              <br /> surprisingly insightful recommendations.
            </p>
            <button
              type="button"
              className="mobile-find-books-btn"
              onClick={this.onClickFindBooks}
            >
              Find Books
            </button>
            <div className="home-top-related-books-container">
              <div className="button-heading-container">
                <h1 className="top-related-books-heading">Top Related Books</h1>
                <button
                  type="button"
                  className="find-books-btn"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              {this.renderSlider()}
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default Home
