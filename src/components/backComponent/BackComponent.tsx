import { navigate } from 'gatsby'

export default function BackComponent({ path }: { path: string }) {
  return (
    <div>
      <button
        onClick={() => {
          navigate(path)
        }}
      >
        Cancelar
      </button>
    </div>
  )
}
