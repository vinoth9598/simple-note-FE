import React from 'react';
import '../style/login.css';

function LoginForm({loginData,setLoginData,setToken,token,user,setUser,setIsRegistered,isRegistered}) {

  const handleLogin = async(e)=>{
    e.preventDefault();

    console.log("logging in user...");
    const response = await fetch('http://localhost:3001/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(loginData)
    });

    const data = await response.json();

    if(response.status == 200){
      console.log("user logged in successfully");
      console.log(data);
      setLoginData({
        username:"",
        password:""
      });

      setToken(data.token);
      setUser(data);

      window.localStorage.setItem('user',JSON.stringify(data));
      window.localStorage.setItem('token',data.token);
    }else{
      console.log("error to logging user");
      console.log(data);
    }
  }
  
  return (
    <div className='login'>
       <div>
          <h3>Blogs and Notes </h3>
          <form className='form' onSubmit={handleLogin}>
              <div className='row w-75 '>
                  <input
                      type="email"
                      placeholder='Enter your username'
                      value={loginData.username}
                      onChange={(e)=>setLoginData({...loginData, username:e.target.value})}
                      required
                  />
              </div>
              <div className='row w-75'>
                  <input
                    type="password"
                    placeholder='Enter your password'
                    value={loginData.password}
                    onChange={(e)=> setLoginData({...loginData, password:e.target.value})}
                    required
                  />
              </div>
              <button className='bn bn-success w-25' type="submit">Login</button>
          </form>
       </div>
       <p className='fw-semibold fs-3 mx-5 '>Not Registered <button className='bn bn-success w-25 mx-2' onClick={()=>setIsRegistered(false)}>register</button></p>
    </div>
  )
}

export default LoginForm;
