import React from 'react'
import { SiMinutemailer } from "react-icons/si"

const Navbar = () => {
  return (
    <div className='navbar-container' style={{height:"12vh"}}>
            <div className='discount-box h-50 row'>
                <div className='col-3'>
                <SiMinutemailer />
                
                </div>
                <div className='col-6 '></div>
                <div className='col-3 bg-warning'></div>
            </div>
            <div className='navbar-content-box bg-info h-50'>

            </div>
    </div>
  )
}

export default Navbar
