import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactoSection from './components/ContactoSection';

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
