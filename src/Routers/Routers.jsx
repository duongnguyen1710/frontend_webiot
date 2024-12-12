
import React from 'react'
import Admin from './Admin'
import Customer from './Customer'
import { Route, Routes } from 'react-router-dom'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/admin/*' element={<Admin/>}></Route>
        <Route path='/*' element={<Customer/>}></Route>
      </Routes>
    </div>
  )
}

export default Routers
