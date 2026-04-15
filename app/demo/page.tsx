import { DemoDashboard } from '@/components/demo-dashboard';
import { PageChrome } from '@/components/page-chrome';
import { constellations, fragments } from '@/lib/demo-data';

export default function DemoPage() {
  return (
    <PageChrome
      eyebrow="Demo Mode"
      title="Rediscovery feed"
      subtitle="A seeded judging experience that turns scattered fragments into meaningful constellations, then helps the user decide what to do with what comes back."
    >
      <DemoDashboard initialFragments={fragments} constellationList={constellations} />
    </PageChrome>
  );
}
