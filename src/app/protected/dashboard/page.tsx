'use client'

import React, { useState } from 'react';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '../../../../utilis/prisma';
import { create } from '@/app/actions/server';

async function getData() {
  const data = await prisma.post.findMany({

    where : {
     author: {
      name : 'bb'
     }
    },

    select: {
      title: true,
      id: true,
    },
  });

  return data;
}


const DashboardPage = async () => {



  const session = await getServerSession(authOptions);
  const data = await getData();


    return (
        <div className='w-full px-4 py-8 bg-gray-300 p-[15px]   items-center gap-4'>
            <Link href='/'>Home</Link>
            <Link href='/protected/dashboard'>Dashboard</Link>

            {session && session.user?.email ? (
                <>
                    <Link className='ml-[20px]' href='/auth/signout'>Sign out</Link>
                     <div>This is the dashboard!</div>

                    <p>
                        <b>Signed in as {session.user?.email}</b>
                    </p>
                    <div className=' mt-[40px] mb-[50px]'>
                       <form action={create}>
          <input name="title" type="text" placeholder="Add Todo..." />
           <button >Add</button>
      </form>

                    </div>
                    {data.map((todo, id) => (
            <div className="w-full" key={id}>
             <p key={todo.id}>{todo.title}</p>

            </div>
          ))}
                </>
            ) : (
                <>
                    <Link href='/auth/signin'>Sign in</Link>
                    <Link href='/auth/signup'>Sign up</Link>
                </>
            )}
        </div>
    );
};

export default DashboardPage;
