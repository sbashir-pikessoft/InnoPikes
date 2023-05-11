import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "@/components/layouts/header";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import Navebar from '@/components/layouts/navbar';
import '@/styles/Home.module.css'

function App({Component, pageProps}: AppPropsWithLayout) {
    if(Component.getLayout){
        return Component.getLayout(<Component {...pageProps}/>)
    }
    return (
        <>
            
            <main className="dashboard">
                <div style={{position:"relative"}}>
                <Navebar />                
                </div>
                <div >
                <Header/>
                <div className='container' style={{position:"absolute",marginLeft:"12%",maxWidth:"-webkit-fill-available"}}>
                <Component {...pageProps} />
                </div>
                </div>
            </main>
        </>
    )
}

export type NextPageWithLayout = NextPage & { getLayout: (page: ReactElement) => ReactNode };

export type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export default App