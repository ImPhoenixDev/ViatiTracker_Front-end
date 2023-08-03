import axios from 'axios'
import { token, URL } from '../constants'
import { saveAs } from 'file-saver'

type ParamsReportType = {
  startDate: string
  endDate: string
  userId?: number
}

export default async function downloadNewReport(
  paramsReport: ParamsReportType,
) {
  const p = paramsReport
  const url = `${URL}/reports/${p.startDate}/${p.endDate}/download${
    p.userId ? `?idUser=` + p.userId : ``
  }`

  try {
    const response = await axios.get(url, {
      responseType: `blob`, // 'blob' since we're in the browser environment
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const blob = new Blob([response.data], {
      type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
    })

    saveAs(blob, `expenses.xlsx`)
  } catch (error) {
    console.error(`Error downloading the file`, error)
  }
}
