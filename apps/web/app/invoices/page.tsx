import React from 'react'
import { getSession } from '../lib/session'
import { redirect } from 'next/navigation';

const Invoices = async () => {
  const session = await getSession();

  if(!session || !session.user) redirect("/auth/signin");
  
  return (
    <div>Invoices</div>
  )
}

export default Invoices