import React from 'react'
import { Form } from 'react-bootstrap'

export default function UnitDetailsForm() {
  return (
    <div>
        <div>
            <Form className="form mt-4" >
             <div className="ip-box form-bg">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4 mb-2 col-sm-12">
                    <label className='form-label'>Unit Id</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="text" placeholder="Unit Id" style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>  
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-5  mb-2 col-sm-12">
                    <label className='form-label'>GST No</label>
                    </div>
                    <div className="col-md-7  mb-2 col-sm-12">
                    <input class="form-control" type="text" style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>               
              </div> 


              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4  mb-2 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Unit Name</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="text" placeholder="Unit Name" style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>  
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-5  mb-2 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap",fontSize:'17px'}}>Tally Account Name</label>
                    </div>
                    <div className="col-md-7  mb-2 col-sm-12">
                    <input class="form-control" type="text" style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>               
              </div>


              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4  mb-2 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Unit Address</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px",height:"150px"}}/>
                    </div>
                  </div>
                </div>  
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-5  mb-2 col-sm-12">
                    <label className='form-label'>Current</label>
                    </div>
                    <div className="col-md-7  mb-2 col-sm-12">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5  mb-2 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Cash In Hand</label>
                    </div>
                    <div className="col-md-7  mb-2 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5  mb-2 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Mail Id</label>
                    </div>
                    <div className="col-md-7  mb-2 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Unit Initials</label>
                    </div>
                    <div className="col-md-7 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>               
              </div>


               <div className="row">
                <div className="col-md-6  col-sm-12">
                  <div className="row">
                    <div className="col-md-4 mb-2 col-sm-12">
                    <label className='form-label'>Place</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>                
              </div>  

               <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4  mb-2  col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Pin Code</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="number"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>                
              </div> 

               <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4  mb-2 col-sm-12">
                    <label className='form-label'>State</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>                
              </div> 

              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4  mb-2 col-sm-12">
                    <label className='form-label'>Country</label>
                    </div>
                    <div className="col-md-8  mb-2 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>                
              </div> 
               
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-4 col-sm-12">
                    <label className='form-label' style={{whiteSpace:"nowrap"}}>Contact Details</label>
                    </div>
                    <div className="col-md-8 col-sm-12">
                    <input class="form-control" type="text"  style={{fontSize:"13px",borderRadius:"0",width:"230px"}}/>
                    </div>
                  </div>
                </div>                
              </div>
             </div>              
            </Form>
        </div>
    </div>
  )
}
