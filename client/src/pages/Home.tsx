import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="font-inter text-textDark bg-neutral">
      <Helmet>
        <title>Centro de Belleza y Bienestar - Beauty&Wellness</title>
        <meta name="description" content="Descubre nuestros tratamientos de belleza y bienestar. Reserva tu cita online y déjate mimar por nuestro equipo de profesionales." />
        <meta property="og:title" content="Centro de Belleza y Bienestar - Beauty&Wellness" />
        <meta property="og:description" content="Tratamientos de belleza y bienestar de alta calidad. Reserva tu cita online." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" />
        <meta property="og:url" content="https://beautywellness.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Header />
      <Hero />
      <Welcome />
      <Services />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  );
};

export default Home;
