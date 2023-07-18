import { navigate } from 'gatsby'
import backLogo from '../../images/back.svg'

export default function BackComponent({ path }: { path: string }) {
  return (
    <button
      onClick={() => {
        navigate(path)
      }}
      className="flex items-center text-base text-dark font-600 hover:text-gray-700 my-8 w-32"
    >
      <img src={backLogo} alt="Volver" width="25" height="20" />
      Cancelar
    </button>
  )
}
