import Image from 'next/image';
import Link from 'next/link';

export default function CardList({ cards }: { cards: [any] }) {
  return (
    <ul className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 gap-x-6 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-x-6'>
      {cards.map((card, index) => (
        <li
          key={index}
          className={`w-full rounded-lg aspect-w-5 aspect-h-7 transition hover:scale-105 duration-300 border-2 ${
            card.type === 'ingredient'
              ? 'hover:shadow-[0_0_25px_rgba(30,130,74,0.45)] border-green-400/30'
              : 'hover:shadow-[0_0_25px_rgba(255,106,14,0.35)] border-orange-500/30'
          }`}
        >
          <Link href={`/cards/${card.id}`} as={`/cards/${card.id}`} passHref>
            <a href='' className='hover:text-white'>
              <Image
                src={`/asset/${card.id}.jpg`}
                alt={`${card.name} - ${card.description}`}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
                blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
                placeholder='blur'
              />
              {card.balance ? (
                <div
                  className={`absolute flex justify-center items-center top-[3%] right-[5%] w-[14%] text-center text-[6vw] sm:text-[3vw] md:text-[1.75vw] xl:text-[1.25vw] h-[10%] rounded-full group ${
                    card.type === 'ingredient'
                      ? 'bg-green-500/70'
                      : 'bg-orange-500/70'
                  }`}
                >
                  <span>{card.balance}</span>
                  <span
                    className={`absolute flex justify-center items-center top-0 right-0 text-xs group-hover:text-sm w-16 group-hover:w-60 indent-[-9999em] group-hover:indent-0 overflow-hidden h-full rounded-full px-4 py-3 invisible transition-all group-hover:visible ${
                      card.type === 'ingredient'
                        ? 'bg-emerald-500 text-[rgba(30,130,74,1)]'
                        : 'bg-orange-500 text-[rgba(255,106,14,1)]'
                    } group-hover:text-white`}
                  >
                    <span>
                      You own {card.balance} {card.name} NFT
                      {card.balance === 1 ? '' : 's'}
                    </span>
                  </span>
                </div>
              ) : (
                ''
              )}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
