import TreeOfGrowthTimeline from '../components/TreeOfGrowthTimeline';

// Page wrapper now simply renders the timeline component
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function OurEffortsSection() {
	return (
		<div style={{ background: '#FAFAF5' }}>
			<SiteHeader />
			<TreeOfGrowthTimeline />
			<SiteFooter />
		</div>
	);
}
