import React from 'react'
import { getSession } from '../lib/session'
import { redirect } from 'next/navigation';
import { getProfile } from '../lib/actions';
import Invoice from './invoice';
import { LoadInvoices } from '../lib/invoice';

const Invoices = async () => {
  const session = await getSession();
  if(!session || !session.user) redirect("/auth/signin");
  const res = await getProfile();
  const arr = await LoadInvoices(session.user.id);
  return (
    <div>
      <h1 className='text-2xl font-bold font-sans'> Invoices </h1>
      <div className=' flex flex-col'>
        {
          arr.map((x:{id:number, ownerId:number, content:string}) => {
            return (
              <Invoice key={x.id} invoiceId={x.id} content={x.content.split("\r\n")[0]!}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Invoices