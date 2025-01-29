
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p)=> p._id === id)[0];
  const [value,setValue] =useState('');



  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between mt-4'>
    <input 
    className='p-2 rounded-2xl mt-2 w-[65%]
    pl-5'
    type="text" 
    placeholder='Enter Title Here'
    value={paste.title} 
    disabled
    />

    
  </div>

    <div className='mt-8 relative'>
      <button onClick={()=>{
        navigator.clipboard.writeText(paste.content);
        toast.success("Copied to Clipboard");
      }} className='absolute top-6 right-3 bg-blue-500 text-white p-1 rounded'>
        Copy</button>
      <textarea
      className='rounded-2xl  mt-4 min-w-[500px] p-4'
      value ={paste.content}
      placeholder='Enter content here'
      disabled
      
      rows={20}
      
      />
    </div>


  </div>
  )
}

export default ViewPaste
