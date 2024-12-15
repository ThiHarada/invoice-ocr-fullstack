"use client"

import React, { useActionState } from 'react'
import SignupButton from '../../components/signupButton'
import { signIn } from '../../lib/auth'

const SignInForm = () => {
    const [state, action] = useActionState(signIn, undefined)

  return (
    <form action={action} >
        {state?.message && (
            <p>{state.message}</p>
        )}
        <input name="username" id='username' type='text' placeholder='username'/>
        {state?.error?.username && (
            <p>{state.error.username}</p>
        )}

        <input type="password" id='password' name='password' placeholder='password' />
        {state?.error?.password && (
            <p>{state.error.password}</p>
        )}
        <SignupButton> Sign in </SignupButton>
    </form>
  )
}

export default SignInForm;

