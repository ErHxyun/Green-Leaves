import TreeOfGrowthTimeline from '../components/TreeOfGrowthTimeline';

// Page wrapper now simply renders the timeline component
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function OurEffortsSection() {
	const { t } = useTranslation();
	return (
		<div style={{ background: '#FAFAF5' }}>
			<SiteHeader />
			<Container maxWidth='lg' style={{ paddingTop: 24, paddingBottom: 8 }}>
				<Typography variant='h4' style={{ color: '#2f4b2f', fontWeight: 'bold' }}>
					{t('efforts.title')}
				</Typography>
			</Container>
			<TreeOfGrowthTimeline />
			<SiteFooter />
		</div>
	);
}
