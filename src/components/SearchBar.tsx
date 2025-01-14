import React, { useState,useEffect} from 'react'
import Search from "@mui/icons-material/Search";
import { filterednftsData } from '../constants';

type Prop={
    nftsData:filterednftsData[]|null,
    searchDataResult:React.Dispatch<React.SetStateAction<filterednftsData[] | null>>
    styles?:string
}

const SearchBar = ({nftsData,searchDataResult,styles}:Prop) => {
    const [searchTerm,updateSearchTerm]=useState('')

    const handleInputChange = (text:string)=>{
        if(text=='')
        {
            searchDataResult([])
            return 
        }
        const result  = nftsData?.filter((item)=>item.tokenData.name.toLowerCase().startsWith(text.toLowerCase()))
        if(result)
            searchDataResult(result)
        console.log("result",result)
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            console.log('searching....');
            handleInputChange(searchTerm)
        }, 500);

        return ()=>clearTimeout(timer)

    },[searchTerm])

  return (
    <div className={`${styles?styles:"md:w-80  w-full min-w-52 flex items-center justify-center"}`}>
    <Search fontSize="large" className="cursor-pointer dark:filter dark:invert" />
    <input type="search" name="search" id="" onChange={(e)=>{
        updateSearchTerm(e.target.value)
    }} placeholder="Search..." className="h-10 max-h-10 border-2 rounded-md dark:bg-slate-200  w-full ms-2" />
  </div>
  )
}

export default SearchBar
