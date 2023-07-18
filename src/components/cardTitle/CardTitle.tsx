import React from 'react'

type CardTitleProps = {
  children: React.ReactNode
  className?: string
}

export default function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h1 className={`text-dark sans font-bold text-lg my-4 ${className}`}>
      {children}
    </h1>
  )
}
