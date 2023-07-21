import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormContext, RegisterOptions } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

interface AmountComponentProps {
  label: string
  name: string
  registerOptions: RegisterOptions
  readOnly?: boolean
}

const AmountComponent: React.FC<AmountComponentProps> = ({
  label,
  name,
  registerOptions,
  readOnly = false,
}) => {
  const {
    register,
    unregister,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext()

  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message ?? ``)

  useEffect(() => {
    register(name, registerOptions)
  }, [register, unregister, name, registerOptions])

  useEffect(() => {
    console.log(`errors`, errors)
    console.log(`name`, name)
    watch(name)
  }, [errors, name, watch])

  return (
    <div>
      <NumericFormat
        customInput={TextField}
        InputProps={{ readOnly }}
        id="standard-basic"
        label={label}
        variant="standard"
        prefix="$"
        thousandSeparator=","
        decimalScale={2}
        allowNegative={false}
        value={getValues(name)}
        onValueChange={({ value }) => {
          if (!readOnly) {
            setValue(name, value, { shouldValidate: true })
          }
        }}
        error={hasError}
        helperText={errorMessage}
      />
    </div>
  )
}

export default AmountComponent
