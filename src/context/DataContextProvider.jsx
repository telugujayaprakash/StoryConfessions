import React,{useState} from "react";
import DataContext from './DataContext'

const DataContextProvider=({children}) =>{
    const [categories,setcategory]=useState('')
    const [stdata,setstdata]=useState("")
  return (
    <DataContext.Provider value={{categories,setcategory,stdata,setstdata}}>
        {children}
    </DataContext.Provider>
  )
}
export default DataContextProvider;