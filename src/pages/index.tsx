import Layout from '@/components/Layout';
import BellyLogo from '@/components/BellyLogo';

export default function Home() {
  const title = `BELLY.`;

  return (
    <Layout title={title}>
      <div className='flex flex-col items-center justify-center h-screen min-h-screen py-8 antialiased'>
        <main className='relative z-10 flex flex-col py-6 mx-auto font-sans'>
          <h1 className='text-gray-100'>
            <BellyLogo height={90} />
            <p className='my-6 text-lg text-slate-400'>
              A collectible craftible NFT experience.
            </p>
          </h1>
        </main>
      </div>
    </Layout>
  );
}
