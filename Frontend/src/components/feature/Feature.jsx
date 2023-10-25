import {React,useRef} from 'react'
import './feature.scss'
import { feature } from '../../data';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
const Feature = () => {
  const refFeature = useRef(); 
  const [slice,setSlice] = useState(0);
  const handleArrow = (direction)=>{
    if(direction === "right" && slice < 3){
      refFeature.current.style.transform = `translateX(-${(slice + 1) * 100}vw)`
      setSlice(slice=>slice + 1)
    }else{
      refFeature.current.style.transform = `translateX(0vw)`
      setSlice(0)
    }

    if (direction === "left" && slice >= 1) {
      refFeature.current.style.transform = `translateX(-${(slice - 1) * 100}vw)`
      setSlice(slice=>slice - 1)
    }
  }
  return (
    <div className='feature-container'>
     
        <div ref={refFeature} className="feature-wraper">
              {feature  && feature.map(item=>{
                 return (
                   <div className="feature-item">
                     <img src={item.url} alt="" />
                     <div className='feature-item-info'>
                       <h1>{item.title}</h1>
                       <span>{item.content}</span>
                       <button><a href='#product'>KHÁM PHÁ</a></button>
                     </div>
                   </div>
                 )
              })}
        </div>
       
    </div>
  )
}

export default Feature