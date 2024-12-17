"use client"

import React, { useActionState } from 'react'
import SignupButton from '../../components/signupButton'
import { signIn } from '../../lib/auth'

const SignInForm = () => {
    const [state, action] = useActionState(signIn, undefined)

  return (
    <form action={action} className='flex flex-col mt-5 flex-1'>


        <label htmlFor="username"> Username </label>
        <input className='border-2 border-gray-300 rounded-md px-1' type='text' name='username' id='username' placeholder='username'/>
        {state?.error?.username && (
            <p className='text-red-400'>{state.error.username}</p>
        )}

        <label htmlFor="password">Password</label>
        <input className='border-2 border-gray-300 rounded-md px-1' type="password" name='password' id='password' placeholder='password'/>
        {state?.error?.password && (
            <p className='text-red-400'>{state.error.password}</p>
        )}
        <div className='mt-auto'>
        {state?.message && (
            <p className='text-red-400'>{state.message}</p>
        )}
        <SignupButton> Sign in </SignupButton>
        </div>
    </form>
  )
}

export default SignInForm;

