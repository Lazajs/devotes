import MainLayout from '@/components/MainLayout'
import { withIronSessionSsr } from "iron-session/next";
import config from '@/lib/ironConfig';
import { Icons } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import type { User, TDevote } from '@/types';
import { UserDevotesCTX } from '@/context/UserDevotesProvider';
import { useContext, useEffect } from 'react';
import Devotes from '@/components/Devotes';
import DevotesSection from '@/components/DevotesSection';

const {Out} = Icons

const tempDevote: TDevote[] = [
  {
    id: '1',
    title: 'First Devote',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ipsum dolor sit am ipsum dolor sit am ipsum dolor sit am ipsum dolor sit am ipsum dolor sit am ipsum dolor sit am ipsum dolor sit am ipsum dolor sit am',
    createdAt: '2021-09-01T12:00:00.000Z',
    userId: '002'
  },
] 

export default function Home({ user }: {user: User}) {
  const router = useRouter()
  const { userDevotes, setUserDevotes } = useContext(UserDevotesCTX)
  
  useEffect(() => {
    setUserDevotes(tempDevote)
  }, []) // Set initial Devotes

  const handleLogout = async () => {
    await fetch('/api/auth/logout')
    router.push('/auth/register')
  }

  return (
    <MainLayout>
      <h2 className='text-medium text-center text-textBlack'>Welcome <i className='font-heavy'>{user.name}</i></h2>
      <span className='cursor-pointer w-[50px] h-[50px] block m-auto pt-big z-10' onClick={handleLogout}>
        <Out className='w-[50px] h-[50px]' />
      </span>
      <DevotesSection setNew={setUserDevotes}>
        <Devotes devotes={userDevotes} />
      </DevotesSection>
    </MainLayout>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}) {
    const user = req.session.user
    
    if (user && user?.name) {
      return {
        props: {
          user: user
        }
      }
    }
    
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }, config
)
