import React from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../pictures/logo.jpg';

export default function SiteHeader() {
	return (
		<Box sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ddd' }}>
			<Container maxWidth='lg'>
				<Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2, gap: 4 }}>
					<Box component={RouterLink} to='/' sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
						<Box
							component='img'
							src={logo}
							alt='Little Green Leaves Logo'
							sx={{ height: 40, width: 40, mr: 1, borderRadius: 1, objectFit: 'contain' }}
						/>
						<Typography variant='h5' sx={{ color: '#34582B', fontWeight: 'bold' }}>
							Little Green Leaves
						</Typography>
					</Box>

					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, ml: 'auto' }}>
						<Button component={RouterLink} to='/' sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}>
							Home
						</Button>
						<Button
							component={RouterLink}
							to='/our-efforts'
							sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}
						>
							Our Efforts
						</Button>
						<Button
							component={RouterLink}
							to='/about'
							sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}
						>
							About Us
						</Button>
						<Button
							variant='contained'
							sx={{
								backgroundColor: '#34582B',
								color: '#fff',
								textTransform: 'none',
								px: 4,
								py: 1,
								borderRadius: 1,
								'&:hover': { backgroundColor: '#5a7a1f' },
							}}
						>
							Join Us
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
