import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormContext, RegisterOptions } from 'react-hook-form'

type TextFieldWrapperProps = {
  label: string
  name: string
  registerOptions: RegisterOptions
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
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
        id="standard-basic"
        label={label}
        variant="standard"
      />
    </div>
  )
}

export default TextFieldWrapper
