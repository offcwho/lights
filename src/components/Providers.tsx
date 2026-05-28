'use client'

import { ModalProvider } from "rdy-comp"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}