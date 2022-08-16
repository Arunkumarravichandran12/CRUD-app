import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';



function App(){
  const [firstName,setfirstName]= useState("");
  const [lastName,setlastName]= useState("");
  const [location,setlocation]= useState("");
  const [email,setemail]= useState("");
  const [dob,setdob]= useState(0);
  const [date,setdate]= useState(0);
  const [month,setmonth]= useState(0);
  const [year,setyear]= useState(0);

  const [education,seteducation]= useState("");
  const [about,setabout]= useState("");

  const getList = () =>{
    axios.get('http:/localhost:3001/studentsManagement').then((res)=>{
      console.log(res.data);
    })
   }

//  const change = ()=>{
 
//    setdob((date+"/"+month+"/"+year));
//    }
  
  const handleSubmit = ()=>{
    axios.post("http://localhost:3001/create",{
      firstName:firstName,
      lastName:lastName,
      location:location,
      email:email,
      date:date,
      month:month,
      year:year,
      education:education,
      about:about
     
    });
    
    
    
  
  }
    
  return(
    <>
    <div className='information'>
      <h1 >WELCOME {firstName}!</h1>
      <form onSubmit={handleSubmit}>
         <label>First Name &nbsp;:</label>
          <input type="text"  name='firstName' onChange={(e)=> setfirstName(e.target.value)}  required/>
          
          <label style={{textAlign:'right',width:'200px'}}>LastName &nbsp;:</label> 
          <input type="text" style={{height:'20px',flex:'0 0 200px',marginLeft:'20px'}} name='lastName' onChange={(e)=> setlastName(e.target.value)} required/>
           <br></br>
           <br></br>
          <label>Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
           <input type="text" name='location' onChange={(e)=> setlocation(e.target.value)} required/>
          <br></br>
          <br></br>
          <label>Email&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;:</label> 
          <input type="email" name='email' onChange={(e)=> setemail(e.target.value)} required/>
          <br></br>
          <br></br>
          
          
           <div type="number" name="dob">
          <label>DOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input type="number"  placeholder='DD' name='date' style={{width:'40px',textAlign:'right'}} maxLength={2}  onChange={(e)=>
             {const limit=2; setdate(e.target.value.slice(0,limit));}}  required/>
          <input type="number" placeholder='MM' name='month'  style={{width:'40px',marginLeft:'20px',textAlign:'right'}} maxLength={2} onChange={(e)=>
            {const limit=2; setmonth(e.target.value.slice(0,limit));}} required/>
          <input type="number" placeholder='YY' name='year'  style={{width:'40px',marginLeft:'20px',textAlign:'right'}} maxLength={4} onChange={(e)=>
            {const limit=4; setyear(e.target.value.slice(0,limit));} } required/>
          
        </div> 
          
          <br></br>
          <br></br>
          <label>Education&nbsp; &nbsp;&nbsp;:</label>
          <input type="text" name='education' onChange={(e)=> seteducation(e.target.value)} required />
          <br></br>
          <br></br>
          <label>About&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input type="text" name='about' style={{height:'100px'}} onChange={(e)=> setabout(e.target.value)}/> 
          <br></br>
          <br></br>
           <button type="submit"  >SUBMIT</button>
           
      </form>
    </div>
    </>
  )
}


ReactDOM.render(<App />,document.getElementById('root'));

