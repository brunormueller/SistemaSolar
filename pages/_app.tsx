"use client";

import type { AppProps } from "next/app";

import "./app/satoshi.css";
import "./app/globals2.css";
import "./app/globals.css";
import "../components/ReactTable/styles.css";

import PrivateRoute from "@/components/PrivateRoute";
import ContextProvider from "@/src/contexts";
import { checkIsPublicRoute } from "@/utils/check-is-public-route";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./app/layout";

function MyApp({ Component, pageProps }: AppProps) {
    const pathname = usePathname();
    const isPublicRoute = checkIsPublicRoute(pathname);

    return (
        <ContextProvider>
            <RootLayout>
                {isPublicRoute && <Component {...pageProps} />}
                {!isPublicRoute && (
                    <PrivateRoute>
                        <Component {...pageProps} />
                    </PrivateRoute>
                )}
            </RootLayout>
            <ToastContainer autoClose={2500} />
        </ContextProvider>
    );
}

export default MyApp;
