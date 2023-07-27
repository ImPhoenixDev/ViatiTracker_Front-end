import { useState } from 'react'
import { Button, Typography } from '@mui/material'

import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import CardTitle from '../cardTitle/CardTitle'
import FormWrapper from '../formWrapper/FormWrapper'
import TextAreaWrapper from '../formComponents/textAreaWrapper/TextAreaWrapper'
import updateRejectExpense from '@/services/CRUD/updateRejectExpense'
import rejectionMotiveRegister from '@/utils/formUtils/rejectionMotiveRegister'
import { CheckCircle } from '@mui/icons-material'

type RejectExpenseProps = {
  path?: string
  location?: {
    state: {
      expenseId: string
    }
  }
}

type RejectData = {
  motive: string
}

export default function RejectExpense({ location }: RejectExpenseProps) {
  const expenseId = Number(location?.state.expenseId)

  const [isRejected, setIsRejected] = useState(false)

  const onReject = (data: RejectData) => {
    if (expenseId) {
      updateRejectExpense(expenseId, `Rechazada`, data.motive)
        .then(() => {
          console.log(`Gasto rechazado`)
          setIsRejected(true)
        })
        .catch((error) => {
          alert(`Error al rechazar el gasto`)
          throw new Error(error)
        })
    }
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <CardSection>
        {isRejected ? (
          <div className="grow flex flex-col justify-center items-center h-full w-full">
            <Typography variant="h5">Gasto rechazado</Typography>
            <CheckCircle sx={{ fontSize: 100, color: `#4caf50` }} />
          </div>
        ) : (
          <>
            <CardTitle>Rechazar gasto</CardTitle>
            <FormWrapper onSubmit={onReject}>
              <TextAreaWrapper
                label="Motivo"
                name="motive"
                registerOptions={rejectionMotiveRegister}
              />
              <div className="buttons flex justify-between items-end w-full grow">
                <button type="submit" className="mx-0 h-12 w-full">
                  <Button
                    variant="contained"
                    component="span"
                    className="whitespace-nowrap text-sm sans !bg-red-500 !w-full"
                  >
                    Rechazar
                  </Button>
                </button>
              </div>
            </FormWrapper>
          </>
        )}
      </CardSection>
    </section>
  )
}
