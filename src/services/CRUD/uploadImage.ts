import axios from 'axios'

// const formData = new FormData()
// formData.append(`file`, file)
//
// return fetch(`http://localhost:8001/media/uploadfile`, {
//   method: `POST`,
//   body: formData,
// })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.success) {
//       return { result, identifier: data.data.identifier }
//     } else {
//       throw new Error(`Upload failed`)
//     }
//   })
export default function uploadImage(formData: FormData) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)

  return axios.post(`${URL}/media/uploadfile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
