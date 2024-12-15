import React from 'react'
import SignInForm from './signinForm';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div>
        <h1> Sign in </h1>
        <SignInForm />
        <p> Do not have an account?</p>
        <Link href="/auth/signup"> Sign up! </Link>
    </div>
  )
}

export default SignInPage;
