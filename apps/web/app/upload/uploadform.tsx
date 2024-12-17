"use client"

import React, { useActionState } from 'react'
import { registerInvoice } from '../lib/invoice'
import SignupButton from '../components/signupButton'
import { redirect } from 'next/navigation'

const UploadForm = ({userId} : {userId : string}) => {
  const [state, action] = useActionState(registerInvoice, undefined)
  if(state?.ok) redirect("/invoices")

  return (
    <form action={action}>
        <input type='file' accept='image/*' id='invoiceFile' name='invoiceFile' 
        className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-sans
        file:bg-black file:text-white file:font-bold
        hover:file:bg-slate-800 file:cursor-pointer 
        my-10"
  />
        <input type="text" id='userId' name='userId' readOnly className='hidden' value={userId} />
        {state?.message && (
          <p>{state.message}</p>
        )}
        <SignupButton> Upload </SignupButton>
    </form>
  )
}

export default UploadForm