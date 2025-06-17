import Navbar from '@/components/Navbar';
import ContactoSection from './components/ContactoSection';

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col flex-grow bg-gradient-to-b from-white to-blue-50">
        <ContactoSection />
      </main>
    </>
  );
}
