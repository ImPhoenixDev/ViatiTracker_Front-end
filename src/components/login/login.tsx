import { ReactNode, FunctionComponent } from 'react'
import loadable from '@loadable/component'
import loginImg from '../../images/login-financial.svg'

type LoginProps = {
  children?: ReactNode
  path?: string
}

const PassageAuth = loadable(() => import(`./PassageAuthWrapper`), {
  fallback: <div></div>,
})

const Login: FunctionComponent<LoginProps> = ({ children }) => {
  return (
    <section className="login flex flex-col lg:w-3/6 m-auto pt-16">
      <div className="sans text-primary text-6xl font-semi text-center">
        ViatiTracker
      </div>

      <div className="img-wrapper flex">
        <img className="w-3/5 m-auto" src={loginImg} alt="login" />
      </div>

      <PassageAuth app-id={String(process.env.GATSBY_PASSAGE_APP_ID)}>
        {children}
      </PassageAuth>
    </section>
  )
}

export default Login
