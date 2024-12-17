import Link from 'next/link'
import React from 'react'

const Invoice = ( {invoiceId, content} : {invoiceId:number, content:string} ) => {
  return (
    <div className='border-b-2 p-2 py-4 last:border-0 flex'>
        <div>
            <h2 className='font-bold'>
                Invoice #{invoiceId}
            </h2>
            <p>
                {content}
            </p>
        </div>
        <Link href={`/invoices/view?id=${invoiceId}`} className='ml-auto bg-black text-white p-4 rounded-lg hover:bg-slate-800 transition'>See more</Link>
    </div>
  )
}

export default Invoice