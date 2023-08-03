import { baseGet } from '../constants'

type ParamsReportType = {
  startDate: string
  endDate: string
  userId?: number
}

export default function downloadNewReport(paramsReport: ParamsReportType) {
  baseGet(
    `/reports/${paramsReport.startDate}/${paramsReport.endDate}/download`,
    {
      userId: paramsReport.userId,
    },
  )
}
