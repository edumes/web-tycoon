import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "../components/contexts/AuthContext";
import { ToastContainer, Slide } from "react-toastify";
import { Layout } from "../components/layout/layout";
import dotenv from "dotenv";

dotenv.config();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextThemesProvider defaultTheme="dark" attribute="class">
        <NextUIProvider>
          {/* <Layout> */}
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} theme="dark" newestOnTop={true} transition={Slide} />
          {/* </Layout> */}
        </NextUIProvider>
      </NextThemesProvider>
    </AuthProvider>
  );
}

export default MyApp;