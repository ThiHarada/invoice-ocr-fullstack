import React from 'react'
import SignInForm from './signinForm';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className=' flex flex-1'>
      <div className=' flex flex-col flex-1 p-10'>
          <div className='flex flex-col h-full flex-1'>
            <h1 className='font-bold text-3xl font-sans'>
              Sign in
            </h1>
            <SignInForm/>
            <p> Don't have an account? <Link href="/auth/signup" className=' underline text-cyan-600 '> Sign up! </Link> </p>

          </div>
      </div>
      <div className='flex-1'>
        
      </div>
    </div>
  )
}

export default SignInPage;
