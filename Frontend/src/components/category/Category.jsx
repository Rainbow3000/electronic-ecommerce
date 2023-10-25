import React from 'react'
import './category.scss'
import { category } from '../../data'
const Category = () => {
  return (
    <div className="category-container">
        <h2>Danh Mục</h2>
        <div className='category-delimiter'></div>
        <div className='category-wraper'>
          {
            category && category.map((item,index)=>{
              return (<div className="category-item ">
                <div className="category-overlay"></div>
                <img src={item.url} />
                <div className="category-info">
                  <h2>{item.title}</h2>
                  <span>{item.content}</span>
                </div>
              </div>)
            })
          }
          </div>
          
    </div>
  )
}

export default Category