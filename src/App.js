import {Switch, Route} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'

import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={BookShelves} />
      <ProtectedRoute exact path="/books/:id" component={BookDetails} />
      <Route component={PageNotFound} />
    </Switch>
  </>
)

export default App
