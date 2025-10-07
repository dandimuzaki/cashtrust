import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/AuthContext';
import { Visibility } from '@mui/icons-material';

const ConfirmDeleteAccount = () => {
  const {onDeleteAccount, closeDeleteAccount, deleteAccount, addErrors} = useAuth()
  const [seePassword, setSeePassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: {errors}
  } = useForm({
    defaultValues: {
      'password': '',
    }
  })

  useEffect(() => {
  if (addErrors) {
    setError('password', {
      type: 'server',
      message: addErrors
    })
  }
  }, [addErrors, setError])

  useEffect(() => {
    if (onDeleteAccount) {
      reset({ password: '' });
      setError('password', { message: '' }); // clear old error
    }
  }, [reset, setValue, onDeleteAccount, setError])

  return (
    <Dialog open={onDeleteAccount} onOpenChange={closeDeleteAccount}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            Delete Account
          </DialogTitle>
          <DialogDescription>
          This will permanently delete your account.
          You will lose access to all your data. Are you absolutely sure?
          Please confirm your password
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(deleteAccount)} className='grid gap-4'>
        
        <div className='grid gap-2 relative'>
            <Label htmlFor='password'>Confirm Password</Label>
            <Input {...register('password', {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters long'
      }})} type={seePassword ? 'text' : 'password'} id='password' name='password'/>
            {errors.password && (
              <p className='text-red-500 text-xs'>{errors.password.message}</p>
            )}
            <button type='button' className={`${seePassword ? 'text-gray-500' : 'text-gray-300'} absolute right-2 bottom-[6px]`} onClick={() => setSeePassword((prev) => !prev)}>
              <Visibility/>
            </button>
          </div>

          <div className='flex gap-4 justify-center'>
          <button 
          onClick={() => closeDeleteAccount()}
          type='button' 
          className='py-2 px-4 text-white font-bold rounded bg-yellow-500 w-20'>
              Cancel
            </button>
            <button type='submit' 
            className='py-2 px-4 text-white font-bold rounded bg-red-500 w-20'>
              Delete
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDeleteAccount
