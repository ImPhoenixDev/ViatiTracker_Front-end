import React, { useEffect } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material'

type DropdownFieldWrapperProps = {
  label: string
  name: string
  registerOptions: RegisterOptions
  options: { label: string; value: string }[]
  readOnly?: boolean // Add the readOnly prop
}

const DropdownFieldWrapper: React.FC<DropdownFieldWrapperProps> = ({
  label,
  name,
  registerOptions,
  options,
  readOnly = false,
}) => {
  const {
    register,
    unregister,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const selectedValue = watch(name)
  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message || ``)

  useEffect(() => {
    return () => {
      unregister(name)
    }
  }, [unregister, name])

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (!readOnly) {
      setValue(name, event.target.value)
    }
  }

  return (
    <FormControl error={hasError} variant="standard" className="w-full">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...register(name, registerOptions)}
        name={name}
        labelId={`${name}-label`}
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default DropdownFieldWrapper
