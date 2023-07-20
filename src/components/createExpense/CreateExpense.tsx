import { ReactNode, useState } from 'react'
import { navigate } from 'gatsby'
import { Stepper, Step, StepLabel } from '@mui/material'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import ChipRadioGroup from '../chipRadioGroup/ChipRadioGroup'
import ImageUploadState from '../imageUploadState/ImageUploadState'
import CardTitle from '../cardTitle/CardTitle'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import FormWrapper from '../formWrapper/FormWrapper'
import AmountComponent from '../formComponents/amountComponent/AmountComponent'
import DropdownFieldWrapper from '../formComponents/dropdownComponent/DropdownComponent'

import { emailRegister } from '../../utils/formUtils/emailRegister'
import { amountRegister } from '@/utils/formUtils/amountRegister'
import { dateRegister } from '@/utils/formUtils/dateRegister'

type CreateExpenseProps = {
  path?: string
  children?: ReactNode
}

type FormData = {
  email: string
  amount: string
  date: string
  project: string
  site: string
  expenseType: string
}

export default function CreateExpense({ path }: CreateExpenseProps) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [`Captura los campos`, `Captura la evidencia`]

  const [formData, setFormData] = useState<FormData>({} as FormData)

  const onSubmit = (data: FormData) => {
    setFormData(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    console.log(path)
  }

  const handleFinalSubmit = () => {
    console.log(formData)
    navigate(`/app/dashboard`)
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
          <FormWrapper onSubmit={onSubmit}>
            <TextFieldWrapper
              label="Email"
              name="email"
              registerOptions={emailRegister}
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
              name="expenseType"
              registerOptions={{
                required: { value: true, message: `Selecciona una opción` },
              }}
            />
            <button type="submit">Next</button>
          </FormWrapper>
        )}

        {activeStep === 1 && (
          <FormWrapper onSubmit={handleFinalSubmit}>
            <ImageUploadState imageRegister={{ required: true }} />
            <button type="submit">Enviar gasto</button>
          </FormWrapper>
        )}
      </CardSection>
    </section>
  )
}
