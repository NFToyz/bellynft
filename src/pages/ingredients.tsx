import Layout from '@/components/Layout';
import Header from '@/components/Header';
import CardList from '@/components/CardList';
import Banner from '@/components/Banner';

export default function Ingredients({ cards }: { cards: [any] }) {
  return (
    <Layout title={`Ingredient NFTs - BELLY.`}>
      <Banner />
      <Header />
      <div className='px-10'>
        <h1 className='mt-2 mb-2 text-3xl font-bold text-transparent font-header bg-clip-text bg-gradient-to-r from-emerald-300 via-blue-400 to-purple-600'>
          Ingredient NFTs
        </h1>
        <p className='mb-6 text-md text-slate-500'>
          All of the available ingredient NFTs
        </p>
        <CardList cards={cards} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const result = await fetch(
    `${process.env.NEXT_URL}/api/cards?type=ingredient`
  );
  const data = await result.json();

  return {
    props: {
      cards: data,
    },
  };
}
