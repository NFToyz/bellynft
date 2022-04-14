import Image from 'next/image';
import Link from 'next/link';

import { HiOutlineLightningBolt } from 'react-icons/hi';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Banner from '@/components/Banner';

const cards = [
  {
    name: 'Sushi Rice',
    id: 1,
    type: 'ingredient',
  },
  {
    name: 'Nori',
    id: 2,
    type: 'ingredient',
  },
  {
    name: 'Cucumber',
    id: 3,
    type: 'ingredient',
  },
  {
    name: 'Kappa Maki',
    id: 4,
    type: 'recipe',
  },
];

export default function About() {
  return (
    <Layout title={`About - BELLY.`}>
      <Banner />
      <Header />
      <div className='w-full px-10 mx-auto mt-4 max-w-screen-lg text-slate-400 leading-7'>
        <h2 className='mt-2 mb-6 text-4xl font-semibold text-transparent font-header bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500'>
          About
        </h2>
        <h3 className='mt-10 mb-2 text-2xl text-slate-300'>Get in my belly</h3>
        <p className='my-4'>
          Belly.io is a project idea we had over a year ago, but it took the{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://nft.replit.com/'
          >
            #HelloNFTWorld hackathon
          </a>{' '}
          to get us to finally make time to work on it.
        </p>
        <p className='my-4'>
          As{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.youtube.com/channel/UCAEcsNtVULAF0S756r_ZP7A/videos'
          >
            content creators
          </a>
          , we wanted to come up with a way to reward our loyal fans. As
          techies, we wanted to do something fun and creative for it. And since
          so much of{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.youtube.com/SushiDayTV'
          >
            our content in the past
          </a>{' '}
          has had to do with food, a collectible, craftible NFT experience
          seemed like the perfect way to do all of that!
        </p>

        <h3 className='mt-10 mb-2 text-2xl text-slate-300'>
          Here&apos;s how it works
        </h3>
        <p className='my-4'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          We reward your loyalty and engagement with ingredient NFTs.{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <p className='my-4'>
          (Ultimately, we want to give out randomized card packs, as rewards for
          doing things like watching our{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.youtube.com/channel/UCAEcsNtVULAF0S756r_ZP7A/featured'
          >
            YouTube videos
          </a>
          , hanging out in our{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.twitch.tv/nftoyz'
          >
            Twitch stream
          </a>
          , following us on{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://twitter.com/NfToyz'
          >
            Twitter
          </a>
          , etc...{' '}
        </p>
        <p className='my-4'>
          ...but for the purpose of the hackathon, all you have to do is go to
          the{' '}
          <Link href='/faucet' as={`/faucet`} passHref>
            <a
              target='_blank'
              rel='noreferrer'
              className='font-semibold'
              href=''
            >
              Faucet
            </a>
          </Link>{' '}
          page and mint some on the Polygon Mumbai Testnet for free!)
        </p>
        <p className='my-4'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          Once you collect enough{' '}
          <Link href='/ingredients' as={`/ingredients`} passHref>
            <a className='font-semibold' href=''>
              Ingredient NFTs
            </a>
          </Link>
          , you can craft them into{' '}
          <Link href='/recipes' as={`/recipes`} passHref>
            <a className='font-semibold' href=''>
              Recipe NFTs
            </a>
          </Link>
          .{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <p className='my-4'>
          (Click on a recipe to find out what you need to craft it!)
        </p>
        <p className='my-4'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          Keep on collecting and crafting - all your NFTs can be found in your{' '}
          <Link href='/pantry' as={`/pantry`} passHref>
            <a
              target='_blank'
              rel='noreferrer'
              className='font-semibold'
              href=''
            >
              Pantry
            </a>
          </Link>
          !{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <ul className='w-full grid grid-cols-1 gap-y-6 sm:grid-cols-4 gap-x-6'>
          {cards.map((card: any, index: number) => (
            <li
              key={index}
              className={`w-full rounded-lg aspect-w-5 aspect-h-7 transition hover:scale-105 duration-300 border-2 ${
                card.type === 'ingredient'
                  ? 'hover:drop-shadow-[0_25px_25px_rgba(30,130,74,0.45)] border-green-400/30'
                  : 'hover:drop-shadow-[0_25px_25px_rgba(255,106,14,0.35)] border-orange-500/30'
              }`}
            >
              <Link
                href={`/cards/${card.id}`}
                as={`/cards/${card.id}`}
                passHref
              >
                <a href=''>
                  <Image
                    src={`/asset/${card.id}.jpg`}
                    alt={card.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                    blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
                    placeholder='blur'
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className='mt-10 mb-2 text-2xl text-slate-300'>
          The technical details
        </h3>
        <p className='my-4'>
          For the curious, here&apos;s all the technology we used for the Belly
          project thus far!
        </p>
        <p className='my-4 text-lg text-slate-100'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          The blockchain{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <p className='my-4'>
          Belly is currently on the Mumbai Polygon testnet for the hackathon,
          but will be deployed to the Polygon mainnet when the final production
          version is ready to go.
        </p>
        <div className='float-right m-10 mr-0'>
          <Image
            src='/img/polygon.svg'
            alt='Polygon Blockchai'
            layout='intrinsic'
            width={300}
            height={100}
            className='rounded-lg'
            blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
            placeholder='blur'
          />
        </div>

        <p className='my-4'>
          Since this is a project where we want people to feel free to play and
          submit lots of transactions, we knew{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://polygon.technology'
          >
            Polygon
          </a>{' '}
          was going to be a better option for Belly than ETH mainnet - both due
          to cost and efficiancy. Most of our development experience up until
          now has been in Solidity on EVM chains, so sticking to something
          EVM-compatible (especially for a 1-week development deadline) seemed
          like the best choice for this project! And since we want this to be a
          project where we can send out NFTs to people who are not yet familiar
          with the NFT or crypto space, Polygon is the most user-friendly
          sidechain available at this time - so the decision was easy for us!
        </p>
        <p className='my-4 text-lg text-slate-100'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          The contracts{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <p className='my-4'>
          For the hackathon version of Belly, we have three different smart
          contracts, to make it modular enough that functionality can be
          switched out when we do additional development in the future (or if we
          messed something up!)
        </p>
        <p className='my-4'>
          These are the three contracts we created for the hackathon:{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://mumbai.polygonscan.com/address/0xF2A139F2B75F9Ce3A33c81342094BA4b7E66EF3c'
          >
            BellyNFT
          </a>
          ,{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://mumbai.polygonscan.com/address/0x750bc404257c5b153dbd74997d221fbf5a87340d'
          >
            BellyNftCrafting
          </a>
          , and{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://mumbai.polygonscan.com/address/0x07dfcdae0b47cb0421bad734f27aa6d16969772f'
          >
            BellyRecipes
          </a>
          .
        </p>
        <p className='my-4 text-lg text-slate-100'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          The website{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <p className='my-4'>
          Since we have a ton of previous experience with these technologies, we
          chose to develop the website using{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://reactjs.org/'
          >
            React
          </a>
          ,{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://nextjs.org/'
          >
            Next.js
          </a>
          , and{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://tailwindcss.com/'
          >
            Tailwind CSS
          </a>{' '}
          for the frontend.
        </p>
        <p className='my-4'>
          Our web3 integrations were done using the{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://wagmi.sh/'
          >
            wagmi React Hooks Library
          </a>
          . We&apos;ve tried out other libraries in the past, and found that
          wagmi was super easy to integrate and use with different blockchains,
          especially since we have a lot of experience working with React Hooks.
        </p>
        <p className='my-4'>
          We used{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.mongodb.com/'
          >
            MongoDB
          </a>{' '}
          for our database.
        </p>
        <p className='my-4 text-lg text-slate-100'>
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />{' '}
          The cards{' '}
          <HiOutlineLightningBolt className='inline text-lg font-semibold text-emerald-300 mt-[-2px]' />
        </p>
        <p className='my-4'>
          Most of the photos for the cards were photographed using a{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://amzn.to/3Ee7Uyz'
          >
            Sony A7C camera
          </a>{' '}
          with a{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://amzn.to/3i3fVL4'
          >
            90mm lens
          </a>{' '}
          (although some of the sushi photos are from our old{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://twitch.tv/sushiday'
          >
            cooking streaming
          </a>{' '}
          or{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://sushiday.com/'
          >
            food blogging
          </a>{' '}
          days, so who knows which camera we used for those!).
        </p>
        <p className='my-4'>
          We used{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.remotion.dev/'
          >
            Remotion
          </a>{' '}
          to design and create both the static and animated versions of the
          cards. We&apos;ve used Remotion in the past for our{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://cryptoox.co/'
          >
            CryptoOx NFT
          </a>{' '}
          project, and we&apos;re huge fans!
        </p>
        <p className='my-4'></p>
        <p className='my-4'></p>
        <h3 className='mt-10 mb-2 text-2xl text-slate-300'>What&apos;s next</h3>
        <p className='my-4'>
          We built this in a week for the{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://nft.replit.com/'
          >
            #HelloNFTWorld hackathon
          </a>
          , and we&apos;re so proud of what we got done!
        </p>
        <p className='my-4'>
          But there&apos;s so, SO much more we want to do for Belly.
        </p>
        <ul className='m-4 leading-loose list-disc list-inside'>
          <li>Card packs</li>
          <li>Social signup to earn cards</li>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              className='font-semibold'
              href='https://sequence.build/'
            >
              Sequence wallet
            </a>{' '}
            integration
          </li>
          <li>
            Bonus content and/or contest rewards based on which NFTs you&apos;ve
            collected or crafted
          </li>
          <li>
            Enabling other content creators to reward their fans with their own
            craftable NFT collections
          </li>
          <li>... and so much more!</li>
        </ul>

        <h3 className='mt-10 mb-8 text-2xl text-slate-300'>Who are we?</h3>
        <div className='relative w-full h-96'>
          <Image
            src='/asset/sonandallison.png'
            alt='Son and Allison from their old Sushi Day Tasting Time days'
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
            blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
            placeholder='blur'
          />
        </div>
        <p className='my-4'>
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://twitter.com/phuson'
          >
            Son
          </a>{' '}
          and{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://twitter.com/sushiday'
          >
            Allison
          </a>{' '}
          are a dynamic developer duo who have been cooking, coding, and
          creating content together since they met all the way back in 2005.
        </p>
        <p className='my-4'>
          Both are experienced web2 developers who have spent the last year
          immersing themselves in all things blockchain and web3.
        </p>
        <p className='my-4'>
          Together they make up{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://twitter.com/NFToyz'
          >
            NFToyz
          </a>
          , where they create{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.youtube.com/channel/UCAEcsNtVULAF0S756r_ZP7A'
          >
            videos
          </a>
          , write{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://blog.nftoyz.com/'
          >
            blog posts
          </a>
          , produce a{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://anchor.fm/nftoyz/'
          >
            podcast
          </a>
          , and stream a weekly show on{' '}
          <a
            target='_blank'
            rel='noreferrer'
            className='font-semibold'
            href='https://www.twitch.tv/nftoyz'
          >
            Twitch
          </a>{' '}
          - all with the goal of educating the world about the technical side of
          NFTs and blockchain technology.
        </p>
      </div>
    </Layout>
  );
}
