import React from "react";
import { Head } from "@inertiajs/inertia-react";
import NavbarLandingPage from '@/Components/NavbarLandingPage';
import HeroLandingPage from '@/Components/LandingPage/HeroLandingPage';
import FooterLandingPage from '@/Components/LandingPage/FooterLandingPage';
import BenefitsLandingPage from '@/Components/LandingPage/BenefitsLandingPage';

export default function Welcome(props) {
  return (
    <div data-theme='light' className='min-h-screen flex flex-col justify-top items-center'>
      <Head title="Travel Booking System" />
      <NavbarLandingPage />
      <HeroLandingPage />
      <BenefitsLandingPage />
      <FooterLandingPage />
    </div>
  );
}
