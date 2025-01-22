import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div
			className='min-h-screen bg-cover bg-center divide-opacity-20 flex flex-col w-screen justify-center items-center text-white'
			style={{ backgroundImage: `url('/bg cover.jpg')` }}
		>
			<header className='absolute top-0 divide-opacity-20 left-0 p-4   '>
				<Link to={"/"}>
					<img src='/header logo png.png' alt='watchit' className=' w-52' />
				</Link>
			</header>
			<main className='text-center mt-11 border-black error-page--content z-10'>
			<h1 className='text-7xl font-semibold mb-4'>Oops! Wrong turn.</h1>
				<p className='mb-6 text-xl'>
				We couldn't find that page. Check out the WATCHit™ home page for amazing content.
				</p>
				<Link to={"/"} className='bg-white text-black py-2 px-4 rounded'>
				WATCHit™ Home
				</Link>
			</main>
		</div>
	);
};
export default NotFoundPage;
