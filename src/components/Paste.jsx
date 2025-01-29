import { removeListener } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

// Import icons from react-icons
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from 'react-icons/fa';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste._id} className='border'>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className='flex flex-row gap-4 place-content-evenly mt-3'>
                  <button className="flex items-center gap-2 ">
                    <a href={`/?pasteId=${paste._id}`}>
                      <FaEdit /> Edit
                    </a>
                  </button>

                  <button className="flex items-center gap-2">
                    <a href={`/pastes/${paste._id}`}>
                      <FaEye /> View
                    </a>
                  </button>

                  <button 
                    className="flex items-center gap-2"
                    onClick={() => handleDelete(paste._id)}
                  >
                    <FaTrash /> Delete
                  </button>

                  <button
                    className="flex items-center gap-2"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to Clipboard");
                    }}
                  >
                    <FaCopy /> Copy
                  </button>

                  <button 
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: paste.title,  // Use the title of the paste
                          text: paste.content,  // Use the content of the paste
                          url: window.location.href,  // Or a specific URL if needed
                        })
                          .then(() => toast.success("Shared Successfully")) // On success, show a toast
                          .catch((error) => toast.error("Failed to Share")); // Handle any errors
                      } else {
                        toast.error("Share functionality is not supported");
                      }
                    }}
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Created At: {paste.createdAt}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Paste;
