"use client"

import {
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
} from '@c15t/react'
import type { ReactNode } from 'react'

interface CMPProviderProps {
  children: ReactNode
}

export function CMPProvider({ children }: CMPProviderProps) {
  return (
    <ConsentManagerProvider
      options={{
        mode: 'c15t',
        backendURL: 'https://yaw-111q-europe-onboarding.c15t.dev',
        ignoreGeoLocation: true, // Force banner to show for development
        consentCategories: ['necessary', 'marketing', 'analytics', 'preferences'],
      }}
    >
      <ConsentManagerDialog />
      <CookieBanner />
      {children}
    </ConsentManagerProvider>
  )
}
