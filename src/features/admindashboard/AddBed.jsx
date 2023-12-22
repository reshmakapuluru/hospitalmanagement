import React, { useEffect, useState } from 'react'
import { useAddBedsMutation, useGetAllHospitalsQuery } from '../../services/hospApi'

function AddBed() {
    var {isLoading:isHospitalsLoading,data:hospitals} = useGetAllHospitalsQuery()
    var [addBedsToDB] = useAddBedsMutation()
   // console.log(hospitals)
    //console.log(isHospitalsLoading)
   // var [newbed,setnewbed] = React.useState({
       
   var [selectedHospital,setselectedHospital] = React.useState(null)
   var [bedcount,setbedcount] = React.useState(0)
   var [bedprice,setbedprice] = React.useState(0)
   var [selectedBedType,setSelectedBedType] = React.useState('')


    var [bedTypes,setbedtypes] = React.useState([])

    

  //  useEffect(()=>{
   //     console.log("selectedhos",selectedHospital)
    //},[selectedHospital])
    function saveBed(){
        var newbeds = []
        //console.log("selectedHospital::",selectedHospital)
        //console.log("selectedHospital::",selectedHospital.beds.filter(b=>b.bedtype===selectedBedType).length)
        var numBeds=selectedHospital.beds.filter(b=>b.bedtype===selectedBedType).length;
         for(var i=0;i<=bedcount-1;i++){
             var newBed = { 
            bedStatus:'open',
            bedtype:selectedBedType,
            bedprice,
            patients:[],
            bedId:`${selectedBedType+(numBeds+i+1)}`
        }
        newbeds.push(newBed)

        }
        var latestHospitalDetails = {...selectedHospital,beds:[...selectedHospital.beds,...newbeds]}
        setselectedHospital({...selectedHospital,beds:[...selectedHospital.beds,...newbeds]})
       console.log(selectedHospital)
        addBedsToDB(latestHospitalDetails)
    }
   
  return (
    <div className='border border-2 border-success m-2 p-2'>
        <h1>AddBed</h1>
        <>
        {
            isHospitalsLoading && (<b>...Loading</b>)
        }
        {
            !isHospitalsLoading && <select name="" id="" onChange={(e)=>{setselectedHospital(JSON.parse(e.target.value))}}>
                <option value={null} disabled selected>Please Select</option>
                {
                    hospitals.map((hospital)=>{
                        return <option value={JSON.stringify(hospital)}>{hospital.hospitalName}</option>
                    })
                }
                
            </select>
            
        }<br/><br />
        </>
        {
            selectedHospital && selectedHospital.bedTypes.length>0 && (
                <>
                <select onChange={(e)=>{setSelectedBedType(e.target.value)}}>
                    <option value={null} disabled selected>Please Select</option>
                    {
                         selectedHospital.bedTypes.map((bt)=>{
                            return <option value={bt.bedType}>{bt.bedType}</option>
                        })
                    }
                </select>&nbsp;&nbsp;&nbsp;
                <input type="number" placeholder='Enter bed count' onChange={(e)=>{setbedcount(e.target.value)}}/>&nbsp;&nbsp;&nbsp;
                <input type="text" placeholder='Enter bed price' onChange={(e)=>{setbedprice(e.target.value)}}/><br /><br />
                </>
                
            )
        }
        <br />
        <button type="button" class="btn btn-success" onClick={()=>{saveBed()}}>Save Beds</button>
        </div>
  )
}

export default AddBed