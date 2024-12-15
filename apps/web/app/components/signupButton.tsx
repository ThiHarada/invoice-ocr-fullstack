import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'

const SignupButton = ({children} : PropsWithChildren) => {
  const {pending} = useFormStatus();
  
    return (
    <button type='submit' aria-disabled={pending}>
        {pending ? "Submitting..." : children}
    </button>
  )
}

export default SignupButton;


