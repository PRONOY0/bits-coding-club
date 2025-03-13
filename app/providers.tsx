// In a new file: app/providers.tsx
"use client";

import { AppProvider } from '@/context/page';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}