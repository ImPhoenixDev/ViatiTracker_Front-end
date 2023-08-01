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
import CustomDatePicker from '../customDatePicker/CustomDatePicker'

import { descriptionRegister } from '../../utils/formUtils/descriptionRegister'
import { amountRegister } from '@/utils/formUtils/amountRegister'
import createExpense, { ExpenseData } from '@/services/CRUD/createExpense'
import { navigate } from 'gatsby'
import { windowGlobal } from '@/services/constants'
import { UserSessionDataType } from '../dashboard/Dashboard'

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

  const onSubmit = (data: PartialExpenseData) => {
    setFormData(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    console.log(path)
  }

  const handleFinalSubmit = (data: ExpenseData) => {
    const userSessionData: UserSessionDataType = JSON.parse(
      windowGlobal.localStorage?.getItem(`userVT`) || `{}`,
    )

    const finalData = { ...formData, ...data, user_id: userSessionData.userId }

    createExpense(finalData).then(() => navigate(`/app/dashboard`))
  }

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
          <FormWrapper<ExpenseData> onSubmit={onSubmit}>
            <div className="flex flex-col justify-start h-full space-y-4 overflow-y-scroll">
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

              <CustomDatePicker
                textDisplay="Fecha del gasto"
                name="date"
                required
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

              <div className="my-4">
                <ChipRadioGroup
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
                  className="!w-full !h-12 !mb-4 !bg-primary"
                >
                  Siguiente
                </Button>
              </button>
            </div>
          </FormWrapper>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col w-full grow">
            <FormWrapper onSubmit={handleFinalSubmit}>
              <ImageUploadState
                name="picture_list"
                imageRegister={{
                  required: {
                    value: true,
                    message: `Sube foto de las facturas`,
                  },
                }}
              />

              <button type="submit" className="mx-0 m-auto mb-0">
                <Button
                  variant="contained"
                  component="span"
                  className="!w-full !h-12 !mb-4 !bg-primary"
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
