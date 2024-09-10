import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MaterialRecipt from './materialRecipt/MaterialReceipt';
import MaterialReturn from './materialReturn/MaterialReturn';
import MaterialStockPositionTab from './materialStockPosition/MaterialStockPositionTab';


function MainTable() {
 
    return (
      <Tabs
        id="controlled-tab-example"
        
        className="mb-3 mt-3 tab_font"
        >
            
        <Tab eventKey="mat_rece"  title="Material Receipts">              
            <MaterialRecipt/>
        </Tab>
            
        <Tab eventKey="mat_retu" title="Material Return">
             <MaterialReturn/>
        </Tab>

        <Tab eventKey="mat_st_posi" title="Material Stock Position">
             <MaterialStockPositionTab/>
        </Tab>
       
      </Tabs>
    );
  }
  
  export default MainTable;