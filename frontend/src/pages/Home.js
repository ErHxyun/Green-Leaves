import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import background images
import background1 from '../pictures/backgroundImage/background1.jpg';
import background2 from '../pictures/backgroundImage/background2.jpg';
import background3 from '../pictures/backgroundImage/background3.jpg';
import background4 from '../pictures/backgroundImage/background4.jpg';
import childImage1 from '../pictures/childrenImage/childImage1.jpg';
import childImage2 from '../pictures/childrenImage/childImage2.jpg';
import childImage3 from '../pictures/childrenImage/childImage3.jpg';
import childImage4 from '../pictures/childrenImage/childImage4.jpg';
import childImage5 from '../pictures/childrenImage/childImage5.jpg';
// ...existing code...
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

function Home() {
	// State for testimonial carousel
	const [currentTestimonial, setCurrentTestimonial] = useState(0);

	// State for background image crossfade
	const [currentBackground, setCurrentBackground] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [fadeOpacity, setFadeOpacity] = useState(1);

	// Background images array
	const backgroundImages = [background1, background2, background3, background4];

	// Sample testimonial data
	const testimonials = [
		{
			id: 1,
			name: 'Li Wei',
			location: 'Rural China',
			text: "Little Green Leaves helped me get the education I dreamed of. Now I'm studying engineering at university and want to give back to my community.",
			image: childImage1,
		},
		{
			id: 2,
			name: 'Amara Ochieng',
			location: 'Kenya',
			text: "Thanks to the mobile library program, our village children now have access to hundreds of books. It's transformed our community's approach to learning.",
			image: childImage2,
		},
		{
			id: 3,
			name: 'Zhang Ming',
			location: 'China',
			text: "The scholarship program allowed me to continue my studies when my family couldn't afford it. I'm now a teacher helping other children in need.",
			image: childImage3,
		},
		{
			id: 4,
			name: 'Grace Wanjiku',
			location: 'Kenya',
			text: 'Little Green Leaves built a school in our village. Seeing my daughter learn to read and write fills my heart with joy and hope for her future.',
			image: childImage4,
		},
		{
			id: 5,
			name: 'Chen Xiaoli',
			location: 'China',
			text: 'The educational support I received changed my life completely. From a rural village to university graduate - this is the power of education.',
			image: childImage5,
		},
	];

	// Navigation functions
	const handleNextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
	};

	const handlePrevTestimonial = () => {
		setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	// Auto-slide effect - switches every 10 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 10000); // 10 seconds

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [testimonials.length]);

	// Smoother crossfade background image transition
	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);
			setFadeOpacity(0);
			// Animate opacity to 0, then swap images and fade back in
			setTimeout(() => {
				setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
				setFadeOpacity(1);
				setIsTransitioning(false);
			}, 600);
		}, 5000);
		return () => clearInterval(interval);
	}, [currentBackground, backgroundImages.length]);

	return (
		<Box sx={{ minHeight: '100vh', backgroundColor: '#e8e8e8', pb: 8 }}>
			<SiteHeader />

			{/* Section 1: Hero Section with Smoother Crossfade Background */}
			<Box
				sx={{
					position: 'relative',
					minHeight: '95vh',
					display: 'flex',
					alignItems: 'center',
					borderBottom: '2px solid #CCCCCC',
					overflow: 'hidden',
				}}
			>
				{/* Current background image */}
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: 1,
						backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImages[currentBackground]})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						opacity: fadeOpacity,
						transition: 'opacity 0.8s ease-in-out, transform 0.3s ease',
						transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
					}}
				/>
				<Container maxWidth='lg' sx={{ position: 'relative', zIndex: 2 }}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Card
							sx={{
								maxWidth: 600,
								minHeight: 300,
								p: 4,
								textAlign: 'left',
								backgroundColor: 'rgba(255,255,255,0.95)',
								borderRadius: 2,
								boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Typography
								variant='h5'
								sx={{
									fontWeight: 'bold',
									color: '#34582B',
									mb: 3,
									fontSize: { xs: '1.8rem', md: '2.2rem' },
								}}
							>
								Welcome to Little Green Leaves
							</Typography>
							<Typography
								variant='body1'
								sx={{
									color: '#34582B',
									mb: 4,
									lineHeight: 1.6,
									fontSize: '16px',
								}}
							>
								Where we raise funds and support children's dreams of education and brighter futures in rural
								communities across China and Kenya
							</Typography>
							<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
								<Button
									variant='contained'
									sx={{
										backgroundColor: '#34582B',
										color: '#fff',
										px: 3,
										py: 1.5,
										textTransform: 'none',
										borderRadius: 1,
										fontWeight: 'bold',
										'&:hover': { backgroundColor: '#5a7a1f' },
									}}
								>
									Learn More
								</Button>
								<Button
									variant='outlined'
									sx={{
										borderColor: '#999',
										color: '#34582B',
										px: 3,
										py: 1.5,
										textTransform: 'none',
										borderRadius: 1,
										'&:hover': { borderColor: '#666', backgroundColor: '#f9f9f9' },
									}}
								>
									Join Us
								</Button>
							</Box>
						</Card>
					</Box>
				</Container>
			</Box>

			<Box
				sx={{
					backgroundColor: '#ffffff',
					py: 8,
					borderBottom: '2px solid #CCCCCC',
				}}
			>
				<Container maxWidth='lg'>
					<Typography
						variant='h3'
						sx={{
							textAlign: 'center',
							fontWeight: 'bold',
							color: '#34582B',
							mb: 6,
							fontSize: { xs: '2rem', md: '2.5rem' },
						}}
					>
						Our Impact
					</Typography>
					<Grid container spacing={4} justifyContent='center'>
						<Grid item xs={4} sm={4} md={4}>
							<Card
								sx={{
									width: 280,
									height: 200,
									backgroundColor: '#ffffff',
									borderRadius: 2,
									boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
									border: '1px solid #e0e0e0',
									p: 3,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
									mx: 'auto',
								}}
							>
								<Typography variant='h4' sx={{ color: '#34582B', fontWeight: 'bold', mb: 1 }}>
									132
								</Typography>
								<Typography variant='h6' sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
									Children Supported
								</Typography>
								<Typography variant='body2' sx={{ color: '#666' }}>
									Students receiving educational support across rural communities
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							<Card
								sx={{
									width: 280,
									height: 200,
									backgroundColor: '#ffffff',
									borderRadius: 2,
									boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
									border: '1px solid #e0e0e0',
									p: 3,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
									mx: 'auto',
								}}
							>
								<Typography variant='h4' sx={{ color: '#34582B', fontWeight: 'bold', mb: 1 }}>
									3
								</Typography>
								<Typography variant='h6' sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
									Continents
								</Typography>
								<Typography variant='body2' sx={{ color: '#666' }}>
									Making our efforts to support children from China, Kenya, and Middle East
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							<Card
								sx={{
									width: 280,
									height: 200,
									backgroundColor: '#ffffff',
									borderRadius: 2,
									boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
									border: '1px solid #e0e0e0',
									p: 3,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
									mx: 'auto',
								}}
							>
								<Typography variant='h4' sx={{ color: '#34582B', fontWeight: 'bold', mb: 1 }}>
									$88,000+
								</Typography>
								<Typography variant='h6' sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
									Funds Raised
								</Typography>
								<Typography variant='body2' sx={{ color: '#666' }}>
									Total donations directed toward education initiatives
								</Typography>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box
				sx={{
					backgroundColor: '#EEEEEE',
					py: 8,
					borderBottom: '2px solid #CCCCCC',
				}}
			>
				<Container maxWidth='lg'>
					<Typography
						variant='h3'
						sx={{
							textAlign: 'center',
							fontWeight: 'bold',
							color: '#34582B',
							mb: 6,
							fontSize: { xs: '2rem', md: '2.5rem' },
						}}
					>
						What People Say
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
						<IconButton
							onClick={handlePrevTestimonial}
							sx={{
								backgroundColor: '#34582B',
								color: 'white',
								'&:hover': { backgroundColor: '#5a7a1f' },
								width: 48,
								height: 48,
							}}
						>
							<ArrowBackIosIcon />
						</IconButton>

						{/* Testimonial Card */}
						<Card
							sx={{
								minWidth: 800,
								minHeight: 300,
								p: 4,
								backgroundColor: '#ffffff',
								borderRadius: 2,
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								border: '1px solid #e0e0e0',
							}}
						>
							<Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
								<Box
									sx={{
										width: 200,
										height: 300,
										backgroundColor: '#c0c0c0',
										borderRadius: 1,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexShrink: 0,
										overflow: 'hidden',
									}}
								>
									<img
										src={testimonials[currentTestimonial].image}
										alt={testimonials[currentTestimonial].name}
										style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
									/>
								</Box>
								<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
									<Typography variant='h6' sx={{ color: '#34582B', fontWeight: 'bold', mb: 2 }}>
										{testimonials[currentTestimonial].name}
									</Typography>
									<Typography variant='subtitle1' sx={{ color: '#666', mb: 3, fontStyle: 'italic' }}>
										{testimonials[currentTestimonial].location}
									</Typography>
									<Typography variant='body1' sx={{ color: '#333', lineHeight: 1.6, fontSize: '16px' }}>
										"{testimonials[currentTestimonial].text}"
									</Typography>
								</Box>
							</Box>
							{/* Dots indicator */}
							<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
								{testimonials.map((_, index) => (
									<Box
										key={index}
										sx={{
											width: 8,
											height: 8,
											borderRadius: '50%',
											backgroundColor: index === currentTestimonial ? '#34582B' : '#ccc',
											cursor: 'pointer',
										}}
										onClick={() => setCurrentTestimonial(index)}
									/>
								))}
							</Box>
						</Card>

						{/* Right Arrow Button */}
						<IconButton
							onClick={handleNextTestimonial}
							sx={{
								backgroundColor: '#34582B',
								color: 'white',
								'&:hover': { backgroundColor: '#5a7a1f' },
								width: 48,
								height: 48,
							}}
						>
							<ArrowForwardIosIcon />
						</IconButton>
					</Box>
				</Container>
			</Box>
			<Box
				sx={{
					backgroundColor: '#34582B',
					width: '100vw',
					marginLeft: 'calc(-50vw + 50%)',
					py: 12,
					textAlign: 'center',
					color: '#ffffff',
					borderBottom: '2px solid #CCCCCC',
				}}
			>
				<Container maxWidth='lg'>
					<Typography
						variant='h3'
						sx={{
							fontWeight: 'bold',
							mb: 3,
							fontSize: { xs: '2rem', md: '2.5rem' },
						}}
					>
						Join the Little Green Leaves Movement
					</Typography>
					<Typography
						variant='h6'
						sx={{
							mb: 4,
							fontWeight: 'normal',
							opacity: 0.95,
							fontSize: '18px',
						}}
					>
						Be part of the change. Together we can help more children to read realize their dreams.
					</Typography>
					<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
						<Button
							variant='contained'
							sx={{
								backgroundColor: '#ffffff',
								color: '#6b8e23',
								px: 4,
								py: 1.5,
								textTransform: 'none',
								borderRadius: 1,
								fontWeight: 'bold',
								'&:hover': { backgroundColor: '#f5f5f5' },
							}}
						>
							Join Us
						</Button>
					</Box>
				</Container>
			</Box>

			<SiteFooter />
		</Box>
	);
}

export default Home;
