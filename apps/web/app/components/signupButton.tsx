import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'

const SignupButton = ({children} : PropsWithChildren) => {
  const {pending} = useFormStatus();
  
    return (
    <button type='submit' aria-disabled={pending} className='rounded-full bg-black text-white font-bold py-2 px-6 hover:bg-gray-800 transition'>
        {pending ? "Submitting..." : children}
    </button>
  )
}

export default SignupButton;


