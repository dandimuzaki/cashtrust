import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import logo from './../assets/logo.png'
import { Visibility } from '@mui/icons-material';
import { useAuth } from '../hooks/AuthContext';

const LoginPage = () => {
  const [seePassword, setSeePassword] = useState(false)
  const { handleLogin } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors}
  } = useForm({
    defaultValues: {
      'email': '',
      'password': '',
    }
  })

  useEffect(() => {
    reset({
      email: '',
      password: '',
    })
  }, [reset, setValue])

  return (
    <div className='min-h-screen bg-[var(--primary)] flex justify-center'>
      <div className='p-12 grid gap-6 max-w-xl'>
      <div className='flex justify-center'>
        <img src={logo} className='object-cover h-8 w-80' />
      </div>
      <div className='text-white text-center grid gap-1'>
      <h1 className='font-bold text-2xl'>Welcome Back!</h1>
      <p>Join us and start managing your transactions easily.</p>
      </div>
      <form className='grid gap-6' onSubmit={handleSubmit(handleLogin)}>
      <div
      className='bg-white p-8 rounded-lg grid gap-4'
      >
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' {...register('email')} id='email' name='email'/>
            {errors.email && (
              <p className='text-red-500 text-xs'>{errors.email.message}</p>
            )}
          </div>

          <div className='grid gap-2 relative'>
            <Label htmlFor='password'>Password</Label>
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

        </div>
        <button className='justify-self-center bg-[var(--secondary)] py-2 px-4 rounded-lg w-fit'>Login</button>
      </form>
      <p className='text-white text-center'>Already have an account? <a href='/login' className='font-bold underline'>Log in here</a></p>
      </div>
    </div>
  )
}

export default LoginPage
