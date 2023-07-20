import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Modal from 'react-modal'
import './WebcamCapture.css'

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: { exact: `environment` },
  }

  const capture = useCallback(
    (e) => {
      e.preventDefault()
      const imageSrc = String(webcamRef?.current?.getScreenshot())
      setCapturedImage(imageSrc)
      setIsOpen(false)
    },
    [webcamRef, setIsOpen],
  )

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>Open Webcam</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Webcam Modal"
        className="sticky top-0 left-0 right-0 bottom-0 z-50"
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
