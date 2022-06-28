 
 
import React,  { useState, useEffect } from 'react';
import { helpHttp } from '../helpHttp';
import { Navigate } from 'react-router-dom';




export const OpCreate = () => {

   
    const [categories, setCategories] = useState([]);

    const [category_id, setCategory] = useState([]);
    const [date, setDateOp] = useState([]);
    const [concept, setConcept] = useState([]);
    const [amount, setAmount] = useState([]);

    let api = helpHttp();
    let urlCategory = 'http://localhost:3001/api/categories/list';

    let urlCreate = 'http://localhost:3001/api/operations/create';
   
    const handleSubmit = (e) =>{
      e.preventDefault();
      const body = {date, concept, amount, category_id, 'user_id':20}
      console.log(body);
      fetch(urlCreate,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    }).then(()=>{
      return <Navigate replace to='/'></Navigate> 
      console.log('operation created');
    
    })
    }
  
     useEffect(() => {
        api.get(urlCategory).then((res)=>{
            if(!res.err){
                const categories = res.data;
                
                         setCategories(categories)
          }  
     })
    }, [])
     
 
 

  return (
    <React.Fragment>
         <div className='form-container'> 
          <form className='create-op-form' onSubmit={handleSubmit}>
             
            <div className='row-label-input-edit'>
              <p>Date</p>
              <input type='date' value={date} required  id='date-input' name='date' onChange={(e)=>{setDateOp(e.target.value)}}/>  
            </div>
            <div className='row-label-input-edit'>
              <p>Concept</p>
              <input  type='text' value={concept} required id='concept-input' name='concept' onChange={(e)=>{setConcept(e.target.value)}}/> 
            </div>
            <div className='row-label-input-edit'>
              <p>Amount</p>
              <input type='number' value={amount} required  id='amount-input' name='amount' onChange={(e)=>{setAmount(e.target.value)}}/> 
            </div>
            <div className='row-label-input-edit'>
              <p>Category</p>
              
              <select className='row-label-input-edit'  id='category-input' required name='category_id' onChange={(e)=>{setCategory(e.target.value)}}>
              <option>select</option>
                {categories.map((category, index)=>{
                
                  
                  return <option  id='option' value={category.id} key={index}>{category.name + '-' + category.type.name}</option>
                   
                })}
              
              </select>
            </div>
            <button className='button-create' type='submit' >CREATE</button>
          </form>
      </div>
    </React.Fragment>
  )
}
