import { ReactNode } from 'react'
import '@passageidentity/passage-elements/passage-auth'

type LoginProps = {
  path: string
  children?: ReactNode
}

export default function Login({ children }: LoginProps) {
  return (
    <passage-auth app-id={process.env.GATSBY_PASSAGE_APP_ID}>
      {children}
    </passage-auth>
  )
}
