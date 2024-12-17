import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import { LoadComments, LoadOne } from '../../lib/invoice';
import CommentField from './commentField';

const  InvoiceView = async ({searchParams,} : { searchParams: Promise<{id: string|undefined}> }) => {
  const session = await getSession();
  if(!session || !session.user) redirect("/")
  const params = await searchParams;
  const id = params.id;
  if(!id) redirect("/");
  const data = await LoadOne(id!)
  const lines = data.content.split('\r\n')
  if(data.ownerId !== session.user.id) redirect("/invoices")

  const comments = await LoadComments(+id);
  console.log(comments)

  return (
    <div className='flex-1 flex'>
      <div className='flex-1 border-r-2 border-gray-300'>
        <h1 className='font-bold text-2xl'>
          Invoice #{id}
        </h1>
        {
          lines.map((x:string, i:number) => (
            <p key={i}>{x}</p>
          ))
        }

      </div>
      <div className='flex-1 flex flex-col px-1 ml-4'>
        <h1 className='text-xl font-bold'>Additional Comments</h1>
        <ul>
          {
          comments.map((x:{id:number,content:string,fromUser:boolean,invoiceId:number}, i:number) => (
            <li key={i} className='py-3 border-b-2 border-gray-200 last:border-0'>{x.content}</li>
          ))
          }
        </ul>
        <div className='mt-auto bg-white sticky bottom-5 py-3'>
          <CommentField invoiceId={+id}/>
        </div>
      </div>
    </div>
  )
}

export default InvoiceView