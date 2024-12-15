'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import FormTemplate from './signupForm'
import Link from 'next/link'

const SignupPage = () => {
  return (
    <SignupForm>
        <h1>
          Sign up
        </h1>
        <FormTemplate/>
        <p> Already have an account? </p>
        <Link href="/auth/signin"> Sign in! </Link>
    </SignupForm>
  )
}

export default SignupPage

const SignupForm = styled.div `
    padding: 3rem;
    min-height: 70dvh;
    width: 30vw;
    box-shadow: 0 0 10px var(--foreground);
    background-color: var(--background);
`;