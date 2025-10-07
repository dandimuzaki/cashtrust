import React, { useEffect } from 'react'
import { useCategory } from '../hooks/CategoryContext'
import { Controller, useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ClipLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';

const CategoryModal = () => {
  const {
    openModal,
    closeCategoryModal,
    saveCategory,
    loading
  } = useCategory()

  const schema = z.object({ name: z.string().min(1, 'Name is required'), type: z.string().min(1, 'Type is required')})

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      'name': '',
      'type': '',
      'color': ''
    }
  })

  useEffect(() => {
    if (!openModal) {
      reset({
      name: '',
      type: '',
      color: ''
    })}
  }, [openModal, reset])

  return (
    <Dialog open={openModal} onOpenChange={closeCategoryModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            Add Category
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveCategory)} className='grid gap-4'>
        <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input {...register('name')} id='name' name='name'/>
            {errors.name && (
              <p className='text-red-500 text-xs'>{errors.name.message}</p>
            )}
          </div>

          <Controller
            name='type'
            control={control}
            render={({field}) => (
              <div className='grid gap-2'>
                <Label 
                htmlFor='type'>Type</Label>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  id='type' name='type'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select type'/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='income'>Income</SelectItem>
                      <SelectItem value='expense'>Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className='text-red-500 text-xs'>{errors.type.message}</p>
                  )}
              </div>
            )}
            />

            <div className='flex gap-4 justify-center'>
          <button 
          onClick={() => closeCategoryModal()}
          type='button' 
          className='py-2 px-4 text-white font-bold rounded bg-yellow-500 w-20'>
              Cancel
            </button>
            <button type='submit' 
            className='flex items-center gap-2 py-2 px-4 text-white font-bold rounded bg-green-500 w-20'>
              {loading ? <>
                <ClipLoader color='#ffffff' size={16} />
                Saving
              </> : 'Save'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CategoryModal
