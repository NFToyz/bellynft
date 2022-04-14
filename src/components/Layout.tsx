import Head from 'next/head';
import Footer from '@/components/Footer';
import Meta from './Meta';

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <>
      <Meta />
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      <Footer />
    </>
  );
}
