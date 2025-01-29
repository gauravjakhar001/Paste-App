import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
const Home = () => {

const[title,setTitile] = useState('');
const [value,setValue] =useState('');
const [searchParams,setSearchParams ] = useSearchParams();
const pasteId = searchParams.get("pasteId");
const dispatch = useDispatch();
const allPastes = useSelector((state)=> state.paste.pastes);
  

useEffect(() => {
  if(pasteId){
    const paste =allPastes.find((p)=> p._id ===pasteId);
    setTitile(paste.title);
    setValue(paste.content);
  }
 
}, [pasteId])


function createpaste(){
  const paste = {
    title: title,
    content: value,
    _id: pasteId || 
    Date.now().toString(36), // Use pasteId if provided, else generate unique ID
    createdAt: new Date().toISOString(),
  }

  
  

  if (pasteId){
    //update 
    dispatch(updateToPastes(paste));
  }else{
    //create
    dispatch(addToPastes(paste));
  }

  //after creation or updation 
  setTitile('');
  setValue('');
  setSearchParams({});

}

return (
    <div className='w-full h-full py-10 max-w-[1200px] max-auto px-5 lg:px-0'>
      <div className='flex flex-col gap-y-5 items-start'>
      <div className='w-full flex flex-row gap-x-4 justify-between items-center'>
      <input 
      className={`${pasteId ? "w-[80%]":"w-[85%]"}text-black border border-input rounded-md p-2`}
      type="text" 
      placeholder='Title'
      value={title} 
      onChange={(e)=>{
        setTitile(e.target.value)}
      }
      />

      <button
      className ="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-50 font-medium rounded-lg
      text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
      onClick={createpaste} >
      { 
        pasteId ? "Update My Paste" : "Create My Paste"
      }
      </button>
    </div>
    </div>

      <div className='mt-8 flex flex-row'>
      
        <textarea
        className='rounded-2xl  mt-4 min-w-[500px] p-4'
        value ={value}
        placeholder='Content '
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        
        />
      </div>


    </div>
  );
};

export default Home
