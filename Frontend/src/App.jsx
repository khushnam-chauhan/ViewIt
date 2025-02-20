import { Routes, Route, Navigate  } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import { useEffect } from 'react';
import {Loader} from "lucide-react";



function App() {
  const { user,isCheckingAuth,authCheck } = useAuthStore();
  console.log("auth user:", user);

  useEffect(() =>{
    authCheck();
  },[authCheck] 
  ); if(isCheckingAuth) {
    return (
      <div className='h-screen'>
        <Loader className='animate-spin h-screen text-pink-700 size-10' />
      </div>
    )
  }
   

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to={"/"} />} />

      <Route path="/signup" element={ !user ? <SignUpPage /> : <Navigate to={"/"} />} />
      
      <Route path='/watch/:id' element={  <WatchPage /> } />
     
      <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
      <Route path='/history' element={  <SearchHistoryPage /> } />
      <Route path='/*' element={<NotFoundPage />} />

    </Routes>
     <Toaster/>
     </>
  );
}

export default App;
