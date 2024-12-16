import React from 'react'
import { getSession } from '../lib/session'
import { redirect } from 'next/navigation';
import { getProfile } from '../lib/actions';

const Invoices = async () => {
  const session = await getSession();
  const res = await getProfile();

  if(!session || !session.user) redirect("/auth/signin");
  
  return (
    <div>
      Invoices
      
      <p> {JSON.stringify(res)} </p>
    </div>
  )
}

export default Invoices