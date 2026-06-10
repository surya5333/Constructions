import { SiteNav } from '../components/projects/SiteNav';
import ImmersiveServices from '../components/ImmersiveServices';
import '../styles/services.css';

export default function Services() {
  return (
    <div className="services-page" style={{ background: '#0B0B0B' }}>
      <SiteNav />
      <ImmersiveServices />
    </div>
  );
}
