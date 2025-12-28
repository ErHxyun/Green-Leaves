import React from 'react';
import { Box, Container, Grid, Stack, Typography, Card } from '@mui/material';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import wechatQr from '../pictures/officialQR.jpg';
import contactQr from '../pictures/contactQR.jpg';
import { useTranslation } from 'react-i18next';

const WECHAT_QR_SRC = wechatQr;
const CONTACT_QR_SRC = contactQr;

export default function JoinUs() {
	const { t } = useTranslation();
	return (
		<Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7f1' }}>
			<SiteHeader />
			<Container maxWidth='md' sx={{ py: { xs: 6, md: 10 } }}>
				<Stack spacing={4}>
					<Box textAlign='center'>
						<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#2f4b2f', mb: 1 }}>
							{t('contact.title')}
						</Typography>
						<Typography variant='body1' sx={{ color: '#2f2f2f', maxWidth: 640, mx: 'auto', lineHeight: 1.6 }}>
							{t('contact.intro')}
						</Typography>
					</Box>

					<Grid container spacing={3} justifyContent='center'>
						{[
							{
								title: t('contact.cards.wechat.title'),
								src: WECHAT_QR_SRC,
								description: t('contact.cards.wechat.desc'),
							},
							{
								title: t('contact.cards.contact.title'),
								src: CONTACT_QR_SRC,
								description: t('contact.cards.contact.desc'),
							},
						].map((item) => (
							<Grid item xs={12} sm={6} key={item.title}>
								<Card
									sx={{
										p: 3,
										textAlign: 'center',
										backgroundColor: '#ffffff',
										borderRadius: 2,
										boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
										border: '1px solid #e0e6d8',
									}}
								>
									<Typography variant='h6' sx={{ fontWeight: 'bold', color: '#2f4b2f', mb: 2 }}>
										{item.title}
									</Typography>
									<Box
										component='img'
										src={item.src}
										alt={`${item.title} QR code`}
										sx={{
											width: '100%',
											maxWidth: 280,
											borderRadius: 1,
											border: '1px solid #d6dec9',
											boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
											objectFit: 'contain',
											backgroundColor: '#fafcf7',
											p: 1,
											mx: 'auto',
											mb: 2,
										}}
									/>
									<Typography variant='body2' sx={{ color: '#2f2f2f', lineHeight: 1.6 }}>
										{item.description}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Stack>
			</Container>
			<SiteFooter />
		</Box>
	);
}
