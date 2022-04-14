import Layout from '@/components/Layout';
import Header from '@/components/Header';
import CardList from '@/components/CardList';
import Banner from '@/components/Banner';

export default function Cards({ cards }: { cards: [any] }) {
  return (
    <Layout title={`Ingredient and Recipe NFTs - BELLY.`}>
      <Banner />
      <Header />
      <div className='px-10'>
        <h1 className='mt-2 mb-2 text-3xl font-bold text-transparent font-header bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>
          All Belly NFT Cards
        </h1>
        <p className='mb-6 text-md text-slate-500'>
          Recipe and Ingredient NFTs
        </p>
        <CardList cards={cards} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const result = await fetch(`${process.env.NEXT_URL}/api/cards`);
  const data = await result.json();

  return {
    props: {
      cards: data,
    },
  };
}
