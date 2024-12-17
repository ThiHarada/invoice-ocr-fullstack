import React from 'react'
import { getSession } from '../lib/session'
import Link from 'next/link'

const NavButton = async () => {
    const session = await getSession();

    return (
      <div className='flex ml-auto'>
        {!session || !session.user ? (
          <>
            <Link href={"/auth/signin"} className=' px-4 flex items-center transition hover:bg-gray-300'>Sign In</Link>
            <Link href={"/auth/signup"} className=' px-4 flex items-center transition hover:bg-gray-300'>Sign Up</Link>
          </>
        ) : (
          <>
            <p className='px-4 flex items-center'> Welcome, {session.user.username} </p>
            <a href={"/api/auth/signout"} className=' px-4 flex items-center transition hover:bg-gray-300'>Sign Out</a>
          </>
        )}
      </div>
    );
}

export default NavButton