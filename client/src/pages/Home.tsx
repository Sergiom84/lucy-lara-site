import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import BookingImproved from "@/components/BookingImproved";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="font-inter text-textDark bg-neutral">
      <Helmet>
        <title>Centro de Estética Lucy Lara Madrid | Tratamientos Faciales y Corporales</title>
        <meta name="description" content="Centro de estética en Madrid Villaverde. Tratamientos faciales, depilación láser, micropigmentación, presoterapia. Más de 15 años de experiencia. ¡Reserva ya!" />
        <meta property="og:title" content="Centro de Estética Lucy Lara Madrid | Tratamientos Faciales y Corporales" />
        <meta property="og:description" content="Centro de estética en Madrid Villaverde. Tratamientos faciales, depilación láser, micropigmentación, presoterapia. Más de 15 años de experiencia." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo-lucylara.png" />
        <meta property="og:url" content="https://centroesteticalucylara.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Header />
      <Hero />
      <Welcome />
      <Services />
      <Products />
      <Testimonials />
      <BookingImproved />
      <Footer />
    </div>
  );
};

export default Home;
