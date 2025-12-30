import React, { useState } from 'react';
import { Box, Container, Button, Typography, IconButton, Drawer, Divider, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../pictures/logo.jpg';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function SiteHeader() {
	const { t, i18n } = useTranslation();
	const [open, setOpen] = useState(false);
	const toggleLanguage = () => {
		const next = i18n.language === 'en' ? 'cn' : 'en';
		i18n.changeLanguage(next);
		try {
			window.localStorage.setItem('lng', next);
		} catch {}
	};

	const closeMenu = () => setOpen(false);
	const navItems = [
		{ to: '/', label: t('nav.home') },
		{ to: '/our-efforts', label: t('nav.ourEfforts') },
		{ to: '/about', label: t('nav.about') },
		{ to: '/contact', label: t('nav.contact') },
	];
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
							{t('app.title')}
						</Typography>
					</Box>

					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, ml: 'auto', alignItems: 'center' }}>
						<Button component={RouterLink} to='/' sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}>
							{t('nav.home')}
						</Button>
						<Button
							component={RouterLink}
							to='/our-efforts'
							sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}
						>
							{t('nav.ourEfforts')}
						</Button>
						<Button
							component={RouterLink}
							to='/about'
							sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}
						>
							{t('nav.about')}
						</Button>
						<Button
							component={RouterLink}
							to='/contact'
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
							{t('nav.contact')}
						</Button>
						<Button onClick={toggleLanguage} sx={{ color: '#34582B', textTransform: 'none', fontSize: '16px' }}>
							{t('nav.langToggle')}
						</Button>
					</Box>

					<IconButton
						onClick={() => setOpen(true)}
						sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', color: '#34582B' }}
						aria-label='Open menu'
					>
						<MenuIcon />
					</IconButton>
				</Box>
			</Container>
			<Drawer anchor='right' open={open} onClose={closeMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
				<Box sx={{ width: 280, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography variant='h6' sx={{ color: '#34582B', fontWeight: 'bold' }}>
							{t('app.title')}
						</Typography>
						<IconButton onClick={closeMenu} aria-label='Close menu' sx={{ color: '#34582B' }}>
							<CloseIcon />
						</IconButton>
					</Box>
					<Divider />
					<Stack spacing={1.5}>
						{navItems.map((item) => (
							<Button
								key={item.to}
								component={RouterLink}
								to={item.to}
								onClick={closeMenu}
								sx={{ justifyContent: 'flex-start', color: '#34582B', textTransform: 'none', fontSize: '16px' }}
							>
								{item.label}
							</Button>
						))}
					</Stack>
					<Divider sx={{ my: 1 }} />
					<Button
						onClick={() => {
							toggleLanguage();
							closeMenu();
						}}
						sx={{ alignSelf: 'flex-start', color: '#34582B', textTransform: 'none', fontSize: '16px' }}
					>
						{t('nav.langToggle')}
					</Button>
				</Box>
			</Drawer>
		</Box>
	);
}
