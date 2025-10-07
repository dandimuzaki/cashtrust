import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/AuthContext';
import { Visibility } from '@mui/icons-material';

const PasswordModal = () => {
  const {openModal, closePasswordModal, editProfile, addErrors} = useAuth()
  const [seeOld, setSeeOld] = useState(false)
  const [seePassword, setSeePassword] = useState(false)
  const [seeRepeat, setSeeRepeat] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    formState: {errors}
  } = useForm({
    defaultValues: {
      'oldPassword': '',
      'password': '',
      'repeatPassword': ''
    }
  })

  useEffect(() => {
  if (addErrors) {
    setError('oldPassword', {
      type: 'server',
      message: addErrors
    })
  }
  }, [addErrors, setError])

  useEffect(() => {
    if (!openModal) {
    reset({
      oldPassword: '',
      password: '',
      repeatPassword: ''
    })
    }
  }, [reset, setValue, openModal])

  const watchPassword = watch('password')

  return (
    <Dialog open={openModal} onOpenChange={closePasswordModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            Change Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(editProfile)} className='grid gap-4'>
        <div className='grid gap-2 relative'>
            <Label htmlFor='oldPassword'>Old Password</Label>
            <Input {...register('oldPassword', {
      required: 'Old password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters long'
      }})} type={seeOld ? 'text' : 'password'} id='oldPassword' name='oldPassword'/>
            {errors.oldPassword && (
              <p className='text-red-500 text-xs'>{errors.oldPassword.message}</p>
            )}
            <button type='button' className={`${seeOld ? 'text-gray-500' : 'text-gray-300'} absolute right-2 bottom-[6px]`} onClick={() => setSeeOld((prev) => !prev)}>
              <Visibility/>
            </button>
          </div>

        <div className='grid gap-2 relative'>
            <Label htmlFor='password'>New Password</Label>
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

          <div className='grid gap-2 relative'>
            <Label htmlFor='repeatPassword'>Confirm Password</Label>
            <Input {...register('repeatPassword', {
      required: 'Please confirm your password',
      validate: (value) =>
        value === watchPassword || 'Passwords do not match'
    })} type={seeRepeat ? 'text' : 'password'} id='repeatPassword' name='repeatPassword'/>
            {errors.repeatPassword && (
              <p className='text-red-500 text-xs'>{errors.repeatPassword.message}</p>
            )}
            <button type='button' className={`${seeRepeat ? 'text-gray-500' : 'text-gray-300'} absolute right-2 bottom-[6px]`} onClick={() => setSeeRepeat((prev) => !prev)}>
              <Visibility/>
            </button>
          </div>

          <div className='flex gap-4 justify-center'>
          <button 
          onClick={() => closePasswordModal()}
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

export default PasswordModal
