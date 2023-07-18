import * as React from 'react'

interface ImageUploadState {
  image: string | ArrayBuffer | null
}

class ImageUpload extends React.Component<{}, ImageUploadState> {
  fileInput: React.RefObject<HTMLInputElement>

  constructor(props: {}) {
    super(props)
    this.state = {
      image: null,
    }

    this.fileInput = React.createRef()
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload() {
    const file = this.fileInput.current?.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        this.setState({
          image: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    const { image } = this.state

    return (
      <div>
        <input
          type="file"
          ref={this.fileInput}
          accept="image/*"
          onChange={this.handleUpload}
        />
        {image && (
          <img
            src={typeof image === `string` ? image : ``}
            alt="Preview"
            style={{ maxHeight: `200px` }}
          />
        )}
      </div>
    )
  }
}

export default ImageUpload
