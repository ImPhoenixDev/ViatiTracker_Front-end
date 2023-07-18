import { ReactNode, useState } from 'react'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { navigate } from 'gatsby'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ExpenseRow from '../expenseRow/ExpenseRow'
import CardTitle from '../cardTitle/CardTitle'

type DashboardProps = {
  path: string
  children?: ReactNode
}

export default function Dashboard({ path }: DashboardProps) {
  console.log(path)
  const [team, setTeam] = useState<string>(``)

  const handleChange = (event: SelectChangeEvent) => {
    setTeam(String(event.target.value))
  }

  const user = new PassageUser()
  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <button
        className="h-12 w-full text-end overflow-hidden rounded-lg text-lg italic"
        onClick={() => {
          user.signOut()
          navigate(`/`)
        }}
      >
        Cerrar sesión
      </button>
      <div>
        <FormControl variant="standard" sx={{ minWidth: `100%` }}>
          <InputLabel id="demo-simple-select-standard-label">Lider</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={team}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="Juan Perez">Juan Perez</MenuItem>
            <MenuItem value="John Doe">John Doe</MenuItem>
          </Select>
        </FormControl>
      </div>

      <CardTitle>Facturas registradas</CardTitle>

      <table className="">
        <ExpenseRow
          description="Comida la dona"
          amount={100}
          category="Alimentos"
          status="Aprobada"
          date="15/07/2021"
        />

        <ExpenseRow
          description="Comida la dona"
          amount={100}
          category="Alimentos"
          status="Enviada"
          date="15/07/2021"
        />

        <ExpenseRow
          description="Comida la dona"
          amount={100}
          category="Alimentos"
          status="Rechazada"
          date="15/07/2021"
        />
      </table>

      <div className="dashboard__footer m-auto mb-0 w-full shadow-lg bg-white rounded-[20px] flex flex-col items-center justify-self-end">
        <table className="w-10/12 my-8 text-lightGray">
          <tbody>
            <tr>
              <td>Depositos</td>
              <td className="text-end text-green-600">$100.00</td>
            </tr>
            <tr className="border-lightGray border-b">
              <td>Gastos</td>
              <td className="text-end text-lightGray">$50.00</td>
            </tr>
            <tr>
              <td className="sans text-primary font-bold">Saldo</td>
              <td className="text-end text-primary">$50.00</td>
            </tr>
          </tbody>
        </table>
        <button
          className="group relative h-12 w-10/12 mb-4 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white"
          onClick={() => {
            navigate(`/app/create-expense`)
          }}
        >
          Agregar gasto
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </div>
    </section>
  )
}
