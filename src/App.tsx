import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css'
import Users from './features/users/Users'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/users' component={Users} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}

export default App
