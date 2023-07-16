import React, { FunctionComponent } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

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

  const token = localStorage.getItem(`psg_auth_token`)
  if (token) {
    console.log(`user logged in`)
    console.log(`token`, token)
  }

  console.log(`token not found`)

  if (!token && location.pathname !== `/`) {
    navigate(`/`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
