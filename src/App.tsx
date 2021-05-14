import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css'
import Users from './features/users/Users'
import Profile from './features/profile/Profile'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/users' component={Users} />
        <Route path='/profile/:userId?' component={Profile} />
        <Redirect to='/users' />
      </Switch>
    </Router>
  )
}

export default App
