import React from 'react';
import { Box, Container, Grid, Stack, Typography, Divider, Link } from '@mui/material';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import orgImage from '../pictures/About_Us.jpg';
import leaderImage from '../pictures/leader.jpg';
import { useTranslation } from 'react-i18next';
import developerImage from '../pictures/developer.jpg';

export default function AboutUs() {
	const { t } = useTranslation();
	return (
		<Box sx={{ backgroundColor: '#f5f7f1', minHeight: '100vh' }}>
			<SiteHeader />
			<Container maxWidth='lg' sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, sm: 3 } }}>
				<Stack spacing={10}>
					<Box>
						<Typography
							variant='h4'
							sx={{ color: '#2f4b2f', fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}
						>
							{t('about.title')}
						</Typography>
						<Typography variant='subtitle1' sx={{ color: '#4f5d3d', mb: 4, lineHeight: 1.6 }}>
							{t('about.intro')}
						</Typography>
						<Grid container spacing={{ xs: 4, md: 6 }} alignItems='center'>
							<Grid item xs={12} md={5}>
								<Box
									component='img'
									src={orgImage}
									alt='Little Green Leaves team supporting students'
									sx={{
										width: '100%',
										borderRadius: 2,
										boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
										objectFit: 'cover',
										maxHeight: { xs: 260, md: '100%' },
										objectPosition: 'center',
									}}
								/>
							</Grid>
							<Grid item xs={12} md={7}>
								<Stack spacing={{ xs: 1.5, md: 2 }}>
									<Typography variant='h5' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										{t('about.orgTitle')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										{t('about.orgP1')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										{t('about.orgP2')}
									</Typography>
									<Typography variant='h5' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										{t('about.virtualTitle')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										{t('about.virtualP1')}
									</Typography>
									<Typography variant='h5' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										{t('about.campTitle')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										{t('about.campP1')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8, fontWeight: 'bold' }}>
										{t('about.closing')}
									</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Box>

					<Divider sx={{ borderColor: '#ccd4c2' }} />

					<Box>
						<Grid container spacing={{ xs: 4, md: 6 }} alignItems='center'>
							<Grid item xs={12} md={7}>
								<Stack spacing={{ xs: 1.5, md: 2 }}>
									<Typography variant='h4' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										{t('about.leaderTitle')}
									</Typography>
									<Typography variant='subtitle1' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										<Link
											href='https://www.linkedin.com/in/yining-wang-9abb2724a/'
											target='_blank'
											rel='noopener noreferrer'
											sx={{ color: '#2f4b2f', textDecorationColor: '#2f4b2f' }}
										>
											{t('about.leaderName')}
										</Link>
									</Typography>
									<Typography variant='body2' sx={{ color: '#2f4b2f', fontStyle: 'italic' }}>
										{t('about.leaderRole')}
									</Typography>
									<Typography variant='body2' sx={{ color: '#2f4b2f', mb: 1 }}>
										{t('about.leaderEdu')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										{t('about.leaderBio')}
									</Typography>
								</Stack>
							</Grid>
							<Grid item xs={12} md={5}>
								<Box
									component='img'
									src={leaderImage}
									alt='Portrait of our founder and leader'
									sx={{
										width: '100%',
										borderRadius: 2,
										boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
										objectFit: 'cover',
										maxHeight: { xs: 260, md: '100%' },
										objectPosition: 'center',
									}}
								/>
							</Grid>
						</Grid>
					</Box>

					<Divider sx={{ borderColor: '#ccd4c2' }} />

					<Box>
						<Grid container spacing={{ xs: 4, md: 6 }} alignItems='center'>
							<Grid item xs={12} md={7}>
								<Stack spacing={{ xs: 1.5, md: 2 }}>
									<Typography variant='h4' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										{t('about.devTitle')}
									</Typography>
									<Typography variant='subtitle1' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										<Link
											href='https://www.linkedin.com/in/xiyunhu-unc/'
											target='_blank'
											rel='noopener noreferrer'
											sx={{ color: '#2f4b2f', textDecorationColor: '#2f4b2f' }}
										>
											{t('about.devName')}
										</Link>
									</Typography>
									<Typography variant='body2' sx={{ color: '#2f4b2f', fontStyle: 'italic' }}>
										{t('about.devRole')}
									</Typography>
									<Typography variant='body2' sx={{ color: '#2f4b2f', mb: 1 }}>
										{t('about.devEdu')}
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										{t('about.devBio')}
									</Typography>
								</Stack>
							</Grid>
							<Grid item xs={12} md={5}>
								<Box
									component='img'
									src={developerImage}
									alt='Portrait of our developer'
									sx={{
										width: '100%',
										borderRadius: 2,
										boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
										objectFit: 'cover',
										maxHeight: { xs: 260, md: '100%' },
										objectPosition: 'center',
									}}
								/>
							</Grid>
						</Grid>
					</Box>
				</Stack>
			</Container>
			<SiteFooter />
		</Box>
	);
}
