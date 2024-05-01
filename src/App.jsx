import { useState } from 'react'

import './App.css'
import MultiSelectSearch from './components/MultiSelectSearch';
import Pill from './components/Pill';

function App() {

  const fetchUser = async (searchTerm)=>{
    const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
    const responseData = await response.json()
    if(responseData){
      return responseData.users
    }
  }

  return (
    <>
    <MultiSelectSearch searchFunc={fetchUser} PillComponent={Pill}/>

    </>
  )
}

export default App
