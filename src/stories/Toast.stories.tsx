import React, { useEffect, useRef, useState } from 'react'
import { Button, Toast, ToastProps } from '@ignite-ui/react'
import { StoryObj } from '@storybook/react'

interface DemoToastProps extends ToastProps {
  initialOpen?: boolean
}

const DemoToast: React.FC<DemoToastProps> = ({
  initialOpen = false,
  ...props
}) => {
  const [isOpen, setOpen] = useState(initialOpen)
  const timeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timeRef.current !== undefined) {
        clearTimeout(timeRef.current)
      }
    }
  }, [])

  const handleButtonClick = () => {
    setOpen(false)
    if (timeRef.current !== undefined) {
      clearTimeout(timeRef.current)
    }
    timeRef.current = window.setTimeout(() => setOpen(true), 100)
  }

  return (
    <div>
      <Button onClick={handleButtonClick}>Agendar</Button>
      <Toast open={isOpen} onOpenChange={setOpen} {...props} />
    </div>
  )
}

export default {
  title: 'Form/Toast',
  component: DemoToast,
  args: {
    title: 'Agendamento realizado',
    description: 'Quarta-feira, 23 de Outubro às 16h',
  },
}

export const Primary: StoryObj<DemoToastProps> = {}
