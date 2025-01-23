"use client"
import React from 'react';
import Form from '../../components/Form'
import Nav2 from '../../components/Nav2';
import Footer from '../../components/Footer';


const CreatePost = () => {

  return (
    <div>
      <div className="mb-4 fixed top-0 left-0 right-0 z-50">
  <Nav2 />
    </div>
      <div className='app'> 
        <Form type='Create'/>
        </div>
        <Footer/>
    </div>
      )
}

export default CreatePost