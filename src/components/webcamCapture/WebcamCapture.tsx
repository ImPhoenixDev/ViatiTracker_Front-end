import React, { useEffect, useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Modal from 'react-modal'

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: `user`,
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot()
    setCapturedImage(imageSrc)
  }, [webcamRef, setIsOpen])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  // Check for camera permissions
  useEffect(() => {
    const checkCameraPermission = async () => {
      const permissions = await navigator.permissions.query({ name: `camera` })
      if (permissions.state === `denied`) {
        alert(
          `Camera permission was denied. Please enable it in your browser settings.`,
        )
      }
    }

    checkCameraPermission()
  }, [])

  return (
    <div>
      <button onClick={openModal}>Open Webcam</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Webcam Modal"
      >
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
      {capturedImage && <img src={capturedImage} alt="Captured" />}
    </div>
  )
}

export default WebcamCapture
