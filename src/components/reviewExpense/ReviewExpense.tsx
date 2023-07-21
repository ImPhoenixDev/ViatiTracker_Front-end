import { useState } from 'react'
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

import { ExpenseData } from '@/services/CRUD/createExpense'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  customButton: {
    backgroundColor: `#4C9FC1`,
    color: `#FFFFFF`,
    '&:hover': {
      backgroundColor: `#4C9FC1`,
    },
  },
})

type ReviewExpenseProps = {
  location?: {
    state: {
      expense: ExpenseData
    }
  }
}

export default function ReveiwExpense({ location }: ReviewExpenseProps) {
  console.log(location?.state.expense)
  const expense = location?.state.expense

  const [activeStep] = useState(0)

  const steps = [`Captura los campos`, `Captura la evidencia`]

  const classes = useStyles()

  const onSubmit = () => {}

  const handleFinalSubmit = () => {}

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <CardSection>
        <CardTitle>Crear gasto</CardTitle>

        {activeStep === 0 && (
          <FormWrapper<ExpenseData> onSubmit={onSubmit} readOnlyData={expense}>
            <TextAreaWrapper
              label="Descripción"
              name="description"
              registerOptions={descriptionRegister}
              readOnly
            />

            <AmountComponent
              label="Monto"
              name="amount"
              registerOptions={amountRegister}
              readOnly
            />
            <TextFieldWrapper
              readOnly
              label="Fecha del gasto"
              name="date"
              registerOptions={dateRegister}
            />

            <DropdownFieldWrapper
              readOnly
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
              readOnly
              label="Sitio"
              name="site"
              registerOptions={{
                required: { value: true, message: `Selecciona una opción` },
              }}
            />

            <div className="my-4">
              <ChipRadioGroup
                readOnly
                label="Tipo de gasto"
                name="category"
                registerOptions={{
                  required: { value: true, message: `Selecciona una opción` },
                }}
              />
            </div>
            <button type="submit" className="mx-0 my-4">
              <Button
                variant="contained"
                component="span"
                className={classes.customButton}
              >
                Siguiente
              </Button>
            </button>
          </FormWrapper>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col h-full">
            <FormWrapper onSubmit={handleFinalSubmit}>
              <ImageUploadState
                name="picture"
                imageRegister={{
                  required: {
                    value: true,
                    message: `Sube foto de las facturas`,
                  },
                }}
              />

              <button type="submit" className="my-8 mx-0">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.customButton}
                >
                  Enviar gasto
                </Button>
              </button>
            </FormWrapper>
          </div>
        )}
      </CardSection>
    </section>
  )
}
