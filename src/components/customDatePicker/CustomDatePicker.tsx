import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import esMx from 'dayjs/locale/es-mx'

interface CustomDatePickerProps {
  textDisplay?: string
  name: string
  className?: string
  defaultValue?: string | Date
  required?: boolean
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  textDisplay = `Fecha`,
  name,
  className = ``,
  required = false,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

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
        onChange={(date) => {
          if (date) {
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
