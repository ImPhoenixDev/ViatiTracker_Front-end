import { useState } from 'react'
import { Stepper, Step, StepLabel, Button } from '@mui/material'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import ChipRadioGroup from '../chipRadioGroup/ChipRadioGroup'
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
import updateApproveExpense from '@/services/CRUD/updateApproveExpense'
import { navigate } from 'gatsby'
import updateRejectExpense from '@/services/CRUD/updateRejectExpense'
import ImageListDisplayer from '../imageListDisplayer/ImageListDisplayer'

type ReviewExpenseProps = {
  path?: string
  location?: {
    state: {
      expense: ExpenseData
    }
  }
}

export default function ReviewExpense({ location }: ReviewExpenseProps) {
  const useStyles = makeStyles({
    customButton: {
      backgroundColor: `#4C9FC1`,
      color: `#FFFFFF`,
      '&:hover': {
        backgroundColor: `#4C9FC1`,
      },
    },
  })
  console.log(location?.state.expense)
  const expense = location?.state.expense

  const [activeStep, setActiveStep] = useState(0)

  const steps = [`Ver Info`, `Ver Imagenes`]

  const classes = useStyles()

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
    const status = `Rechazada`
    const message: string = prompt(`Escribe un mensaje para el usuario`) || ``
    updateRejectExpense(id, status, message)
      .then(() => {
        navigate(`/app/dashboard`)
      })
      .catch((error) => {
        alert(`Error al actualizar el gasto`)
        throw new Error(error)
      })
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <Stepper activeStep={activeStep} alternativeLabel>
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
            <div className="buttons flex justify-between items-end w-full grow">
              <button type="button" className="mx-0 h-12" onClick={onReject}>
                <Button variant="text" component="span">
                  Rechazar
                </Button>
              </button>

              <button type="submit" className="mx-0 h-12">
                <Button
                  variant="contained"
                  component="span"
                  className={`${classes.customButton} whitespace-nowrap text-sm sans`}
                >
                  Aprobar
                </Button>
              </button>
            </div>
          </FormWrapper>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col h-full">
            <ImageListDisplayer pictures={expense?.picture_list} />
            <FormWrapper onSubmit={onSubmit}>
              <div className="buttons flex justify-between items-end w-full grow">
                <button type="button" className="mx-0 h-12" onClick={onReject}>
                  <Button variant="text" component="span">
                    Rechazar
                  </Button>
                </button>

                <button type="submit" className="mx-0 h-12">
                  <Button
                    variant="contained"
                    component="span"
                    className={`${classes.customButton} whitespace-nowrap text-sm sans`}
                  >
                    Aprobar
                  </Button>
                </button>
              </div>
            </FormWrapper>
          </div>
        )}
      </CardSection>
    </section>
  )
}
