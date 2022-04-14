import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import PantryCards from '@/components/PantryCards';

export default function Pantry() {
  return (
    <Layout title={`My Pantry - BELLY.`}>
      <Banner />
      <Header />
      <div className='px-10'>
        <h1 className='mt-2 mb-2 text-4xl font-bold text-transparent font-header bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>
          My Pantry
        </h1>
        <p className='mb-6 text-md text-slate-500'>
          All of the Belly NFTs that are in your wallet.
        </p>
        <PantryCards />
      </div>
    </Layout>
  );
}
