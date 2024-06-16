import React,{useState} from "react";
import DataContext from './DataContext'

const DataContextProvider=({children}) =>{
    const [categories,setcategory]=useState('')
  return (
    <DataContext.Provider value={{categories,setcategory}}>
        {children}
    </DataContext.Provider>
  )
}
export default DataContextProvider;