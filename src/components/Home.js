import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { helpHttp } from '../helpHttp';

 
 
 
 
 

function Home(){

    const [operationsList, setOperationsList] = useState([]);
 

    let api = helpHttp();
    let url = 'http://localhost:3001/api/operations/list'
    let urlPage = 'http://localhost:3001/api/operations?page=1'

    useEffect(() => {
      api.get(url).then((res)=>{
        
        
        if(!res.err){
            console.log(res.data);
            setOperationsList(res.data)
            
        } else {
            setOperationsList(null)
        }
      })
       
    }, [])
    
     
 
   

    const deleteOp = (id) =>{
       
        
        fetch('http://localhost:3001/api/operations/delete/'+id,{
          method: 'DELETE',
          headers:{
              'Content-Type': 'application/json' 
          } 
      }).then(()=>{
        console.log('operation DELETE');
      })
      }

 

   const balance = () =>{
    let balancePositive = 0;
    let balanceNegative = 0;
    let balanceResults = 0;
    operationsList.map(op =>{

         
        if(op.category.type_id === 2){
            let negativeAmount = op.amount
            balanceNegative = balanceNegative + negativeAmount
        } else {
            let positiveAmount = op.amount 
            balancePositive = balancePositive + positiveAmount
        }  
     
    })
   
    return balanceResults = balanceResults + balancePositive + (-balanceNegative);
      
   }

   function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

   

    return(
        <React.Fragment>
             
            
            <div className='table-container'>
               <table className='operations-table'>
                        <thead>
                            <tr>
                                <th className='id-col'>ID</th>
                                <th className='date-col'>Date</th>
                                <th className='category-col'>Category</th>
                                <th className='concept-col'>Concept</th>
                                <th className='amount-col'>Amount</th>
                                <th className='buttons-col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {operationsList.map((operation, index) =>{
                            let date = new Date(operation.date);
                            /* Date format you have */
                            let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                            /* Date converted to MM-DD-YYYY format */
               
            
               return <tr key={index}>
                    <td className='id-col'>{operation.id}</td>
                    <td className='date-col'>{dateMDY}</td>
                    <td className='category-col'>{operation.category.name}</td>
                    <td className='concept-col'>{operation.concept}</td>
                    <td className='amount-col-cell' id='amount-col'>{operation.category.type_id === 1 ?  `$ ${formatNumber(operation.amount)}` : `$ (-${formatNumber(operation.amount)})`}</td>
                    <td className='buttons-col'> <Link to={'operation/edit/'+ operation.id}> <button><FontAwesomeIcon  className='icon-col' icon= {faPenToSquare} /></button> </Link> <button type='submit' onClick={(e)=>{e.preventDefault(); deleteOp(operation.id)}} ><FontAwesomeIcon className='icon-col' icon= {faTrashCan} /></button> </td>
                    
                </tr>
                 
                 
             })}
                        </tbody>
                    </table> 

                    <div className='total-balance-container'>
                    <p> TOTAL BALANCE: $  {formatNumber(balance())} </p> 
                    </div>
           
                     
            </div>
        </React.Fragment>
    )
}
export default Home;