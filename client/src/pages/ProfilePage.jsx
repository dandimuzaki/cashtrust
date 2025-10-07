import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import { useAuth } from '../hooks/AuthContext'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import AlertDelete from '../components/AlertDelete';
import PasswordModal from '../components/PasswordModal';
import ConfirmDeleteAccount from '../components/ConfirmDeleteAccount';

const ProfilePage = () => {
  const { editProfile, user, onEdit, handleEdit, openDeleteAccount, openPasswordModal } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors}
  } = useForm({
    defaultValues: user || {
      'name': '',
      'email': '',
    }
  })

  useEffect(() => {
    if (user) {
      reset(user)
    } else {
    reset({
      name: '',
      email: '',
    })
    }
  }, [reset, setValue, user])

  return (
    <div>
      <PageTitle title='Profile'/>
      <div className='grid gap-8 max-w-xl items-stretch'>
        <div className='grid gap-4'>
        <h2 className='text-xl'>Edit Profile</h2>
        <form 
        onSubmit={handleSubmit(editProfile)}
        className='grid gap-4'>
        <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input {...register('name')} disabled={!onEdit} id='name' name='name'/>
            {errors.name && (
              <p className='text-red-500 text-xs'>{errors.name.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' {...register('email')} disabled={!onEdit} id='email' name='email'/>
            {errors.email && (
              <p className='text-red-500 text-xs'>{errors.email.message}</p>
            )}
          </div>
          {onEdit ? 
          <div className='flex gap-4'>
                  <button type='button' onClick={handleEdit} className='bg-[var(--secondary)] py-2 px-4 rounded-lg w-fit'>Cancel</button>

                <button className='bg-green-500 py-2 px-4 rounded-lg w-fit'>Save</button>  
          </div>
        :
        <button type='button' onClick={handleEdit} className='bg-[var(--secondary)] py-2 px-4 rounded-lg w-fit'>Edit</button>
          }
        </form>          
        </div>

        <div className='grid gap-4'>
        <h2 className='text-xl'>Change Password</h2>
        <button onClick={openPasswordModal} type='button' className='bg-orange-500 text-white py-2 px-4 rounded-lg w-fit'>Change Password</button>
        <PasswordModal/>
        </div>

        <div className='grid gap-4'>
        <h2 className='text-xl'>Delete Account</h2>
        
        <button onClick={openDeleteAccount} type='button' className='bg-red-500 text-white py-2 px-4 rounded-lg w-fit'>Delete Account</button>
        <ConfirmDeleteAccount/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage