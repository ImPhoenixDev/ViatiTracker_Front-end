import React from 'react'
import '@passageidentity/passage-elements/passage-auth'

import './passage.css'

type PassageAuthProps = {
  'app-id': string
  children?: React.ReactNode
}

const PassageAuthWrapper: React.FC<PassageAuthProps> = ({
  'app-id': appId,
  children,
}) => {
  if (typeof window !== `undefined`) {
    return (
      <passage-auth app-id={appId} lang="es">
        {children}
      </passage-auth>
    )
  }

  // Return null or a placeholder component when rendering server-side.
  return null
}

export default PassageAuthWrapper
