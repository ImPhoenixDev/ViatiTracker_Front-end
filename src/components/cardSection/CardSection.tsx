import React from 'react'
type CardSectionProps = {
  children: React.ReactNode
}

export default function CardSection(props: CardSectionProps) {
  const { children, ...rest } = props

  return (
    <div
      {...rest}
      className="bg-white shadow rounded-[20px] h-full p-8 overflow-y-scroll"
    >
      <div className="h-full flex flex-col justify-items-end justify-end">
        <div className="flex flex-col h-full">{children}</div>
      </div>
    </div>
  )
}
