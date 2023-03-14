import MainLayout from '@/components/MainLayout'
import { withIronSessionSsr } from "iron-session/next";
import config from '@/lib/ironConfig';
import { Icons } from '@/components/Icons';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';

const {Out} = Icons

export default function Home({ user }: {user?: User}) {
  const router = useRouter()
  
  console.log(user)
  const handleLogout = () => {
    console.log('CLICK')
    fetch('/api/auth/logout').then(res => {
      router.push('/auth/register')
    })
  }

  return (
    <MainLayout>
      {user && user?.name ? <Out className='cursor-pointer w-[50px] h-[50px] block m-auto z-10' onClick={handleLogout} /> : ''}
    </MainLayout>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}) {
    const user = req.session.user
    console.log(user)
    
    if (!user || !user?.name) {
      return {
        redirect: {
          destination: '/auth/register',
          permanent: false
        }
      }
    }

    else if (user) {
      return {
        props: {
          user: user
        }
      }
    }
  }, config
)
