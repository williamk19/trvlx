import React from "react";
import { Head } from "@inertiajs/inertia-react";
import NavbarLandingPage from '@/Components/LandingPage/NavbarLandingPage';
import HeroLandingPage from '@/Components/LandingPage/HeroLandingPage';
import FooterLandingPage from '@/Components/LandingPage/FooterLandingPage';
import BenefitsLandingPage from '@/Components/LandingPage/BenefitsLandingPage';
import TravelPackageLandingPage from '@/Components/LandingPage/TravelPackageLandingPage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Welcome(props) {
  return (
    <div data-theme='light' className='min-h-screen flex flex-col justify-top items-center'>
      <Head title="Travel Booking System" />
      <NavbarLandingPage auth={props.auth} />
      <HeroLandingPage />
      <BenefitsLandingPage />
      <TravelPackageLandingPage />
      <FooterLandingPage />
    </div>
  );
}
