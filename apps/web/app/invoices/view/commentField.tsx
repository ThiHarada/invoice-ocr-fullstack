"use client"

import React, { useActionState } from 'react'
import { PostComment } from '../../lib/invoice'

const CommentField = ({invoiceId} : {invoiceId : number}) => {
    const [state, action] = useActionState(PostComment, undefined)

  return (
    <form action={action} className='flex gap-2'>
        <input type="text" name="comment" autoComplete='off' id="comment" className='bg-gray-200 flex-1 px-2 rounded-full' placeholder='Type your comments here' />
        <input type="text" name="invoiceId" id="invoiceId" readOnly className='hidden' value={invoiceId} />
        <button className='bg-black text-white py-1 px-4 font-bold rounded-full hover:bg-slate-800 transition' >Send</button>
    </form>
  )
}

export default CommentField