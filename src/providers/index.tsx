'use client';

import { DialogProvider } from '@/providers/dialog-context';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <DialogProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </DialogProvider>
    </QueryProvider>
  );
}
