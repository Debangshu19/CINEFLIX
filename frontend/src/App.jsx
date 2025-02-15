import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import SearchHistoryPage from './pages/SearchHistoryPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './store/AuthUser';
import { Loader } from 'lucide-react';
import { Navigate } from 'react-router-dom';

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />}/>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />

        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} ></Route>
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} ></Route>
        <Route path='/*' element={<NotFoundPage />}></Route>
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;