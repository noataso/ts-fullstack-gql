import React, { ReactNode } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'

const variants={
    primary: "bg-blue-600 text-white",
    danger: "bg-red-600 text-white",
}

const sizes={
    sm: "py-2 px-4 text-sm",
    md: "py-2 px-6 text-md",
    lg: "py-3 px-8 text-lg",
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    //variant?をhoverすると、'primary' | 'danger' | undefined
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    isLoading?: boolean;
    className?: string
    //ButtonProps=React.ButtonHTMLAttributes<HTMLButtonElement>とすると、
    //children:ReactNodeを記述する必要がなくなる
    //children以外にもtypeなど自動的に作ってくれる
    //React.ButtonHTMLAttributes<HTMLButtonElement>はbuttonをhoverすると見れる
    children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant='primary',
    size='md',
    isLoading,
    className="",
    //React.ButtonHTMLAttributes<HTMLButtonElement>のpropsを入れたbuttonタグは、
    //buttonタグに{...props}を入れることでbuttonタグのtypeなどを入れてくれる
    ...props
}) => {
    return (
        <button
            {...props}
            className={`${className} ${variants[variant]} ${sizes[size]} border border-gray-300 rounded-md bg-blue-600 text-white hover:opacity-80 dark:border-zinc-600`}
        >
            {isLoading ? (
                <div className='flex justify-center items-center'>
                    <MoonLoader size={15} color="white" />
                </div>
            ) : (
                <>{children}</>
            )}
        </button>
    );
};