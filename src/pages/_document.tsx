import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/next';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
