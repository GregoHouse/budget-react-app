import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { helpHttp } from '../helpHttp';

export const OpEdit = () => {
   const {id} = useParams()
  
  const [categories, setCategories] = useState([]);
  const [categoriesIncomes, setCategoriesIncomes] = useState([]);
  const [categoriesExpenses, setCategoriesExpenses] = useState([]);
 
  const [category_id, setCategory] = useState([]);
  const [idOp, setIdOp] = useState([]);
  const [date, setDateOp] = useState([]);
  const [concept, setConcept] = useState([]);
  const [amount, setAmount] = useState([]);

  const categoryIDMatch = () =>{
    categories.map(category =>{
      console.log(category);
      console.log(category_id);
      console.log(category.name === category_id)
      if(category.name === category_id){
        return  category.type.name
      }
    })
  }



  let d = new Date(date);
  let month = (d.getMonth() + 1).toString().padStart(2, '0');
  let day = d.getDate().toString().padStart(2, '0');
  let year = d.getFullYear();
  /* Date format you have */
  let dateMDY = () =>{
    return [year, month, day].join('-');
  } 
  /* Date converted to MM-DD-YYYY format */

 
 

  let api = helpHttp();
  let url = 'http://localhost:3001/api/operations/list';
  let urlEdit = 'http://localhost:3001/api/operations/edit/'+id;
  let urlCategory = 'http://localhost:3001/api/categories/list';

  const handleSubmit = (e) =>{
    e.preventDefault();
    const body = {date, concept, amount, category_id, 'user_id':20}
    
    fetch(urlEdit,{
      method: 'PUT',
      headers:{
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body)
  }).then(()=>{
    console.log('operation edit');
  })
  }

   useEffect(() => {
    api.get(url).then((res)=>{
      if(!res.err){
        
          const operations = res.data;

          operations.map(op =>{

                    if(op.id === JSON.parse(id)) {
                    
                     return (
                      setIdOp(op.id),
                      setDateOp(op.date),
                      setConcept(op.concept),
                      setAmount(op.amount),
                      setCategory(op.category.name))
      } 
      })
    } else {
          return(
              setIdOp(null),
              setDateOp(null),
              setConcept(null),
              setAmount(null),
              setCategory(null)
          )
    }
    })
    api.get(urlCategory).then((res)=>{
      if(!res.err){
          const categories = res.data;
          
          
                   setCategories(categories)
                   categories.map(category =>{
                    if(category.type_id === 1){
                      setCategoriesIncomes(...categoriesIncomes,category)
                    }
                   })
                   categories.map(category =>{
                    if(category.type_id === 2){
                      setCategoriesExpenses(...categoriesExpenses,category)
                    }
                   })
    }  
})
    }, [])

    
  //  let data = {
  //   id: document.getElementById('id-input'),
  //   date: document.getElementById('date-input'),
  //   concept:document.getElementById('concept-input'), 
  //   amount: document.getElementById('amount-input'),
  //   category_id:document.getElementById('category-input')
  //  }

    

    // const editOp = (data) =>{
    //   console.log('llegue');
    //   console.log(data);
     
    //   let body = {
    //     id: data.id.value,
    //       date: data.date.value,
    //       concept: data.concept.value,
    //       amount: data.amount.value,
    //       category_id: data.category_id.value
    //   }
       
    //   // let options = {
    //   //   body: {
    //   //     id: data.id.value,
    //   //     date: data.date.value,
    //   //     concept: data.concept.value,
    //   //     amount: data.amount.value,
    //   //     category_id: data.category_id.value
    //   //   } ,
    //   //   headers: {"content-type":"application/json"},
    //   //   method: "PUT"
    //   // }

    //   console.log('soy options');
    //   console.log(body);
    //   console.log(urlEdit)

    //   fetch('http://localhost:3001/api/operations/update/'+id,{
    //             method: 'PUT',
    //             headers:{
    //                 'Content-Type': 'application/json' 
    //             },
    //             body: JSON.stringify(body)
    //         })

    //   // fetch(urlEdit, options)
    //   //   .then((res) =>
    //   //     res.ok ? res.json() : Promise.reject({
    //   //           err: true,
    //   //           status: res.status || "00",
    //   //           statusText: res.statusText || "Ocurrió un error",
    //   //         })
    //   //   )
    //   //   .catch((err) => err);

    //   // api.put(urlEdit, options).then((res)=>{
    //   //   console.log(urlEdit);
    //   //   console.log(options);
    //   //   if(!res.err){

    //   //     return (
    //   //                 setIdOp(data.id.value),
    //   //                 setDateOp(data.date.value),
    //   //                 setConcept(data.concept.value),
    //   //                 setAmount(data.amount.value),
    //   //                 setCategory(data.category_id.value))
          
    //   //   }
    //   // })
    // }

    
   
    console.log(categoryIDMatch());
  
  return (
    <React.Fragment>
      <div> 
          <form className='create-op-form' onSubmit={handleSubmit}>
            <div className='row-label-input-edit'>
              <p>ID</p>
              <input  value={idOp} id='id-input'   />
            </div>
            <div className='row-label-input-edit'>
              <p>Date</p>
              <input type='date' value={dateMDY()} required id='date-input' onChange={(e)=>{setDateOp(e.target.value)}} />  
            </div>
            <div className='row-label-input-edit'>
              <p>Concept</p>
              <input  type='text' value={concept} required id='concept-input'  onChange={(e)=>{setConcept(e.target.value)}}  /> 
            </div>
            <div className='row-label-input-edit'>
              <p>Amount</p>
              <input type='number' value={amount} required id='amount-input' onChange={(e)=>{setAmount(e.target.value)}}  /> 
            </div>
            <div className='row-label-input-edit'>
              <p>Category</p>
              
              <select id='category-input' required name='category_id' onChange={(e)=>{setCategory(e.target.value)}}>
               
                {categories.map((category, index)=>{
                 
                 
               
                  return <option  id='option' value={category.id} key={index} selected={category.name === category_id ? true : false}   > {category.name + '-' + category.type.name}</option> 

                
                  
                  
                   
                })}
              
              </select>
            </div>
            <button className='button-create' type='submit'>SAVE</button>
          </form>
      </div>
    </React.Fragment>

  )  
}
