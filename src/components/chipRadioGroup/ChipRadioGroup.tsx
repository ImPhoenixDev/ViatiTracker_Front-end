import * as React from 'react'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Typography from '@mui/joy/Typography'
import CheckIcon from '@mui/icons-material/Check'
import { Controller, useFormContext, RegisterOptions } from 'react-hook-form'

interface ChipRadioGroupProps {
  label: string
  name: string
  registerOptions: RegisterOptions
}

const chipData: string[] = [
  `Alimentos`,
  `Gasolina`,
  `Medicamentos`,
  `Otros`,
  `Material`,
]

const ChipRadioGroup: React.FC<ChipRadioGroupProps> = ({
  label,
  name,
  registerOptions,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const hasError = Boolean(errors[name])
  const errorMessage = String(errors[name]?.message ?? ``) || ``

  return (
    <Box sx={{ display: `flex`, flexDirection: `column`, gap: 1 }}>
      <Typography level="h2" fontSize="lg" id="chip-group" mb={2}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            name={name}
            aria-labelledby="chip-group"
            orientation="horizontal"
            sx={{ flexWrap: `wrap`, gap: 1 }}
            value={value || ``}
            onChange={(event) => onChange(event.target.value)}
          >
            {chipData.map((chip) => {
              const isSelected = value === chip
              return (
                <Chip
                  key={chip}
                  variant={isSelected ? `soft` : `plain`}
                  color={isSelected ? `primary` : `neutral`}
                  startDecorator={
                    isSelected && (
                      <CheckIcon sx={{ zIndex: 1, pointerEvents: `none` }} />
                    )
                  }
                >
                  <Radio
                    variant="outlined"
                    color={isSelected ? `primary` : `neutral`}
                    disableIcon
                    overlay
                    label={chip}
                    value={chip}
                    checked={isSelected}
                  />
                </Chip>
              )
            })}
          </RadioGroup>
        )}
      />
      {hasError && <p>{errorMessage}</p>}
    </Box>
  )
}

export default ChipRadioGroup
