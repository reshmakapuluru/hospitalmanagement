import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAddBedsMutation, useGetHospitalDetailsByIdQuery, useLazyGetAllHospitalsQuery, useLazyGetHospitalDetailsByIdQuery } from '../../services/hospApi'
import _ from 'lodash';
import axios from 'axios';
import { bedTypes } from '../../constants';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();

function HospitalDetails() {
    var p = useParams()
    console.log(p)
   var {isLoading,data} =  useGetHospitalDetailsByIdQuery(p.id)
   var [updateBeds] = useAddBedsMutation()
   var [getHospitalDetails]=useLazyGetHospitalDetailsByIdQuery();
   console.log(data)
   var [beds,setbeds] = React.useState(null)
   var [bedTypes,setbedTypes] = React.useState([])
   var [selectedBed,setselectedBed] = React.useState(-1)
   useEffect(()=>{
    if(data){
        var bedsByCategory = _.groupBy(data.beds,"bedtype");
        console.log(bedsByCategory)
        setbeds(bedsByCategory)
        var temp = []
        for(var k in bedsByCategory){
           // console.log(k)
           temp.push(k)
           
        }
        setbedTypes([...temp])

    }
   },[data])
   function occupyBed(bid){
    console.clear();
    console.log(data)
    setselectedBed(bid)
    var tempBeds = data.beds;
    tempBeds=tempBeds.map((bed)=>{
        if(bed.bedId===bid){
            return {...bed,bedStatus:'occupied'}
        }
        else{
            return bed;
        }
        

    })
    console.log("tempBeds::",tempBeds)
    var bedsByCategory = _.groupBy(tempBeds,"bedtype");
    setbeds(bedsByCategory)
    //data=JSON.parse(JSON.stringify({...data,beds:[...tempBeds]}))
    //setbeds([...tempBeds])
   }
   function updateHospital(){

    const auth = getAuth();
    console.log(auth)
    signInWithPopup(auth,provider)
    .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user

        console.clear();
        console.log(beds)
        console.log(token)
        console.log(user)

        var temp = Object.values(beds).flat(1)
        temp = temp.map((b)=>{
            if(b.bedId===selectedBed){
                return {...b,patients:[...b.patients,{useremail:user.email,token:user.accessToken}]}

            }
            else{
                return b
            }

        })
        data = {...data,beds:[...temp]}
        //console.log(temp)
        console.log(data)
        updateBeds(data).then(()=>{
        alert("Update Success")
        getHospitalDetails(p.id);
    })
}).catch((error)=>{
    console.log(error)
})


    
    
   }
  return (
    <div>
        <h1>HospitalDetails</h1>
        {
            isLoading && ("Please wait")
        }
        {
           !isLoading && (
            <div>
                <h1>{data.hospitalName.toUpperCase()}</h1>
                <ul>
                    {
                        bedTypes.map((t)=>{
                            return <li>
                                       {t}-{beds[t].length}
                                       <br />
                                       {
                                        beds[t].map((bed)=>{
                                            return (
                                                <>
                                                {bed.bedStatus==='open' && <i class="bi bi-clipboard h-3 m-2" onClick={()=>{occupyBed(bed.bedId)}}></i>}
                                                {bed.bedStatus==='occupied' && <i class="bi bi-clipboard-fill h-3 m-2" onClick={()=>{occupyBed(bed.bedId)}}></i>}
                                                

                                                </>
                                            ) 
                                        })
                                       }
                                </li>

                        })
                    }
                </ul>
                <button className='btn btn-primary' onClick={()=>{updateHospital()}}>Book IT</button>
            </div>
           )
        }
    </div>
  )
}

export default HospitalDetails