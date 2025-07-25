'use client'

import { useEffect } from 'react'
import { Toaster as ToasterProvider } from 'react-hot-toast'

export const Toaster = () => {
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .react-hot-toast {
        left: 50% !important;
        transform: translateX(-50%) !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <ToasterProvider
      position="bottom-center"
      toastOptions={{
        success: {
          style: {
            background: '#06b6d4',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#06b6d4',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
      }}
    />
  )
}
