import { ReactNode, useState } from 'react'
import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { AccountBalanceWallet, Analytics, LocalAtm } from '@mui/icons-material'
import { windowGlobal } from '@/services/constants'
import { navigate } from 'gatsby'

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

  return (
    <div className="h-screen grid grid-rows-layout lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      {children}
      <BottomNavigation
        // sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Gastos"
          value="expenses"
          icon={<AccountBalanceWallet />}
          className="!text-primary"
          onClick={() => {
            navigate(`/app/dashboard`)
          }}
        />
        <BottomNavigationAction
          label="Depósitos"
          value="deposits"
          icon={<LocalAtm />}
          className="!text-primary"
          onClick={() => {
            navigate(`/app/create-deposit`)
          }}
        />

        {userIsAdmin && (
          <BottomNavigationAction
            label="Reportes"
            value="reports"
            icon={<Analytics />}
            className="!text-primary"
          />
        )}
      </BottomNavigation>
    </div>
  )
}
