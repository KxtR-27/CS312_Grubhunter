import Layout from "@/grubhunter-application/components/layout";
import "@/styles/globals.css";
import "@/styles/layout.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Layout children={<Component {...pageProps} />} />
}
