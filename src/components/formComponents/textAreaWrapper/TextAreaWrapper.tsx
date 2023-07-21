import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormContext, RegisterOptions } from 'react-hook-form'

type TextAreaWrapperProps = {
  label: string
  name: string
  registerOptions: RegisterOptions
}

const TextAreaWrapper: React.FC<TextAreaWrapperProps> = ({
  label,
  name,
  registerOptions,
}) => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext()

  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message || ``)

  useEffect(() => {
    return () => {
      unregister(name)
    }
  }, [unregister, name])

  return (
    <div>
      <TextField
        {...register(name, registerOptions)}
        name={name}
        error={hasError}
        helperText={errorMessage}
        id="standard-multiline-static"
        label={label}
        variant="standard"
        multiline
        rows={4}
      />
    </div>
  )
}

export default TextAreaWrapper
