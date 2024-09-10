import React, { useState,useEffect } from 'react';
import Table from "react-bootstrap/Table";

export default function ProfileList() {  

  return (
    <div className='row mt-1'>
    <div>
     <div style={{height:"430px",overflowY: "scroll",marginLeft:"-20px"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>sd</th>
           <th>Drawing/PartName</th>
           <th>Operation</th>
           <th>Material</th>
           <th>MtrlGrade</th>
           <th>Thickness</th>
           <th>Qty</th>
         </tr>
       </thead>


     <tbody>
          <tr>
             <td>1</td>
             <td>TEST-CUST-DWG-1</td>
            <td>Laser Cutting Nitrogen</td>
            <td>Mid Steel</td>
            <td>4130</td>
            <td>12.00</td>
            <td>200</td>
         </tr>
       </tbody>
 </Table>
     </div>

 </div>
</div>
  )
}
