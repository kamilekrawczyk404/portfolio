import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/redux/StoreProvider";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/views/Footer";
import { Analytics } from "@vercel/analytics/next";

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <body className={`antialiased w-full overflow-x-hidden`}>
            <Navigation />
            {children}
            <Footer />
            <Analytics />
          </body>
        </StoreProvider>
      </NextIntlClientProvider>
    </html>
  );
}
