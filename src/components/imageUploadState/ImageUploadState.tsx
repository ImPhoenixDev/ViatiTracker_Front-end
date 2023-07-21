import React, { useState, useEffect } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'
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
    color: `#4C9FC1`,
    borderColor: `#4C9FC1`,
    '&:hover': {
      borderColor: `#4C9FC1`,
      backgroundColor: `#4C9FC1`,
      color: `white`,
    },
  },
}))

type ImageUploadProps = {
  imageRegister: RegisterOptions
  name: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageRegister, name }) => {
  const {
    formState: { errors },
    register,
    unregister,
    setValue,
  } = useFormContext()

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<
    (string | ArrayBuffer | null)[]
  >([])

  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message || ``)

  useEffect(() => {
    register(name, imageRegister)

    return () => unregister(name)
  }, [register, imageRegister])

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)

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
        .then((newImages: any[]) => {
          // Append new previews to existing image previews
          setImagePreviews((prevPreviews) => [...prevPreviews, ...newImages])
          // Append new files to existing images
          setImages((prevImages) => [...prevImages, ...files])
          // Append new files to existing images
          setValue(name, [...images, ...files], { shouldValidate: true })
          console.log(`Images`, images)
        })
        .catch((error) => {
          console.error(`Error occurred while reading the files`, error)
        })
    }
  }

  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages((images) => images.filter((_, i) => i !== index))
    setImagePreviews((previews) => previews.filter((_, i) => i !== index))
    setValue(name, newImages, { shouldValidate: true })
    console.log(`Images`, newImages)
  }

  const classes = useStyles()

  return (
    <div>
      {hasError && (
        <p style={{ color: `red`, fontSize: `14px` }}>{errorMessage}</p>
      )}

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
          variant="outlined"
          className={classes.customButton}
          component="span"
        >
          Seleccionar imágenes
        </Button>
      </label>
      {imagePreviews.length > 0 && (
        <ImageList cols={2} variant="masonry">
          {imagePreviews.map((preview, index) => (
            <ImageListItem key={preview?.toString()}>
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
