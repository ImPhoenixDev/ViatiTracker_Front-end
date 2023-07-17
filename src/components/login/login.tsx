import { ReactNode, FunctionComponent } from 'react'
import loadable from '@loadable/component'

type LoginProps = {
  children?: ReactNode
}

const PassageAuth = loadable(() => import(`./PassageAuthWrapper`), {
  fallback: <div>Loading...</div>,
})

const Login: FunctionComponent<LoginProps> = ({ children }) => {
  return (
    <PassageAuth app-id={String(process.env.GATSBY_PASSAGE_APP_ID)}>
      {children}
    </PassageAuth>
  )
}

export default Login
