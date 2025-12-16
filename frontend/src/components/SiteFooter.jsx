import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function SiteFooter() {
	return (
		<Box component='footer' sx={{ backgroundColor: '#ffffff', borderTop: '1px solid #ddd', mt: 0 }}>
			<Container maxWidth='lg'>
				<Box
					sx={{
						py: 10,
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						justifyContent: 'space-between',
						gap: 3,
					}}
				>
					<Typography variant='body2' sx={{ color: '#34582B' }}>
						© {new Date().getFullYear()} Little Green Leaves. All rights reserved.
					</Typography>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<MuiLink component={RouterLink} to='/' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							Home
						</MuiLink>
						<MuiLink component={RouterLink} to='/our-efforts' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							Our Efforts
						</MuiLink>
						<MuiLink component={RouterLink} to='/about' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							About
						</MuiLink>
						<MuiLink component={RouterLink} to='/contact' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							Contact
						</MuiLink>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
