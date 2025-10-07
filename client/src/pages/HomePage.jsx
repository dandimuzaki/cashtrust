import React from 'react'
import hand from './../assets/hand-holding-phone.png'
import phone from './../assets/phone.png'
import {BarChart, Category, TrendingUp, Tune} from '@mui/icons-material';

const HomePage = () => {
  return (
    <div className=''>
      <div className='bg-white h-screen relative overflow-hidden flex justify-center'>
        {/*<div className="absolute w-full h-full bg-linear-to-bl from-[var(--secondary)] to-[rgba(0,0,0,0)]"></div>
        <div className="absolute w-full h-full bg-linear-to-tr from-[var(--primary)] to-[rgba(0,0,0,0)]"></div>
        */}
        <div class="absolute bottom-[-50px] left-[-50px] w-1/2 h-2/3 bg-[var(--primary)] rounded-tr-[300px] blur-[80px] opacity-80"></div>
        <div class="absolute top-[-50px] right-[-50px] w-1/2 h-2/3 bg-[var(--secondary)] rounded-bl-[300px] blur-[80px] opacity-80"></div>
        <div className='h-full w-6xl z-100 px-4 sm:px-6 lg:px-8 py-20'>
        <div className='h-full w-full flex flex-col justify-center gap-6'>
          <h2 className='text-5xl/16 font-semibold'><span className=''>Trust</span> your cashflow,<br />track it with <span className='py-1 px-4 text-white bg-[var(--primary)] rounded-lg font-bold'>CashTrust</span></h2>
          <p className='text-xl'>CashTrust helps you record every transaction, <br/>analyze spending patterns, and manage your income and expenses</p>
          <div className='flex gap-4'>
            <button className='py-2 px-4 rounded-full bg-[var(--primary)] text-white text-xl'>Try For <span className='font-bold'>Free</span></button>
          </div>
        </div>
        </div>
        <div className='absolute h-[calc(100vh-6rem)] flex right-0 bottom-0'>
          <img className='h-full object-contain' src={hand}/>
        </div>
      </div>
      <div className='relative flex justify-center'>
      <div className='max-w-6xl mx-auto text-center px-6 lg:px-8 py-20 space-y-8'>
        <h2 className='text-4xl md:text-5xl font-semibold'>Finance Made Simple<br/>for Every Business Owner</h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>From tracking expenses to optimizing cash flow, get the clarity and<br/>control you need to support sustainable business growth</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            <div className='grid gap-4 h-fit text-left'>
              <div className='p-2 rounded-lg bg-[var(--light-primary)] text-white w-fit'>
                <TrendingUp fontSize='large' />
              </div>
              <h3 className='font-bold text-xl'>Support UMKM Growth</h3>
              <p>Manage cash flow effortlessly and help small businesses build stronger financial habits</p>
            </div>
          <div className='relative max-h-100 row-span-2 flex justify-center overflow-hidden'>
            <div class="absolute justify-center items-center flex w-full h-full">
            <div class="w-4/5 aspect-1/1 bg-[var(--secondary)] rounded-full blur-lg opacity-90"></div>
            </div>
            <img className='z-100 h-full object-cover' src={phone}/>
          </div>
          <div className='grid gap-4 h-fit text-left'>
              <div className='p-2 rounded-lg bg-[var(--light-primary)] text-white w-fit'>
                <BarChart fontSize='large' />
              </div>
              <h3 className='font-bold text-xl'>Get Clear Insights</h3>
              <p>Instantly understand where your money comes from and where it goes</p>
            </div>
            <div className='grid gap-4 h-fit text-left'>
              <div className='p-2 rounded-lg bg-[var(--light-primary)] text-white w-fit'>
                <Category fontSize='large' />
              </div>
              <h3 className='font-bold text-xl'>Customize Categories</h3>
              <p>Personalize your spending and income categories to match your unique workflow</p>
            </div>
            <div className='grid gap-4 h-fit text-left'>
              <div className='p-2 rounded-lg bg-[var(--light-primary)] text-white w-fit'>
                <Tune fontSize='large' />
              </div>
              <h3 className='font-bold text-xl'>Stay in Control</h3>
              <p>Track balances, expenses, and savings—all in one intuitive dashboard</p>
            </div>
          </div>
      </div>
      </div>
      
    </div>
  )
}

export default HomePage
