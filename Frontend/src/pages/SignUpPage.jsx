import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { useAuthStore } from '../store/authUser';

const SignUpPage = () => {
const [ email, setEmail] = useState("");
const [ username, setUsername] = useState("");
const [ password, setPassword] = useState("");

const{ signup } = useAuthStore();

const handleSignup = (e) => {
  e.preventDefault();
  signup({email, username, password});
}
  return (
 
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <header className='max-w-6xl mx-auto flex itmes-center justify-between p-1'>
          <Link to ={"/"}>
          <img src='/header logo png.png' alt='back' className='w-22 ml-1 ' title='Back to homepage' />
          </Link>
        </header>
        
        
        <h1 style={styles.heading}>Signup</h1>
       
        <form   onSubmit={handleSignup}>
         
          <input type="text" style={styles.inputField} placeholder="John Doe" required 
          id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
         
          <input type="email" style={styles.inputField} placeholder="you@gmail.com" required 
          id='email'  value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <input type="password" style={styles.inputField} placeholder="Enter your password" required  id='password'  value={password} onChange={(e) => setPassword(e.target.value)} />
          
          <button type="submit" style={styles.submitBtn}>signup</button>
        </form>
        <div className='text-centre text-gray-400 mt-1'> Already have an account?
         <Link to={"/login"} className='text-pink-500 hover:underline'>Log in
         </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    width: '100vw', // Fixed the typo 'weidth' to 'width'
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(authbg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center', // Ensures the background image is centered
    backgroundRepeat: 'no-repeat', // Prevents the background from repeating
  },
  loginContainer: {
    background: 'rgba(0, 0, 0, 0.6)', // Darker background with transparency
    borderRadius: '15px',
    backdropFilter: 'blur(15px)', // Increased blur effect for dark glassmorphism
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)', // Darker shadow for a deeper effect
    width: '300px',
    textAlign: 'center',
    color: '#fff', // White text for contrast
  },
  heading: {
    fontSize: '30px',
    marginBottom: '20px',
    color: '#fff', // White text for heading
  },
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid rgba(255, 255, 255, 0.3)', // Light border with some transparency
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light input background for better visibility
    color: '#fff', // White text for input fields
    fontSize: '16px',
  },
  submitBtn: {
    width: '100%',
    
    padding: '12px',
    backgroundColor: '#CC3366', // Orange button to stand out
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default SignUpPage;
