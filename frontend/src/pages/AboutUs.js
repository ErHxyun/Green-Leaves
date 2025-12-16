import React from 'react';
import { Box, Container, Grid, Stack, Typography, Divider, Link } from '@mui/material';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import orgImage from '../pictures/About_Us.jpg';
import leaderImage from '../pictures/leader.jpg';

export default function AboutUs() {
	return (
		<Box sx={{ backgroundColor: '#f5f7f1', minHeight: '100vh' }}>
			<SiteHeader />
			<Container maxWidth='lg' sx={{ py: { xs: 6, md: 10 } }}>
				<Stack spacing={10}>
					<Box>
						<Typography
							variant='h4'
							sx={{ color: '#2f4b2f', fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}
						>
							About Little Green Leaves
						</Typography>
						<Typography variant='subtitle1' sx={{ color: '#4f5d3d', mb: 4, lineHeight: 1.6 }}>
							Established in 2016, the Little Green Leaves Volunteers began with a simple yet profound wish: to ensure
							that left-behind children in rural areas are not just fed and clothed, but also understood and cherished.
						</Typography>
						<Grid container spacing={6} alignItems='center'>
							<Grid item xs={12} md={5}>
								<Box
									component='img'
									src={orgImage}
									alt='Little Green Leaves team supporting students'
									sx={{ width: '100%', borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', objectFit: 'cover' }}
								/>
							</Grid>
							<Grid item xs={12} md={7}>
								<Stack spacing={2}>
									<Typography variant='h5' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										Our organization
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										In our early days, we mobilized communities to donate used books and clothing, establishing library
										corners in village schools and orphanages. As we grew—catalyzed by the PBIC competition and our
										resilience during the pandemic—we launched the "Green Leaves Dream Platform" initiative. This marked
										our evolution from providing material aid to nurturing the soul.
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										Over the past decade, countless acts of kindness have converged here. What started as a student
										initiative has grown into a trusted platform of love. We have channeled nearly 800,000 RMB in
										charitable support, facilitating long-term, one-on-one sponsorships for over 140 impoverished and
										"left-behind" children. For us, these are not just numbers; they represent the young lives
										illuminated by hope. With a founding team rooted in Psychology, Little Green Leaves Volunteer
										understands that for left-behind children, emotional isolation is often harder to bear than material
										poverty. Our core mission is to protect their mental health and well-being.
									</Typography>
									<Typography variant='h5' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										Virtual Connections
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										Through online lectures and interactions, we break the physical barriers of the mountains and
										broaden the children's horizons.
									</Typography>
									<Typography variant='h5' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										On-Site Camps
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										During holidays, our volunteers travel to the mountains to host camps. Through real hugs and
										face-to-face interaction, we send a clear message to every child: You are never forgotten.
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8, fontWeight: 'bold' }}>
										We are "Green Leaves Volunteers"—a symbol of growth and promise. Join us in protecting the dreams of
										children in the mountains.
									</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Box>

					<Divider sx={{ borderColor: '#ccd4c2' }} />

					<Box>
						<Grid container spacing={6} alignItems='center'>
							<Grid item xs={12} md={7}>
								<Stack spacing={2}>
									<Typography variant='h4' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										Meet our leader
									</Typography>
									<Typography variant='subtitle1' sx={{ color: '#2f4b2f', fontWeight: 'bold' }}>
										<Link
											href='https://www.linkedin.com/in/yining-wang-9abb2724a/'
											target='_blank'
											rel='noopener noreferrer'
											sx={{ color: '#2f4b2f', textDecorationColor: '#2f4b2f' }}
										>
											Wang Yining
										</Link>
									</Typography>
									<Typography variant='body2' sx={{ color: '#2f4b2f', fontStyle: 'italic' }}>
										Founder, Little Green Leaves Organization
									</Typography>
									<Typography variant='body2' sx={{ color: '#2f4b2f', mb: 1 }}>
										B.A. in Psychology and Data Science, University of North Carolina at Chapel Hill (UNC)
									</Typography>
									<Typography variant='body1' sx={{ color: '#2f2f2f', lineHeight: 1.8 }}>
										Inspired by a dream that began in 2016, Wang Yining founded Little Green Leaves. As a psychology
										student at the University of North Carolina at Chapel Hill (UNC), he integrates his academic
										training into philanthropy and advocates for a dual approach: supporting both material needs and
										emotional well-being. Over nearly a decade, he has led the team from book and clothing drives to a
										mature one-to-one sponsorship system—providing companionship and psychological care to help
										left-behind children in remote mountain areas build a bridge to a wider world.
									</Typography>
								</Stack>
							</Grid>
							<Grid item xs={12} md={5}>
								<Box
									component='img'
									src={leaderImage}
									alt='Portrait of our founder and leader'
									sx={{ width: '100%', borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', objectFit: 'cover' }}
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
