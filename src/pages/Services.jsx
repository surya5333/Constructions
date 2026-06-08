import Navbar from '../components/Navbar'
import ServicesSection from '../components/ServicesSection'

export default function Services() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#fff' }}>
        <ServicesSection />
      </div>
    </>
  )
}
