import React, { useState, useEffect } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'
import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  CircularProgress,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { makeStyles } from '@mui/styles'
import uploadImage from '@/services/CRUD/uploadImage'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message || ``)

  useEffect(() => {
    register(name, imageRegister)

    return () => unregister(name)
  }, [register, imageRegister])

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setIsLoading(true)

      const files = Array.from(event.target.files)

      const filePromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve({ file, result: reader.result })
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      Promise.all(filePromises)
        .then((fileData) => {
          const uploadPromises = fileData.map(({ file, result }) => {
            const formData = new FormData()
            formData.append(`file`, file)

            return uploadImage(formData).then((data) => {
              if (data.data.url && data.data.identifier) {
                return { result, identifier: data.data.identifier }
              } else {
                throw new Error(`Upload failed`)
              }
            })
          })

          return Promise.all(uploadPromises)
        })
        .then((newImages: any[]) => {
          console.log(`newImages`, newImages)
          console.log(`images`, images)

          setImagePreviews((prevPreviews) => [
            ...prevPreviews,
            ...newImages.map((image) => image.result),
          ])
          setImages((prevImages) => [
            ...prevImages,
            ...newImages.map((image) => image.identifier),
          ])
          setValue(
            name,
            [...images, ...newImages.map((image) => image.identifier)],
            { shouldValidate: true },
          )
        })
        .catch((error) => {
          console.error(`Error occurred while reading the files`, error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    setImagePreviews((previews) => previews.filter((_, i) => i !== index))
    setValue(name, newImages, { shouldValidate: true })
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
      {isLoading && <CircularProgress />}
      {` `}
      {/* Show loading spinner while uploading */}
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
