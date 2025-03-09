import React, { useEffect, useState } from 'react';
import RegisterForm from './Component/RegisterForm';
import LoginForm from './component/LoginForm';
import LoggedInPage from './Component/LoggedInPage';
import './style/app.css';

function App() {

  const [registerData,setRegisterData] = useState({
    username:"",name:"",password:""
  });

  const [loginData,setLoginData] = useState({
    username:"",password:""
  });

  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);

  const [isRegistered,setIsRegistered] = useState(false);

  useEffect(()=>{
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');
    if(user && token){
      setUser(JSON.parse(user));
      setToken(token);
    }
  },[])

  return (
    <div>
          <div className='bg-light text-success'>
              <h1>Notes Application</h1>
          </div>
          <div>
            {user ? (
              <LoggedInPage
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
              />
              
            ):(
              isRegistered ? (
                <LoginForm
                  loginData={loginData}
                  setLoginData={setLoginData}
                  setToken={setToken}
                  token={token}
                  setUser={setUser}
                  user={user}
                  setIsRegistered={setIsRegistered}
                  isRegistered={isRegistered}
                />

                ):(
                <RegisterForm
                  registerData={registerData}
                  setRegisterData={setRegisterData}
                  setIsRegistered={setIsRegistered}
                  isRegistered={isRegistered}
                />

              )
            )
            
            }

        </div>
         
    </div>
  )
}

export default App;
