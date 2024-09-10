import React from 'react'
import Tables from '../../../../../../components/Tables';

import { data2 } from '../materialReturn/data2';
import { data22 } from '../materialReturn/data2.1';



function MaterialReturn() {

       // for accessing object keys
       const getHeadings3 = () => {
        return Object.keys(data2[0]);
      };
      const getHeadings4 = () => {
        return Object.keys(data22[0]);
      };
  
  return (
    <div className='mat-reci'>
    
          <div className="row">
            <div className="col-md-6 table-data" style={{ height: "300px", overflowY: "scroll" }}>
         <Tables theadData={getHeadings3()} tbodyData={data2}/>

            </div>
            <div className="col-md-6 table-data" style={{ height: "300px", overflowY: "scroll" }}>
         <Tables theadData={getHeadings4()} tbodyData={data22}/>

            </div>
         
        </div>
        
    </div>
  )
}

export default MaterialReturn