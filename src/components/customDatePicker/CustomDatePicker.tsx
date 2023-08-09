import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import esMx from 'dayjs/locale/es-mx'

interface CustomDatePickerProps {
  textDisplay?: string
  name: string
  className?: string
  defaultValue?: string | Date
  required?: boolean
  readOnly?: boolean // Add this line
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  textDisplay = `Fecha`,
  name,
  className = ``,
  defaultValue,
  required = false,
  readOnly = false, // Add this line
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext()

  // Convert the defaultValue to a Day.js object if it's provided
  const defaultDate = defaultValue ? dayjs(defaultValue) : undefined
  // Watch the field's value from the form
  const selectedDate = watch(name, defaultDate)

  const errorMessage = errors[name]?.message || ``
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={esMx}
      locale={esMx}
    >
      <MobileDatePicker
        {...register(name, {
          required: { value: required, message: `Este campo es requerido` },
        })}
        label={textDisplay}
        format="DD/MMM/YYYY"
        value={selectedDate}
        readOnly={readOnly} // Apply the readOnly prop here
        onChange={(date) => {
          if (date && !readOnly) {
            // Check if readOnly is false
            setValue(name, date.toDate().toISOString())
          }
        }}
        className={className}
        slotProps={{
          textField: {
            variant: `standard`,
            error: !!errors[name],
            helperText: String(errorMessage),
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default React.memo(CustomDatePicker)
