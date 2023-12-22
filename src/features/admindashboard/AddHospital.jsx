import React from 'react'
import { Formik } from 'formik'; 
import { bedTypes } from '../../constants';
import { useAddHospitalMutation } from '../../services/hospApi';

function AddHospital() {
    var [newbedtype,setnewbedtype] = React.useState({
        bedType:'',
        price:0
    })
    var [addedBedTypes,setaddedBedTypes] = React.useState([])
    var[addHospital]=useAddHospitalMutation()

    function addBedType(){
       setaddedBedTypes([...addedBedTypes,newbedtype])
    }
  return (
    <div className='border border-2 border-success m-2 p-2'>
        <h1>AddHospital</h1>
        <Formik
        initialValues={
            { 
                hospitalName: '',
                image: '',
                area: '',
                reviews: [],
                bedTypes: [],
                beds: []
            }
        }
       onSubmit={(values)=>{
        values.bedTypes=[...addedBedTypes]
        addHospital(values).then((res)=>{
            console.log("res:",res)
        })
        //console.log("new hospital",values)
        
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input type="text" name="hospitalName" placeholder='Enter Hospital Name' onChange={handleChange} onBlur={handleBlur} value={values.hospitalName}/><br /><br />
           <input type="text" name="image" placeholder='Enter Image URL' onChange={handleChange} onBlur={handleBlur}value={values.image}/><br /><br />
           <input type="text" name="area" placeholder='Enter Hospital Location' onChange={handleChange} onBlur={handleBlur} value={values.area}/><br /><br />
            {
                addedBedTypes.length>0 && <h5>Selected BedTypes</h5>
            }
            {
                addedBedTypes.length>0 && addedBedTypes.map((a)=>{
                    return <li>
                        <b>{a.bedType}</b>:
                        <i>{a.price}</i>
                    </li>

                })
            }
           


           <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add bed type to Hospital</button><br /><br />
           <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add bed type with price</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label>Select Bed type</label>
                    <select name="" id="" onChange={(e)=>{setnewbedtype({...newbedtype,bedType:e.target.value})}}>
                        <option value={null} disabled selected>Please Select</option>
                        {
                            bedTypes.map((bedtype)=>{
                                return <option value={bedtype}>{bedtype}</option>

                            })
                        }
                    </select><br /><br />
                    <label htmlFor="">Set The Price</label>
                    <input type="text" placeholder='Enter the price' onChange={(e)=>{setnewbedtype({...newbedtype,price:e.target.value})}} />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{addBedType(values)}}>Add bed type</button>
                </div>
                    
                </div>

            </div>

           </div>
           <button type="submit" disabled={isSubmitting} className='btn btn-success'>Submit</button><br /><br />

         </form>
       )}
     </Formik>
    </div>
)
}
export default AddHospital