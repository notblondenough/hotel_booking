import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

interface Props{
  children: React.ReactNode
}
const Layout = ({children}:Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <Hero/>
        <div className='flex-1 py-10 mx-auto container'>{children}</div>
        <Footer/>
    </div>
  )
}
 
export default Layout