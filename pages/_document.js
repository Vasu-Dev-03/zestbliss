import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Your one-stop shop for toys and games" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 