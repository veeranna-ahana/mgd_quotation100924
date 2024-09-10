import React from 'react';
import ThreeTabs from './ThreeTabs';
import { useNavigate } from 'react-router-dom';

export default function SigmaForm() {
    const nav=useNavigate();
  return (
    <div>
    <div className="col-md-12">
        <div className="row">
          <h4 className="title">Programing Manager</h4>
        </div>
      </div>
     
     <div className='row mb-3'>
                
  
    

 <div className="col-md-12 col-sm-12"  style={{marginLeft:'0px'}}  >
     <div className="ip-box  mt-2" >
       <div className='row' >


       <div className=" row col-md-4">
        
      
       <label className="form-label">Magod Laser Maching Pvt Ltd </label>
       <label className="form-label">20 NC Programming Manager </label>
            
             </div>


<div className='row col-md-8'>
         <button className="button-style  group-button col-md-3" 
           >
            Order DXF
         </button>

         <button className="button-style  group- col-md-3" 
           >
          Cust Parts
         </button>

         <button className="button-style  group-button col-md-3" 
           >
          Sigma Nest
         </button>
         <button className="button-style  group-button col-md-2" 
          onClick={e=> nav("/home")} >
          Close
         </button>
         </div>

       </div>
   </div>
 </div>
</div>
<hr className="horizontal-line" />
<ThreeTabs/>
    </div>
  );
}
