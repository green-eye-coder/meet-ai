"use client";//can you tell me what this does?
// The "use client" directive indicates that this file is a client-side component in a Next.js application.

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {Input} from '@/components/ui/input';
import { authClient } from "@/lib/auth-client";

/**
 * Renders the main authentication page with sign-up and login forms, or a welcome message for authenticated users.
 *
 * Displays sign-up and login forms for unauthenticated users, allowing them to create an account or log in using email and password. If a user session exists, shows a personalized welcome message and a sign-out button.
 *
 * @remark Alerts are shown for both success and error outcomes during sign-up and login.
 */
export default function Home() {
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const {data: session} = authClient.useSession() 

  const onSubmit=()=>{
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError:(ctx)=>{
        window.alert(ctx.error.message);
        console.error("something went wrong");
      },
      onSuccess:()=>{
        window.alert("User created successfully");
        
      }
    })
  }
  const onLogin=()=>{
    authClient.signIn.email({
      email,
      password,
    },{
      onError:(ctx)=>{
        window.alert(ctx.error.message);
        console.error("something went wrong");
      },
      onSuccess:()=>{
        window.alert("User logged in successfully");
        
      }
    })
  }


  
  if(session){
    return(
      <div className='flex flex-col p-4 gap-y-4'>
        <p className='text-2xl font-bold'>Welcome {session.user.name}</p>
        <Button variant={'destructive'} onClick={()=>{authClient.signOut()}}>Sign out</Button>
      </div>
    )
  }

  return (
    <div className='container'>
    <div  className='SigUp flex flex-col items-center gap-y-4 p-4 m-3 w-1/3 rounded shadow-lg shadow-blue-400/50'>
      <Input placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <Input placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder='Enter password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button  className='m-5  shadow-lg shadow-blue-500/75' onClick={onSubmit}>submit</Button>
    </div>

    <div  className='SigUp flex flex-col items-center gap-y-4 p-4 m-3 w-1/3 rounded shadow-lg shadow-blue-400/50'>
      <Input placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder='Enter password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button  className='m-5  shadow-lg shadow-blue-500/75' onClick={onLogin} variant={'primary'}>Login</Button>
    </div>
    </div>
  );
}
