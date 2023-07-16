import { ReactNode } from 'react'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { navigate } from 'gatsby'

type DashboardProps = {
  path: string
  children?: ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  const user = new PassageUser()
  return (
    <h1>
      Hello from Dashboard {children}
      <button
        onClick={() => {
          user.signOut()
          navigate(`/`)
        }}
      >
        Logout
      </button>
    </h1>
  )
}
