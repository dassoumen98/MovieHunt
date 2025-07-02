import React from 'react'

export default function Search({searchTerm , setSearchTerm}) {
  return (
    <div className='search'>
       <div >
        <img src="../src/assets/search.svg" alt="" />
        <input type="text"
         placeholder='Search thousands of  movies'
         value={searchTerm}
         onChange={(e)=> setSearchTerm(e.target.value)}
         />
       </div>
    </div>
  )
}
