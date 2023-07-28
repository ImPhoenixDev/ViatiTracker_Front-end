import { Button } from '@mui/material'

import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import CardTitle from '../cardTitle/CardTitle'
import FormWrapper from '../formWrapper/FormWrapper'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import CustomDatePicker from '../customDatePicker/CustomDatePicker'
import AmountComponent from '../formComponents/amountComponent/AmountComponent'
import { amountRegister } from '@/utils/formUtils/amountRegister'
// import ImageUpload from '../imageUploadState/ImageUploadState'
import UserSelectorComponent from '../formComponents/userSelectorComponent/UserSelectorComponent'

type DepositType = {
  user_id: number
  date: string
  picture: string
  description: string
  category: string
  amount: number
}

export default function CreateNewDeposit() {
  function handleSubmit(data: DepositType) {
    console.log(data)
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <CardSection>
        <CardTitle>Nuevo deposito</CardTitle>
        <FormWrapper onSubmit={handleSubmit}>
          <div className="flex flex-col justify-start h-full space-y-4 overflow-y-scroll">
            <TextFieldWrapper
              name="description"
              label="Descripción"
              registerOptions={{ required: true }}
            />

            <UserSelectorComponent name="user_id" />

            <AmountComponent
              label="Monto"
              name="amount"
              registerOptions={amountRegister}
            />

            <CustomDatePicker name="date" required />

            {/* <ImageUpload name="picture"  imageRegister={{ required: `Agrega una imagen` }} /> */}
          </div>
          <div className="buttons flex justify-between items-end w-full m-auto mb-0">
            <button type="submit" className="mx-0 h-12 w-full">
              <Button
                variant="contained"
                component="span"
                className="whitespace-nowrap text-sm sans !bg-primary !w-full"
              >
                Registrar deposito
              </Button>
            </button>
          </div>
        </FormWrapper>
      </CardSection>
    </section>
  )
}
