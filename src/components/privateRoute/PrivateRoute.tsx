import React, { FunctionComponent } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { windowGlobal } from '@/services/constants'

type ComponentProps = {
  children?: React.ReactNode
  path: string
}

type IPrivateRouteProps = {
  component: FunctionComponent<ComponentProps>
  path: string
  [x: string]: any
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation()

  const token = windowGlobal.localStorage.getItem(`psg_auth_token`)
  if (token) {
    console.log(`user logged in`)
    console.log(`token`, token)
  }

  if (!token && location.pathname !== `/`) {
    navigate(`/`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
