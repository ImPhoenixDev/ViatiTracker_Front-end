import React from 'react'
import Webcam from 'react-webcam'

const WebcamCapture: React.FC = () => {
  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
      />
    </div>
  )
}

export default WebcamCapture
