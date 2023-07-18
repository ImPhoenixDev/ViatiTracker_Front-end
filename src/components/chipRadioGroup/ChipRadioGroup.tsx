import * as React from 'react'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Typography from '@mui/joy/Typography'
import CheckIcon from '@mui/icons-material/Check'

const chipData: string[] = [
  `Alimentos`,
  `Gasolina`,
  `Medicamentos`,
  `Otros`,
  `Material`,
]

const ChipRadioGroup: React.FC = () => {
  const [selectedChip, setSelectedChip] = React.useState<string>(``)

  return (
    <Box sx={{ display: `flex`, flexDirection: `column`, gap: 1 }}>
      <Typography level="h2" fontSize="lg" id="chip-group" mb={2}>
        Select a chip
      </Typography>
      <RadioGroup
        name="chip-group"
        aria-labelledby="chip-group"
        orientation="horizontal"
        sx={{ flexWrap: `wrap`, gap: 1 }}
      >
        {chipData.map((chip) => {
          const isSelected = selectedChip === chip
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.checked) {
                    setSelectedChip(chip)
                  }
                }}
              />
            </Chip>
          )
        })}
      </RadioGroup>
    </Box>
  )
}

export default ChipRadioGroup
