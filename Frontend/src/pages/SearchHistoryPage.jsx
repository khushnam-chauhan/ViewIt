import React from 'react'
import Navbar from "../components/Navbar";

const SearchHistoryPage = () => {
  return (
	<div className='w-screen min-h-screen bg-cover divide-opacity-15 text-white'
  style={{ backgroundImage: `url('/404.jpg')` }}>
		<Navbar />
		<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                    <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Your search history is not stored. We respect your privacy and do not retain any of your search data.</h2>
                </div>
	</div>
  )
}

export default SearchHistoryPage