import React from 'react'
import search from '../assets/search.svg'
export default function Search({searchTerm , setSearchTerm}) {
  return (
    <div className='search'>
       <div >
        <img src={search} alt="" />
        <input type="text"
         placeholder='Search thousands of  movies'
         value={searchTerm}
         onChange={(e)=> setSearchTerm(e.target.value)}
         />
       </div>
    </div>
  )
}
