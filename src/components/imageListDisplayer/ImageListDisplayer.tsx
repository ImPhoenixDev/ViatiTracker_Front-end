import React, { useState, useEffect } from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Dialog,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import getUrlOfImageByIdentifier from '@/services/CRUD/getUrlOfImageByIdentifier'

type ImageListComponentProps = {
  pictures: string[]
}

const ImageListDisplayer: React.FC<ImageListComponentProps> = ({
  pictures,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(``)

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = await Promise.all(
        pictures.map((identifier) =>
          getUrlOfImageByIdentifier(identifier).then((res) => res.data.url),
        ),
      )
      setImageUrls(urls)
    }

    fetchUrls()
  }, [pictures])

  const handleClickOpen = (url: string) => {
    setCurrentImage(url)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {imageUrls.length > 0 && (
        <ImageList cols={2} variant="masonry">
          {imageUrls.map((url, index) => (
            <ImageListItem
              key={url?.toString()}
              onClick={() => handleClickOpen(url)}
            >
              <img
                src={typeof url === `string` ? url : ``}
                alt={`Preview de imagen de factura ${index}`}
              />
              <ImageListItemBar />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <Dialog open={open} onClose={handleClose} fullScreen>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <img
          src={currentImage}
          alt="Preview"
          style={{ width: `100%`, height: `auto` }}
        />
      </Dialog>
    </>
  )
}

export default ImageListDisplayer
