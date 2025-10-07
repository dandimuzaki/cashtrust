import React from 'react'
import TransactionTable from './../components/TransactionTable'
import { Add, SearchOutlined } from '@mui/icons-material';
import TransactionModal from '../components/TransactionModal';
import { useTransaction } from '../hooks/TransactionContext.jsx';

const TransactionPage = () => {
  const {openTransactionModal} = useTransaction()
  return (
    <div>
      <div className='pt-8 items-end flex justify-between gap-4 pb-4 bg-[var(--background)] sticky top-0 z-150'>
        <h1 className='text-3xl'>Transaction History</h1>
        
      </div>
      <div className='flex gap-4 items-center flex justify-between pb-4'>
          <button 
          onClick={() => openTransactionModal()}
          className='flex gap-2 items-center pr-4 pl-2 py-2 rounded-lg bg-[var(--primary)] text-white'>
            <Add/>
            Add<span className='hidden md:block'> Transaction</span>
          </button>
          <div className='flex h-10'>
            <input 
            type='text' 
            placeholder='Search transaction'
            className='border-y border-l border-gray-400 px-2 py-2 rounded-l-lg'
            />
            <button className='rounded-r-lg flex justify-center border border-gray-400 items-center w-10 h-full bg-gray-200'>
              <SearchOutlined />
            </button>
          </div>
        </div>
      <TransactionTable />
      <TransactionModal/>
    </div>
  )
}

export default TransactionPage
