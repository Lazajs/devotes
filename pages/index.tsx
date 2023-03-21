import MainLayout from '@/components/MainLayout'
import { withIronSessionSsr } from "iron-session/next";
import config from '@/lib/ironConfig';
import { Icons } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';

const {Out} = Icons

export default function Home({ user }: {user: User}) {
  const router = useRouter()
  
  const handleLogout = () => {
    fetch('/api/auth/logout').then(res => {
      router.push('/auth/register')
    })
  }

  return (
    <MainLayout>
      <span className='cursor-pointer w-[50px] h-[50px] block m-auto pt-big z-10' onClick={handleLogout}><Out className='w-[50px] h-[50px]' /></span>
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
