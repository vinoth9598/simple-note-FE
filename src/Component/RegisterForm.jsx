import React from 'react';
import '../style/register.css';

function RegisterForm({registerData,setRegisterData,setIsRegistered,isRegistered}) {


  const handleRegister = async(e)=>{
    e.preventDefault();

    const registerBody={
      username:registerData.username,
      name:registerData.name,
      password:registerData.password
    };

    const response = await fetch('https://simple-note-be.onrender.com/users',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(registerBody)
    });

    const data = await response.json();

    if(response.status === 200){
      console.log("user created successfully");
      console.log(data);
      setRegisterData({
        username:"",
        name:"",
        password:""
      });
      setIsRegistered(true)
    }else{
      console.log("Error creating user");
      console.log(data);
    }
  }

  return (
    <div className='register'>
        <h3 className='fw-semibold bg-info '>Register </h3>
        <div className='form'>
          <form onSubmit={handleRegister} className='item-form'>
              <div className='row w-75'>
                  <input
                    type="email"
                    placeholder = "Enter your email.."
                    value={registerData.username}
                    onChange={(e)=> setRegisterData({...registerData, username:e.target.value})}
                    required
                  />
              </div>
              <div className="row w-75">
                  <input
                    type="text"
                    placeholder='Enter your name'
                    value={registerData.name}
                    onChange={(e)=>setRegisterData({...registerData, name:e.target.value})}
                    required
                  />
              </div>
              <div className='row w-75'>
                  <input
                    type="password"
                    placeholder='Enter your password'
                    value={registerData.password}
                    onChange={(e)=>setRegisterData({...registerData, password:e.target.value})}
                    required
                  />
              </div>
            
             <button className='btn btn-primary  w-25 ' type="submit">Register</button>
             
          </form>
        </div>
        
        <p className='fw-semibold fs-3 mb-2 mx-5'>Already register <button className='btn btn-primary mx-3 w-25 ' onClick={()=>setIsRegistered(true)}>login</button></p>
    </div>
  )
}

export default RegisterForm;
