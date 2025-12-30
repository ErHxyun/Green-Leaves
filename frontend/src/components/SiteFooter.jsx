import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SiteFooter() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

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
						{t('footer.copyright', { year })}
					</Typography>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<MuiLink component={RouterLink} to='/' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							{t('footer.links.home')}
						</MuiLink>
						<MuiLink component={RouterLink} to='/our-efforts' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							{t('footer.links.ourEfforts')}
						</MuiLink>
						<MuiLink component={RouterLink} to='/about' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							{t('footer.links.about')}
						</MuiLink>
						<MuiLink component={RouterLink} to='/contact' underline='none' sx={{ color: '#34582B', fontSize: 14 }}>
							{t('footer.links.contact')}
						</MuiLink>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
