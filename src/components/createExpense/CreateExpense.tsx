import { ReactNode, useState } from 'react'
import { Stepper, Step, StepLabel, Button } from '@mui/material'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import ChipRadioGroup from '../chipRadioGroup/ChipRadioGroup'
import ImageUploadState from '../imageUploadState/ImageUploadState'
import CardTitle from '../cardTitle/CardTitle'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import FormWrapper from '../formWrapper/FormWrapper'
import AmountComponent from '../formComponents/amountComponent/AmountComponent'
import DropdownFieldWrapper from '../formComponents/dropdownComponent/DropdownComponent'
import TextAreaWrapper from '../formComponents/textAreaWrapper/TextAreaWrapper'

import { descriptionRegister } from '../../utils/formUtils/descriptionRegister'
import { amountRegister } from '@/utils/formUtils/amountRegister'
import { dateRegister } from '@/utils/formUtils/dateRegister'

import createExpense, { ExpenseData } from '@/services/CRUD/createExpense'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  customButton: {
    color: `#FFFFFF`,
    backgroundColor: `#4C9FC1`,
    '&:hover': {
      borderColor: `#4C9FC1`,
      backgroundColor: `#4C9FC1`,
      color: `white`,
    },
  },
}))

type CreateExpenseProps = {
  path?: string
  children?: ReactNode
}

type PartialExpenseData = Partial<ExpenseData>

export default function CreateExpense({ path }: CreateExpenseProps) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [`Captura los campos`, `Captura la evidencia`]

  const [formData, setFormData] = useState<PartialExpenseData>(
    {} as PartialExpenseData,
  )

  const classes = useStyles()

  const onSubmit = (data: PartialExpenseData) => {
    setFormData(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    console.log(path)
  }

  const handleFinalSubmit = (data: ExpenseData) => {
    const finalData = { ...formData, ...data, user_id: 6 }
    console.log(finalData)
    createExpense(finalData)
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />

      <CardSection>
        <CardTitle>Crear gasto</CardTitle>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={() => setActiveStep(index)}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <FormWrapper<ExpenseData> onSubmit={onSubmit}>
            <TextAreaWrapper
              label="Descripción"
              name="description"
              registerOptions={descriptionRegister}
            />

            <AmountComponent
              label="Monto"
              name="amount"
              registerOptions={amountRegister}
            />
            <TextFieldWrapper
              label="Fecha del gasto"
              name="date"
              registerOptions={dateRegister}
            />

            <DropdownFieldWrapper
              label="Proyecto"
              name="project"
              options={[
                { value: `1`, label: `Comida` },
                { value: `2`, label: `Transporte` },
                { value: `3`, label: `Salud` },
                { value: `4`, label: `Educación` },
                { value: `5`, label: `Entretenimiento` },
              ]}
              registerOptions={{
                required: { value: true, message: `Selecciona una opción` },
              }}
            />

            <TextFieldWrapper
              label="Sitio"
              name="site"
              registerOptions={{
                required: { value: true, message: `Selecciona una opción` },
              }}
            />

            <ChipRadioGroup
              label="Tipo de gasto"
              name="category"
              registerOptions={{
                required: { value: true, message: `Selecciona una opción` },
              }}
            />
            <button type="submit">Next</button>
          </FormWrapper>
        )}

        {activeStep === 1 && (
          <FormWrapper onSubmit={handleFinalSubmit}>
            <ImageUploadState
              name="picture"
              imageRegister={{
                required: { value: true, message: `Sube foto de las facturas` },
              }}
            />

            <button type="submit">
              <Button
                variant="text"
                className={classes.customButton}
                component="span"
              >
                Enviar gasto
              </Button>
            </button>
          </FormWrapper>
        )}
      </CardSection>
    </section>
  )
}
