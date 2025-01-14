import React,{useState} from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
type Prop ={

}
const Pagination = () => {
    const [currentPageNo,updateCurrentPageNo] = useState(1)
    const handleClickPrevious = ()=>{
        
    }
    const handleClickNext = ()=>{
        
    }

    const handleDirectChange = (no:number)=>{
        
    }
  return (
    <div className='flex m-auto'>
    <KeyboardDoubleArrowLeftIcon fontSize={'large'} className='cursor-pointer me-3 filter dark:invert'/>
    <ul className='flex justify-center items-center font-poppins dark:text-white'>
        <li>1</li>
        <li>2</li>
    </ul>
    <div className='flex justify-center items-end'>
            <MoreHorizSharpIcon fontSize='small' className='filter dark:invert' />
        </div>
    <KeyboardDoubleArrowRightIcon fontSize='large' className='cursor-pointer ms-3 filter dark:invert'/>
    </div>
  )
}

export default Pagination
