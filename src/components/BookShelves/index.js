import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import BookItem from '../BookItem'
import TabItem from '../TabItem'
import Footer from '../Footer'

import './index.css'
import Header from '../Header'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const bookShelvesApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    activeBookTabId: bookshelvesList[0].value,
    bookShelvesApi: bookShelvesApiStatus.initial,
    bookShelveData: [],
    searchInput: '',
    search: '',
    activeBookLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBookShelvesData()
  }

  onClickActiveTabId = (id, label) => {
    this.setState(
      {activeBookTabId: id, activeBookLabel: label},
      this.getBookShelvesData,
    )
  }

  getBookShelvesData = async () => {
    this.setState({bookShelvesApi: bookShelvesApiStatus.inProgress})
    const {activeBookTabId, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookTabId}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseBookShelve = await fetch(apiUrl, options)
    if (responseBookShelve.ok === true) {
      const fetchedData = await responseBookShelve.json()
      console.log(fetchedData)
      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
      }))
      const total = {total: fetchedData.total}
      console.log(total)
      this.setState({
        bookShelveData: updatedData,
        bookShelvesApi: bookShelvesApiStatus.success,
      })
    } else {
      this.setState({bookShelvesApi: bookShelvesApiStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.setState(
      prevState => ({
        search: prevState.searchInput,
      }),
      this.getBookShelvesData,
    )
  }

  onClickBookShelveTryAgain = () => {
    this.getBookShelvesData()
  }

  renderBookShelvesItem = () => {
    const {bookShelveData, search, activeBookLabel} = this.state
    const searchFilter = bookShelveData.filter(each =>
      each.title.toLowerCase().includes(search.toLowerCase()),
    )
    if (searchFilter.length !== 0) {
      return (
        <div className="book-shelve-desktop-view">
          <h1 className="book-shelve-desktop-heading">{activeBookLabel}</h1>
          <ul className="book-shelve-list">
            {searchFilter.map(eachBook => (
              <BookItem bookItemDetails={eachBook} key={eachBook.id} />
            ))}
          </ul>
        </div>
      )
    }
    return <>{this.renderNotMatchView()}</>
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          className="search-icon-btn"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderNotMatchView = () => {
    const {searchInput} = this.state
    return (
      <div className="not-match-container">
        <img
          src="https://res.cloudinary.com/du4atyy1w/image/upload/v1718016823/ptgupax8f4sngd5er0l6.png"
          alt="not books"
          className="not-match-img"
        />
        <p className="not-match-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBookShelvesSlidBar = () => {
    const {activeBookTabId} = this.state
    return (
      <div className="book-shelves-tab-bar-container">
        <h1 className="tab-heading">Bookshelves</h1>
        <ul className="book-shelves-tabs-list">
          {bookshelvesList.map(eachTab => (
            <TabItem
              tabDetails={eachTab}
              key={eachTab.id}
              onClickActiveTabId={this.onClickActiveTabId}
              isActive={activeBookTabId === eachTab.value}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderBookShelvesFailureView = () => (
    <div className="failure-book-shelves-page">
      <img
        src="https://res.cloudinary.com/du4atyy1w/image/upload/v1717823270/BookHub%20Project/nihzekkl2lfjoic8uiin.png"
        className="book-shelves-failure-image"
        alt="failure"
      />
      <p className="book-shelves-failure-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="book-shelves-failure-btn"
        onClick={this.onClickBookShelveTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderSliderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookShelves = () => {
    const {bookShelvesApi} = this.state
    switch (bookShelvesApi) {
      case bookShelvesApiStatus.success:
        return this.renderBookShelvesItem()
      case bookShelvesApiStatus.inProgress:
        return this.renderSliderLoadingView()
      case bookShelvesApiStatus.failure:
        return this.renderBookShelvesFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header shelf />
        <div className="book-shelves-container">
          <div className="mobile-view">
            <div className="search-tabs-container">
              {this.renderSearchContainer()}
              {this.renderBookShelvesSlidBar()}
            </div>
            {this.renderBookShelvesItem()}
          </div>
          <div className="desktop-view">
            {this.renderBookShelvesSlidBar()}
            {this.renderBookShelves()}
            {this.renderSearchContainer()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default BookShelves
