import React from 'react'
import Tables from '../../../../../../components/Tables';
import { data1 } from '../materialRecipt/data1';
import { data11 } from '../materialRecipt/data11';


function MaterialRecipt() {

    const getHeadings1 = () => {
        return Object.keys(data1[0]);
      };
      const getHeadings2 = () => {
        return Object.keys(data11[0]);
      };

  return (
    <div className='mat-reci'>
    
        <div className="ip-box">
          <div className="row">
            <div className="col-md-6 table-data" style={{ height: "300px", overflowY: "scroll" }}>
         <Tables theadData={getHeadings1()} tbodyData={data1}/>

            </div>
            <div className="col-md-6 table-data" style={{ height: "300px", overflowY: "scroll" }}>
         <Tables theadData={getHeadings2()} tbodyData={data11}/>

            </div>
         </div>
         
        </div>
        
    </div>
  )
}

export default MaterialRecipt