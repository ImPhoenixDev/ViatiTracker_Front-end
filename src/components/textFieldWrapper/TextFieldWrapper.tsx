import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormContext, RegisterOptions } from 'react-hook-form'

type TextFieldWrapperProps = {
  label: string
  name: string
  registerOptions: RegisterOptions
  readOnly?: boolean
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  label,
  name,
  registerOptions,
  readOnly = false,
}) => {
  const {
    register,
    unregister,
    formState: { errors },
    watch,
  } = useFormContext()

  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message || ``)
  const fieldValue = watch(name) || ``

  useEffect(() => {
    return () => {
      unregister(name)
    }
  }, [unregister, name])

  return (
    <TextField
      {...register(name, registerOptions)}
      InputProps={{ readOnly }}
      value={fieldValue}
      name={name}
      error={hasError}
      helperText={errorMessage}
      id="standard-basic"
      label={label}
      variant="standard"
    />
  )
}

export default TextFieldWrapper
