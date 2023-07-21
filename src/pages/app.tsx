import { Router } from '@reach/router'

import Login from '../components/login/login'
import Dashboard from '@/components/dashboard/Dashboard'
import PrivateRoute from '@/components/privateRoute/PrivateRoute'
import CreateExpense from '@/components/createExpense/CreateExpense'
import axios from 'axios'

const App = () => {
  axios.defaults.withCredentials = true

  return (
    <Router>
      <Login path="/" />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <PrivateRoute path="/app/create-expense" component={CreateExpense} />
    </Router>
  )
}

export default App
