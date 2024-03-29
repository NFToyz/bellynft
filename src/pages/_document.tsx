import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className='dark'>
      <Head />
      <body className='antialiased font-normal font-base text-slate-500 dark:text-slate-400 dark:bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
