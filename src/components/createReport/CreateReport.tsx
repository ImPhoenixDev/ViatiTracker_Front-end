import CustomDatePicker from '../customDatePicker/CustomDatePicker'
import UserSelectorComponent from '../formComponents/userSelectorComponent/UserSelectorComponent'
import FormWrapper from '../formWrapper/FormWrapper'
import { Button } from '@mui/material'
import CardSection from '../cardSection/CardSection'
import BackComponent from '../backComponent/BackComponent'
import downloadNewReport from '@/services/CRUD/downloadNewReport'
import { navigate } from 'gatsby'

export default function CreateReport() {
  function onSubmit(data: any) {
    const startDate = new Date(data.start_date).toISOString().split(`T`)[0]
    const endDate = new Date(data.end_date).toISOString().split(`T`)[0]
    if (data.user === ``) {
      data.user = null
    }

    downloadNewReport({ startDate, endDate, userId: data.user })
      .then(() => {
        navigate(`/app/dashboard`)
      })
      .catch((error: unknown) => {
        console.error(error)
        alert(`Server error. Please try again later.`)
      })
  }

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
      <CardSection>
        <h1>Create Report</h1>
        <FormWrapper onSubmit={onSubmit}>
          <div className="flex flex-col justify-start h-full space-y-4 overflow-y-scroll">
            <CustomDatePicker
              textDisplay="Fecha inicial del reporte"
              name="start_date"
              required
            />

            <CustomDatePicker
              textDisplay="Fecha final del reporte"
              name="end_date"
              required
            />
            <UserSelectorComponent name="user" optional />
          </div>
          <button type="submit" className="w-full">
            <Button
              variant="contained"
              component="span"
              className="!w-11/12 !h-12 !mb-4 !bg-primary"
            >
              Descargar
            </Button>
          </button>
        </FormWrapper>
      </CardSection>
    </section>
  )
}
