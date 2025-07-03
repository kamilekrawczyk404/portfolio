import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Typically corresponds to the `[locale]` segment
  const cookieLocale = (await cookies()).get("portfolio_locale")?.value ?? "en";

  console.log("cookie locale", cookieLocale);
  const locale = cookieLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
