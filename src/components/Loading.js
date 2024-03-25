import React, { useEffect } from 'react'
import BAPI from '../helper/variable';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
    const accessToken = localStorage.getItem('accessToken');
    const navigate =useNavigate()
    useEffect(()=>{
        const infofetch=async()=>{
         try {
           const response = await fetch(
             `${BAPI}/api/v0/users/me`,
             {
               method: 'GET',
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${accessToken}`,
               },
             }
           );
           const responseData = await response.json();
           if(responseData.list_as_freelancer===true){
                   navigate('/freelancer')
           }
           else{
            navigate('/client')
           }
          
         } catch (error) {
           console.error('Error during fetching data:', error);
         }
        }
        infofetch();
   },[]);
 
  return (
    <div>
      
    </div>
  )
}
