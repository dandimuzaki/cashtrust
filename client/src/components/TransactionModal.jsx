import React, { useEffect, useState } from 'react'
import { useTransaction } from '../hooks/TransactionContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategories } from '../services/categoryService';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/AuthContext';

const TransactionModal = () => {
  const {
      selectedTransaction,
      transaction,
      openModal,
      closeTransactionModal,
      saveTransaction,
      setLoading
  } = useTransaction()

  const [categories, setCategories] = useState([])
  const { loadingAuth, accessToken } = useAuth()

  const schema = z.object({ description: z.string().min(1, 'Description is required'), type: z.string().min(1, 'Type is required'), category_id: z.string().min(1, 'Category is required'), amount: z .number({ invalid_type_error: 'Amount must be a number' }) .positive('Price must be a number greater than 0'), })
  
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: transaction || {
      'description': '',
      'type': '',
      'category_id': '',
      'amount': 0,
    }
  })

  useEffect(() => {
    if (openModal && transaction) {
      reset(transaction)
    } else {
      reset({
        description: '',
        type: '',
        category_id: '',
        amount: 0
      })
    }
  }, [openModal, transaction, reset, setValue])

  const watchType = watch('type')

  useEffect(() => {
    const query = new URLSearchParams()
    if (watchType) {
      query.append('type', watchType)
    }

    const loadCategories = async (query) => {
      setLoading(true)
      try {
        const result = await getCategories(query)
        if (result.data) {
          setCategories(result.data)
        }
      } catch (err) {
        console.error("Failed to load categories", err)
      } finally {
        setLoading(false)
      }
    }

    if (!loadingAuth && accessToken) {
    loadCategories(query)
    }
  }, [watchType, setLoading, loadingAuth, accessToken])
  
  return (
    <Dialog open={openModal} onOpenChange={closeTransactionModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {selectedTransaction ? 'Edit' : 'Add'} Transaction
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveTransaction)} className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Input {...register('description')} id='description' name='description'/>
            {errors.description && (
              <p className='text-red-500 text-xs'>{errors.description.message}</p>
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

          <Controller
            name='category_id'
            control={control}
            render={({field}) => (
              <div className='grid gap-2'>
                <Label 
                onClick={() => console.log(field)}
                htmlFor='category_id'>Category</Label>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  id='category_id' name='category_id'>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select category'/>
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((c) => (
                        <SelectItem
                          key={c.id}
                          value={String(c.id)}
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category_id && (
                    <p className='text-red-500 text-xs'>{errors.category_id.message}</p>
                  )}
              </div>
            )}
            />

          <div className='grid gap-2'>
            <Label htmlFor='amount'>Amount</Label>
            <Input type="number" {...register('amount',{ valueAsNumber: true })} id='amount' name='amount'/>
            {errors.amount && (
              <p className='text-red-500 text-xs'>{errors.amount.message}</p>
            )}
          </div>

          <div className='flex gap-4 justify-center'>
          <button 
          onClick={() => closeTransactionModal()}
          type='button' 
          className='py-2 px-4 text-white font-bold rounded bg-yellow-500 w-20'>
              Cancel
            </button>
            <button type='submit' 
            className='py-2 px-4 text-white font-bold rounded bg-green-500 w-20'>
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionModal
