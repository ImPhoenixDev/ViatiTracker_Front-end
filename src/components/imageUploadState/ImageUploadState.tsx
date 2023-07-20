import React, { useState, useEffect } from 'react'
import { useForm, RegisterOptions } from 'react-hook-form'
import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material'

import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'

const useStyles = makeStyles(() => ({
  customButton: {
    backgroundColor: `#4C9FC1`,
    color: `#FFF`,
    '&:hover': {
      backgroundColor: `#4C9FC1`,
    },
  },
}))

type ImageUploadProps = {
  imageRegister: RegisterOptions
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageRegister }) => {
  const { register, setValue } = useForm()
  const [, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<
    (string | ArrayBuffer | null)[]
  >([])

  useEffect(() => {
    register(`images`, imageRegister)
  }, [register, imageRegister])

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)

      // Append new files to existing images
      setImages((prevImages) => [...prevImages, ...files])

      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              resolve(reader.result)
            }
            reader.onerror = (e) => {
              console.error(`File reading has failed`, e)
              reject(e)
            }
            reader.readAsDataURL(file)
          })
        }),
      )
        .then((images: any[]) => {
          // Append new previews to existing image previews
          setImagePreviews((prevPreviews) => [...prevPreviews, ...images])
        })
        .catch((error) => {
          console.error(`Error occurred while reading the files`, error)
        })

      // Append new files to existing images
      setValue(`images`, (prevImages: File[]) => [...prevImages, ...files])
    }
  }

  const handleDelete = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index))
    setImagePreviews((previews) => previews.filter((_, i) => i !== index))
  }

  const classes = useStyles()

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        id="image-upload"
        onChange={handleUpload}
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          className={classes.customButton}
          component="span"
        >
          Seleccionar imágenes
        </Button>
      </label>
      {imagePreviews.length > 0 && (
        <ImageList cols={2} variant="masonry">
          {imagePreviews.map((preview, index) => (
            <ImageListItem key={preview.toString()}>
              <img
                src={typeof preview === `string` ? preview : ``}
                alt={`Preview ${index}`}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  )
}

export default ImageUpload
