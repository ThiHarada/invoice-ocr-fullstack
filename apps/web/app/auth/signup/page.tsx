import React from 'react'
import FormTemplate from './signupForm'
import Link from 'next/link'

const SignupPage = () => {
  return (
    <div className=' flex flex-1'>
      <div className=' flex flex-col flex-1 p-10'>
          <div className='flex flex-col h-full flex-1'>
            <h1 className='font-bold text-3xl font-sans'>
              Sign up
            </h1>
            <FormTemplate/>
            <p> Already have an account? <Link href="/auth/signin" className=' underline text-cyan-600 '> Sign in! </Link> </p>

          </div>
      </div>
      <div className='flex-1'>
        
      </div>
    </div>

  )
}

export default SignupPage
