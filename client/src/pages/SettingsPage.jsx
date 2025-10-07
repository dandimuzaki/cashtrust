import React from 'react'
import PageTitle from '../components/PageTitle'
import { useCategory } from '../hooks/CategoryContext'
import { Add, Close } from '@mui/icons-material'
import CategoryModal from '../components/CategoryModal'
import AlertDelete from '../components/AlertDelete'

const SettingsPage = () => {
  const {categories, removeCategory, openCategoryModal} = useCategory()

  return (
    <div>
      <PageTitle title="Settings" />
      <div className='grid grid-cols-2 gap-4 max-w-xl items-stretch'>
  <h2 className='text-xl col-span-2'>Custom Categories</h2>
  {/* Income Column */}
  <div className='flex flex-col gap-2 h-full'>
    <h3 className='text-lg'>Income</h3>
    <div className='flex-1 grid gap-2 p-4 rounded-lg h-full border border-gray-500'>
      {categories
        ?.filter((c) => c.type == 'income')
        .map((c) => (
          <div key={c.id} className='flex items-center justify-between h-fit pl-4 pr-2 py-2 rounded bg-gray-200'>
            <p>{c.name}</p>
            <AlertDelete
            title='Are you sure you want to delete this category?'
            description='Once deleted, it will be permanently removed from your records.'
            action={() => removeCategory(c.id)}
            >
            <button>
              <Close/>
            </button>
            </AlertDelete>
          </div>
        ))}
    </div>
  </div>

  {/* Expense Column */}
  <div className='flex flex-col gap-2 h-full'>
    <h3 className='text-lg'>Expense</h3>
    <div className='flex-1 grid gap-2 p-4 rounded-lg h-full border border-gray-500'>
      {categories
        ?.filter((c) => c.type == 'expense')
        .map((c) => (
          <div key={c.id} className='flex items-center justify-between h-fit pl-4 pr-2 py-2 rounded bg-gray-200'>
            <p>{c.name}</p>
            <AlertDelete
            title='Are you sure you want to delete this category?'
            description='Once deleted, it will be permanently removed from your records.'
            action={() => removeCategory(c.id)}
            >
            <button>
              <Close/>
            </button>
            </AlertDelete>
          </div>
        ))}
    </div>
  </div>
  <div 
  onClick={() => openCategoryModal()}
  className='flex items-center gap-2 col-span-2 w-fit h-fit pl-2 pr-4 py-2 rounded bg-blue-500'>
            <Add/>Add Category
          </div>
</div>
<CategoryModal/>
    </div>
  )
}

export default SettingsPage
