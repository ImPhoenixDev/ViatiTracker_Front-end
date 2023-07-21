import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormContext, RegisterOptions } from 'react-hook-form'

type TextAreaWrapperProps = {
  label: string
  name: string
  registerOptions: RegisterOptions
  readOnly?: boolean
}

const TextAreaWrapper: React.FC<TextAreaWrapperProps> = ({
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
  const fieldValue = watch(name)

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
        InputProps={{ readOnly }}
        value={fieldValue}
      />
    </div>
  )
}

export default TextAreaWrapper
