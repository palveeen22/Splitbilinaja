import Link from 'next/link'
import React from 'react'
// import Button from './components/Button'
import { LiaHornbill } from "react-icons/lia";
import { RainbowButton } from '@/components/ui/rainbow-button';


const Page = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-zinc-800'>
      <div className='w-full flex flex-col items-center text-center gap-4 text-white'>
        <LiaHornbill size={100} />
        <h3 className='text-4xl'>Splitin Aja</h3>
        <Link href="/askMe" className='w-full max-w-xs px-4'>
          {/* <Button title='Start' style='border border-white p-4 text-center w-full text-white hover:bg-white hover:text-zinc-800 transition-colors' /> */}
          <RainbowButton className='p-4 text-center w-full text-white transition-colors'>Start</RainbowButton>
        </Link>
      </div>
    </div>
  )
}

export default Page