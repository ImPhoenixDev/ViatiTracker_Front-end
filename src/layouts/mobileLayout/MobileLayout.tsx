import { ReactNode, useState } from 'react'
import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import {
  AccountBalanceWallet,
  Analytics,
  ExitToApp,
  LocalAtm,
} from '@mui/icons-material'
import { windowGlobal } from '@/services/constants'
import { navigate } from 'gatsby'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'

type MobileLayoutProps = {
  children?: ReactNode
  currentPath?: string
}

export default function MobileLayout({
  children,
  currentPath,
}: MobileLayoutProps) {
  const [value, setValue] = useState(currentPath)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const userIsAdmin: boolean =
    JSON.parse(windowGlobal?.localStorage.getItem(`userVT`))?.role ===
      `Admin` || false

  const user = new PassageUser()

  return (
    <div className="h-screen grid grid-rows-layout w-full lg:w-3/6 py-4 m-auto xl:w-1/6 bg-boneBg">
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        className="!m-4 !bg-primary !rounded-xl"
      >
        <BottomNavigationAction
          label="Gastos"
          value="expenses"
          icon={<AccountBalanceWallet />}
          className="!text-white"
          onClick={() => {
            navigate(`/app/dashboard`)
          }}
        />
        {userIsAdmin && (
          <BottomNavigationAction
            label="Depósitos"
            value="deposits"
            icon={<LocalAtm />}
            className="!text-white"
            onClick={() => {
              navigate(`/app/create-deposit`)
            }}
          />
        )}

        {userIsAdmin && (
          <BottomNavigationAction
            label="Reportes"
            value="reports"
            icon={<Analytics />}
            className="!text-white"
            onClick={() => {
              navigate(`/app/create-report`)
            }}
          />
        )}

        <BottomNavigationAction
          label="Salir"
          value="exit"
          icon={<ExitToApp />}
          className="!text-white"
          onClick={() => {
            user.signOut()
            navigate(`/`)
          }}
        />
      </BottomNavigation>
      {children}
    </div>
  )
}
