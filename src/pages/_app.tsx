import Navigation from "@/components/navigation";
import type { AppProps } from "next/app";
import "./globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Navigation/>
      <Component {...pageProps} />
    </div>
    </QueryClientProvider>
  );
}