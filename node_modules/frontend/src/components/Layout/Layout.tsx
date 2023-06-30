import React, { ReactNode } from 'react'
import { Header } from '../Header';

// eslint-disable-next-line @typescript-eslint/ban-types
type LayoutProps = {
    children: ReactNode
}

// eslint-disable-next-line no-empty-pattern
export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header />
            <div className="h-full bg-gray-100 dark:bg-zinc-800">{children}</div>
        </>
    );
}