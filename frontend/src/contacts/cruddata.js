import React, { useState,useEffect } from 'react'
import  { Link,useNavigate} from 'react-router-dom';

export default function Cruddata(props) {
     
     const url = 'http://localhost:8000/contactlist/';
     const [empdata,empchange] = useState(null);
     const navigation = useNavigate();
     const loadcontent = (id)=>{
        navigation('/userDetails/empdata/'+id);
     }
     const deletecontent = (id)=>{
       
        if(window.confirm("Do you want to delete")){
            fetch(url + id,{
            method:"DELETE"
            }).then((res)=>{
                alert('Record Deleted');
                navigation('/userDetails');
               window.location.reload(false)
            }).catch((err)=>{
                console.log(err);
            })
           }
        }
     useEffect(()=>{
        fetch(url).then((res)=>{
        return res.json(); 
        })
        .then((res)=>{
            empchange(res);
            console.log(empdata);
        }).catch((err)=>{
            console.log(err);
        })
   
    },[])
  return (
    <div>
      <div className='row mx-5'>
        <div className='container'>
            <div className='card'>
                <div className='card-title my-2'>
                    <h3>Xeno Contact List</h3>
                </div>
                
                <div className='card-body my-2'>
                <Link to="/userDetails/empadd" className='btn btn-success mb-3 mx-3'>Add New</Link>
                <table className='table table-bordered '>
                    <thead className='bg-primary text-white'>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {empdata &&
                        empdata.map(item=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td><a onClick={()=>loadcontent(item.id)} className='btn btn-dark m-1'>Edit</a>
                                <a onClick={()=>deletecontent(item.id)} className='btn btn-danger'>Delete</a>
                                </td>
                            </tr>
                        )) 
                    }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}