import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import HeaderLayout from './layouts/HeaderLayout'
import TransactionPage from './pages/TransactionPage'
import SettingsPage from './pages/SettingsPage'
import { TransactionProvider } from './hooks/TransactionProvider'
import { CategoryProvider } from './hooks/CategoryProvider'
import HomePage from './pages/HomePage'
import PlainLayout from './layouts/PlainLayout'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './hooks/AuthProvider'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
            <AuthProvider>

    <TransactionProvider>
      <CategoryProvider>
      <Routes>
      <Route element={<HeaderLayout/>}>
      <Route element={<MainLayout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/transactions' element={<TransactionPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        </Route>
        <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route element={<PlainLayout/>}>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        </Route>
      </Routes>
      </CategoryProvider>
      </TransactionProvider>
      </AuthProvider>

    </>
  )
}

export default App
