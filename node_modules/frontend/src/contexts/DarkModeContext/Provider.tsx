import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from './Context';

type DarkModeProviderProps = {
    children: React.ReactNode
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
    children
}) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    //toggleIsDarkModeの変更
    //# http://localhost:5173 の開発者ツールのアプリケーションのローカルストレージを見る
    //isDarkModeだけでなくTHEMEをDARKかLIGHTかを切り替える
    const toggleIsDarkMode= () => {
        //ローカルストレージに('THEME','DARK')を加える
        const isDarkModePreffered = localStorage.getItem('THEME') === 'DARK'

        if(isDarkModePreffered){
            setIsDarkMode(false)
            localStorage.setItem('THEME','LIGHT')
        }else{
            setIsDarkMode(true)
            localStorage.setItem('THEME','DARK')
        }
    };

    //システムのDarkModeについての機能を追加する
    useEffect(() => {
        const isDarkModePreffered=localStorage.getItem("THEME") === "DARK";
        //システムがDarkModeであるかどうかJavascriptから判断することができる
        //matchesでDarkModeならtrue、違うならfalseが返ってくる
        const isDarkModePrefferedInSystem = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        //初めて訪れたかどうか確認する（localStorage内にTHEMEが入っているかどうか）
        const isThemeSet = 'THEME' in localStorage;

        //初めてかつDarkModeを好んでいなければLightModeにする
        if(!isThemeSet && !isDarkModePrefferedInSystem){
            setIsDarkMode(false)
            return
        }

        //初めてかつDarkModeを好んでいればDarkModeにする
        if(!isThemeSet && isDarkModePrefferedInSystem){
            setIsDarkMode(true)
            return
        }

        console.log({isDarkModePrefferedInSystem})

        if(isDarkModePreffered){
            setIsDarkMode(true)
        }

        if(!isDarkModePreffered){
            setIsDarkMode(false)
        }

    }, []);

    //システムの方からDarkModeかLightModeかを切り替えた時に、
    //localhostの方でリフレッシュしないと切り替えられない
    //システムの方から切り替えた時に即時反映されるようにしたい
    useEffect(() => {
        const mediaQueryList = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        //addEventListenerをホバーすると、ev:MediaQueryListEventとでる
        //event: MediaQueryListEventとする
        const handlePrefferedColorSchemaChange = (event: MediaQueryListEvent) => {
            const isThemeSet = "THEME" in localStorage;
            //localStorageの中にTHEMEがあるなら何も返されない
            if(isThemeSet) return;
            //DarkModeならTrue、違うならfalseが返される
            setIsDarkMode(event.matches)
        }

        mediaQueryList.addEventListener('change', handlePrefferedColorSchemaChange);
        //returnでイベントを初期化する
        return () => mediaQueryList.removeEventListener(
            "change",
            handlePrefferedColorSchemaChange
        )
    }, [])
    return (
        <DarkModeContext.Provider
            value={{
                isDarkMode,
                toggleIsDarkMode,
            }}
        >
            {children}
        </DarkModeContext.Provider>
    );
}

export const useDarkModeContext = () => useContext(DarkModeContext);


