import { useState } from 'react'
import { navigate } from 'gatsby'

import { Stepper, Step, StepLabel, Button, Alert } from '@mui/material'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import ChipRadioGroup from '../chipRadioGroup/ChipRadioGroup'
import CardTitle from '../cardTitle/CardTitle'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import FormWrapper from '../formWrapper/FormWrapper'
import AmountComponent from '../formComponents/amountComponent/AmountComponent'
import DropdownFieldWrapper from '../formComponents/dropdownComponent/DropdownComponent'
import TextAreaWrapper from '../formComponents/textAreaWrapper/TextAreaWrapper'
import ImageListDisplayer from '../imageListDisplayer/ImageListDisplayer'
import CustomDatePicker from '../customDatePicker/CustomDatePicker'

import { ExpenseData } from '@/services/CRUD/createExpense'
import { descriptionRegister } from '../../utils/formUtils/descriptionRegister'
import { amountRegister } from '@/utils/formUtils/amountRegister'
import updateApproveExpense from '@/services/CRUD/updateApproveExpense'
import { windowGlobal } from '@/services/constants'

type ReviewExpenseProps = {
  path?: string
  location?: {
    state: {
      expense: ExpenseData
    }
  }
}

export default function ReviewExpense({ location }: ReviewExpenseProps) {
  const expense: ExpenseData = location?.state?.expense || ({} as ExpenseData)

  const [activeStep, setActiveStep] = useState(0)

  const userIsAdmin: boolean =
    JSON.parse(windowGlobal?.localStorage.getItem(`userVT`))?.role ===
      `Admin` || false

  const steps = [`Ver Info`, `Ver Imagenes`]

  const onSubmit = () => {
    const id = expense?.id
    const status = `Aprobada`
    updateApproveExpense(id, status)
      .then(() => {
        navigate(`/app/dashboard`)
      })
      .catch((error) => {
        alert(`Error al actualizar el gasto`)
        throw new Error(error)
      })
  }

  // function to reject expense
  const onReject = () => {
    const id = expense?.id
    navigate(`/app/reject-expense`, { state: { expenseId: id } })
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <Stepper activeStep={activeStep} alternativeLabel className="my-4">
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() => {
              setActiveStep(index)
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <CardSection>
        <CardTitle>Revisar gasto</CardTitle>
        <div className="text-sm">Estatus: {expense.status}</div>

        <div
          className={`${
            activeStep === 0 ? `flex flex-col` : `hidden`
          } h-max overflow-y-scroll`}
        >
          {expense?.status === `Rechazada` && (
            <div className="buttons flex justify-between items-end w-full grow my-8">
              <Alert severity="error" className="!overflow-scroll">
                Motivo de rechazo: {expense?.admin_message}
              </Alert>
            </div>
          )}
          <FormWrapper<ExpenseData> onSubmit={onSubmit} readOnlyData={expense}>
            <div className="flex flex-col h-full justify-between">
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

              <CustomDatePicker
                readOnly
                textDisplay="Fecha del gasto"
                name="date"
                defaultValue={expense?.date}
                required
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
            </div>

            {expense?.status !== `Rechazada` && userIsAdmin && (
              <div className="buttons flex justify-between items-end w-full grow">
                <button type="button" className="mx-0 h-12" onClick={onReject}>
                  <Button
                    variant="text"
                    component="span"
                    className="!text-primary"
                  >
                    Rechazar
                  </Button>
                </button>

                <button type="submit" className="mx-0 h-12">
                  <Button
                    variant="contained"
                    component="span"
                    className="whitespace-nowrap text-sm sans !bg-primary"
                  >
                    Aprobar
                  </Button>
                </button>
              </div>
            )}
            {!userIsAdmin && (
              <div className="buttons flex justify-between items-end w-full grow">
                <button
                  type="button"
                  className="mx-0 h-12"
                  onClick={() => {
                    setActiveStep((current) => current + 1)
                  }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    className="whitespace-nowrap text-sm sans !bg-primary"
                  >
                    Siguiente
                  </Button>
                </button>
              </div>
            )}
          </FormWrapper>
        </div>

        <div
          className={`flex flex-col h-full ${
            activeStep === 1 ? `flex` : `hidden`
          }`}
        >
          <ImageListDisplayer pictures={expense?.picture_list} />
          <FormWrapper onSubmit={onSubmit}>
            {expense?.status !== `Rechazada` && userIsAdmin && (
              <div className="buttons flex justify-between items-end w-full grow">
                <button type="button" className="mx-0 h-12" onClick={onReject}>
                  <Button
                    variant="text"
                    component="span"
                    className="!text-primary"
                  >
                    Rechazar
                  </Button>
                </button>

                <button type="submit" className="mx-0 h-12">
                  <Button
                    variant="contained"
                    component="span"
                    className="whitespace-nowrap text-sm sans !bg-primary"
                  >
                    Aprobar
                  </Button>
                </button>
              </div>
            )}
            {!userIsAdmin && (
              <div className="buttons flex justify-between items-end w-full grow">
                <button
                  type="button"
                  className="mx-0 h-12"
                  onClick={() => {
                    setActiveStep((current) => current - 1)
                  }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    className="whitespace-nowrap text-sm sans !bg-primary"
                  >
                    Atrás
                  </Button>
                </button>
              </div>
            )}
          </FormWrapper>
        </div>
      </CardSection>
    </section>
  )
}
