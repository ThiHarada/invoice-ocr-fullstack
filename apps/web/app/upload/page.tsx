import { getSession } from '../lib/session'
import { redirect } from 'next/navigation';
import { registerInvoice } from '../lib/invoice';
import UploadForm from './uploadform';

const UploadPage = async () => {
    const session = await getSession();
    if(!session || !session.user) redirect("/auth/signin");

    console.log(session.user)
    return (
    <div className='flex-1'>
      <h1 className='text-2xl font-bold font-sans'>
        Upload Files
      </h1>
      <UploadForm userId={session.user.id}/>
    </div>
  )
}

export default UploadPage