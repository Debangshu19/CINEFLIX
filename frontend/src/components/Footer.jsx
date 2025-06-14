const Footer = () => {
	return (
		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				<div className='text-center md:text-left'>
					<p className='text-sm leading-loose text-muted-foreground'>
						Built by{" "}
						<a
							href='https://www.linkedin.com/in/debangshudey'
							target='_blank'
							className='font-medium underline underline-offset-4'
							rel='noopener noreferrer'
						>
							Debangshu Dey
						</a>
					</p>
					<p className='text-xs text-gray-500 mt-1'>
						⚠️ This is a personal project using the TMDB API for educational purposes. Not affiliated with Netflix, Prime, or any official OTT platform.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
