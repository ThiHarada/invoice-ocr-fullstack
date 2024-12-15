"use client"

import React, { useActionState } from 'react'
import styled from 'styled-components'
import SignupButton from "../../components/signupButton"
import { signup } from '../../lib/auth'

const FormTemplate = () => {
    const [state, action] = useActionState(signup, undefined)

  return (
    <form action={action}>

        {state?.message && (
            <p>{state.message}</p>
        )}

        <input type='text' name='username' id='username' placeholder='username'/>
        {state?.error?.username && (
            <p>{state.error.username}</p>
        )}

        <input type="password" name='password' id='password' placeholder='password'/>
        {state?.error?.password && (
            <p>{state.error.password}</p>
        )}

        <SignupButton> Sign up </SignupButton>
    </form>
  )
}

export default FormTemplate
