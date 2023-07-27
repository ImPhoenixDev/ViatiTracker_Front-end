import { Router } from '@reach/router'
import CreateExpense from '@/components/createExpense/CreateExpense'
import axios from 'axios'

import Login from '../components/login/login'
import Dashboard from '@/components/dashboard/Dashboard'
import PrivateRoute from '@/components/privateRoute/PrivateRoute'
import ReviewExpense from '@/components/reviewExpense/ReviewExpense'
import RejectExpense from '@/components/rejectExpense/RejectExpense'

const App = () => {
  axios.defaults.withCredentials = true

  return (
    <Router>
      <Login path="/" />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <PrivateRoute path="/app/create-expense" component={CreateExpense} />
      <PrivateRoute path="/app/review-expense" component={ReviewExpense} />
      <PrivateRoute path="/app/reject-expense" component={RejectExpense} />
    </Router>
  )
}

export default App
