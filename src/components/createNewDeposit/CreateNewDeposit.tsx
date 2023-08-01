import { Button } from '@mui/material'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import CardTitle from '../cardTitle/CardTitle'
import FormWrapper from '../formWrapper/FormWrapper'
import TextFieldWrapper from '../textFieldWrapper/TextFieldWrapper'
import CustomDatePicker from '../customDatePicker/CustomDatePicker'
import AmountComponent from '../formComponents/amountComponent/AmountComponent'
import UserSelectorComponent from '../formComponents/userSelectorComponent/UserSelectorComponent'
import { DepositType } from '@/utils/ts-extend/commonTypes'
import { amountRegister } from '@/utils/formUtils/amountRegister'
import ImageUpload from '../imageUploadState/ImageUploadState'
import createDeposit from '@/services/CRUD/createDeposit'
import { windowGlobal } from '@/services/constants'
import { navigate } from 'gatsby'

export default function CreateNewDeposit() {
  function handleSubmit(data: DepositType) {
    const userInfo =
      JSON.parse(windowGlobal.localStorage.getItem(`userVT`)).userId || null

    if (!userInfo) {
      throw new Error(`User info not found`)
    }

    const id = Number(userInfo)
    data.admin_id = id
    data.picture_list = [`https://picsum.photos/200/300`]
    createDeposit(data)
      .then(() => {
        navigate(`/app/dashboard`)
      })
      .catch((err: any) => {
        alert(`Error al crear el deposito`)
        throw new Error(err)
      })
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
            <CustomDatePicker name="deposit_date" required />
            <ImageUpload
              name="picture_list"
              imageRegister={{ required: `Agrega una imagen` }}
            />
          </div>
          <div className="buttons flex justify-between items-end w-full m-auto mb-0">
            <button type="submit" className="mx-0 h-12 w-full">
              <Button
                variant="contained"
                component="span"
                className="!w-full !h-12 !mb-4 !bg-primary"
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
