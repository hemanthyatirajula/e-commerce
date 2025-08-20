import React,{useState} from 'react'
import './CSS/login_signup.css'
export const LoginSignup = () => {
const[state,setState] = useState("Login")
const [formData,setformData] = useState({
  username:"",
  password:"",
  email:""
})


const changeHandler = (e)=>{
   setformData({...formData,[e.target.name]:e.target.value})
}

const login = async () => {
  console.log("Login Function Executed", formData);
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // ✅ Store token in localStorage
      localStorage.setItem('auth-token', data.token);

      // ✅ Redirect or success message
      alert("✅ Login Successful");
      window.location.replace("/");
    } else {
      alert("❌ " + data.errors);
    }

  } catch (error) {
    alert("Something went wrong during login");
    console.error("Login Error:", error);
  }
};


const signup = async () => {
  try {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.name,
        email: formData.email,
        password: formData.password
      }),
    });

    const data = await response.json();

    if (data.success) {
      // ✅ Save token in localStorage
      localStorage.setItem('auth-token', data.token);

      // ✅ Redirect or show success
      alert("✅ Signup Successful");
      window.location.replace("/");
    } else {
      alert("❌ " + data.errors);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error("Signup Error:", error);
  }
};




 return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="login-signup-field">
       {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
        <input  name='email' value={formData.email} onChange={changeHandler}  type="email" placeholder='Enter Email'/>
        <input  name='password' value={formData.password} onChange={changeHandler}  type="password" placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup() }}>Continue</button>
        {state==="Sign Up"?<p className='loginsignup-login'>Already have an Account<span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className='loginsignup-login'>Create an Account<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
       
        <div className="loginsignup-agree">
          <input type="checkbox" name=''id='' />
          <p>By continuing,I agree the terms and conditions</p>
        </div>
      </div>
    </div>
  )
}
export default LoginSignup