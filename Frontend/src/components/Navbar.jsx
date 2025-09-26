import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";


const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

		const handleRefresh = () => {
		  window.location.reload(); // This will reload the page
		};

     const {setContentType}= useContentStore();
	 

	return (
		<header className='max-w-24xl mx-auto flex flex-wrap items-center justify-between p-2 h-16'>
			<div onClick={handleRefresh} className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<h1 class="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-teal-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
  ViewIt
</h1>
				</Link>

				{/* desktop navbar items */}
				<div className='hidden sm:flex gap-2 items-center'>
					<Link to='/' className='hover:underline text-x0' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline text-x0' onClick={() => setContentType("tv")} >
						TV Shows
					</Link>
					<Link to='/history' className='hover:underline text-x0'>
						Search History
					</Link>
				</div>
			</div>

			<div className='flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-8 cursor-pointer  '  />
				</Link>
				<img src={user?.image || '/avatar1.jpg'} alt='Avatar' title="Profile" className='h-12 rounded-3xl cursor-pointer w-12' />
				<LogOut className='size-7 cursor-pointer ' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-8 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>

			{/* mobile navbar items */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded  border-gray-800'>
					<Link to={"/"} className='block hover:underline p-2' onClick={() => {
    toggleMobileMenu(); 
    setContentType("movie");
  }} >
						Movies
					</Link>
					<Link to={"/"} className='block hover:underline p-2'onClick={() => {
    toggleMobileMenu(); 
    setContentType("tv");
  }}>
						TV Shows
					</Link>
					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Search History
					</Link>
				</div>
			)}
		</header>
		
	);
};
export default Navbar;
