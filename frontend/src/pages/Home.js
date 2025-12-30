import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import background images
import background1 from '../pictures/backgroundImage/background1.jpg';
import background2 from '../pictures/backgroundImage/background2.jpg';
import background3 from '../pictures/backgroundImage/background3.jpg';
import background4 from '../pictures/backgroundImage/background4.jpg';
import say1 from '../pictures/childrenImage/say1.png';
import say2 from '../pictures/childrenImage/say2.png';
import say3 from '../pictures/childrenImage/say3.png';
import say4 from '../pictures/childrenImage/say4.png';
import say5 from '../pictures/childrenImage/say5.png';
import say6 from '../pictures/childrenImage/say6.png';
import say7 from '../pictures/childrenImage/say7.png';
import say8 from '../pictures/childrenImage/say8.png';
import say9 from '../pictures/childrenImage/say9.png';

// ...existing code...
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { useTranslation } from 'react-i18next';

function Home() {
	const { t } = useTranslation();
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
			image: say1,
		},
		{
			id: 2,
			image: say2,
		},
		{
			id: 3,
			image: say3,
		},
		{
			id: 4,
			image: say4,
		},
		{
			id: 5,
			image: say5,
		},
		{
			id: 6,
			image: say6,
		},
		{
			id: 7,
			image: say7,
		},
		{
			id: 8,
			image: say8,
		},
		{
			id: 9,
			image: say9,
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
					minHeight: { xs: '75vh', md: '95vh' },
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
					<Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, px: { xs: 1, sm: 2 } }}>
						<Card
							sx={{
								maxWidth: { xs: '100%', sm: 540, md: 600 },
								minHeight: { xs: 0, md: 300 },
								p: { xs: 3, md: 4 },
								textAlign: 'left',
								backgroundColor: 'rgba(255,255,255,0.95)',
								borderRadius: { xs: 2, md: 3 },
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
								{t('hero.title')}
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
								{t('hero.subtitle')}
							</Typography>
							<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
								<Button
									component={RouterLink}
									to='/our-efforts'
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
									{t('hero.cta')}
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
						{t('impact.title')}
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
									{t('impact.children')}
								</Typography>
								<Typography variant='body2' sx={{ color: '#666' }}>
									{t('impact.childrenDesc')}
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
									{t('impact.continents')}
								</Typography>
								<Typography variant='body2' sx={{ color: '#666' }}>
									{t('impact.continentsDesc')}
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
									{t('impact.funds')}
								</Typography>
								<Typography variant='body2' sx={{ color: '#666' }}>
									{t('impact.fundsDesc')}
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
						{t('testimonials.title')}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: { xs: 1.5, md: 2 },
							flexWrap: 'wrap',
						}}
					>
						<IconButton
							onClick={handlePrevTestimonial}
							sx={{
								backgroundColor: '#34582B',
								color: 'white',
								'&:hover': { backgroundColor: '#5a7a1f' },
								width: { xs: 40, sm: 44, md: 48 },
								height: { xs: 40, sm: 44, md: 48 },
								flexShrink: 0,
							}}
						>
							<ArrowBackIosIcon />
						</IconButton>

						{/* Testimonial Card */}
						<Card
							sx={{
								width: '100%',
								maxWidth: { xs: '100%', md: 900 },
								minHeight: { xs: 260, md: 300 },
								p: { xs: 2.5, md: 4 },
								backgroundColor: '#ffffff',
								borderRadius: 2,
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								border: '1px solid #e0e0e0',
							}}
						>
							{(() => {
								const len = testimonials.length;
								const indices = [currentTestimonial, (currentTestimonial + 1) % len, (currentTestimonial + 2) % len];
								return (
									<Box
										sx={{
											display: 'grid',
											gridTemplateColumns: {
												xs: '1fr',
												sm: 'repeat(2, 1fr)',
												md: 'repeat(3, 1fr)',
											},
											gap: { xs: 2, md: 3 },
											alignItems: 'stretch',
										}}
									>
										{indices.map((idx) => (
											<Box
												key={idx}
												sx={{
													width: '100%',
													height: { xs: 200, sm: 220, md: 260 },
													backgroundColor: '#f0f0f0',
													borderRadius: 1,
													overflow: 'hidden',
												}}
											>
												<img
													src={testimonials[idx].image}
													alt={testimonials[idx].name}
													style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
												/>
											</Box>
										))}
									</Box>
								);
							})()}
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
								width: { xs: 40, sm: 44, md: 48 },
								height: { xs: 40, sm: 44, md: 48 },
								flexShrink: 0,
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
						{t('cta.title')}
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
						{t('cta.subtitle')}
					</Typography>
					<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
						<Button
							component={RouterLink}
							to='/contact'
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
							{t('cta.contactButton')}
						</Button>
					</Box>
				</Container>
			</Box>

			<SiteFooter />
		</Box>
	);
}

export default Home;
