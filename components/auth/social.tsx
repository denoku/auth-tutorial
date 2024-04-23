'use client'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaMicrosoft } from 'react-icons/fa'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react' // this one is needed from client component
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { useSearchParams } from 'next/navigation'

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const onClick = (provider: 'azure-ad' | 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => {
          onClick('google')
        }}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => {
          onClick('github')
        }}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => {
          onClick('azure-ad')
        }}
      >
        <FaMicrosoft className='h-5 w-5' />
      </Button>
    </div>
  )
}
