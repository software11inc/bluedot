import { StaticImageData } from "next/image";

// Import advisor images
import alexSimpson from "@/app/assets/advisors/Alex_Simpson.png";
import arielBoyman from "@/app/assets/advisors/Ariel_Boyman.png";
import arjunArora from "@/app/assets/advisors/Arjun_Arora.png";
import asheetMehta from "@/app/assets/advisors/Asheet_Mehta.png";
import ashwinShirvaikar from "@/app/assets/advisors/Ashwin_Shirvaikar.png";
import brianHughes from "@/app/assets/advisors/Brian_Hughes.png";
import ciaraBurnham from "@/app/assets/advisors/Ciara_Burnham.png";
import colinWalsh from "@/app/assets/advisors/Colin_Walsh.png";
import davidBoehmer from "@/app/assets/advisors/David_Boehmer.png";
import harveyHudes from "@/app/assets/advisors/Harvey_Hudes.png";
import jamesPeterson from "@/app/assets/advisors/James_Peterson.png";
import jeffHolland from "@/app/assets/advisors/Jeff_Holland.png";
import kirkChapman from "@/app/assets/advisors/Kirk_Chapman.png";
import marshallLux from "@/app/assets/advisors/Marshall_Lux.png";
import michaelHeller from "@/app/assets/advisors/Michael_Heller.png";
import mikeLincoln from "@/app/assets/advisors/Mike_Lincoln.png";
import milesReidy from "@/app/assets/advisors/Miles_Reidy.png";
import oliverGoldstein from "@/app/assets/advisors/Oliver_Goldstein.png";
import philGoldfeder from "@/app/assets/advisors/Phil_Goldfeder.png";
import princetonGraham from "@/app/assets/advisors/Princeton_Graham.png";
import sanjaySachdev from "@/app/assets/advisors/Sanjay_Sachdev.png";
import stephenMugford from "@/app/assets/advisors/Stephen_Mugford.png";
import tomBrown from "@/app/assets/advisors/Tom_Brown.png";
import triciaKemp from "@/app/assets/advisors/Tricia_Kemp.png";

export interface Advisor {
  name: string;
  title: string;
  image: StaticImageData;
  bio: string;
  logos: string[];
  linkedin: string;
  speciality: string;
}

export const advisors: Advisor[] = [
  { name: "Alex Simpson", title: "Advisor", image: alexSimpson, bio: "", logos: [], linkedin: "", speciality: "Payments" },
  { name: "Ariel Boyman", title: "Advisor", image: arielBoyman, bio: "", logos: [], linkedin: "", speciality: "Payments" },
  { name: "Arjun Arora", title: "Advisor", image: arjunArora, bio: "", logos: [], linkedin: "", speciality: "Lending" },
  { name: "Asheet Mehta", title: "Advisor", image: asheetMehta, bio: "", logos: [], linkedin: "", speciality: "Lending" },
  { name: "Ashwin Shirvaikar", title: "Advisor", image: ashwinShirvaikar, bio: "", logos: [], linkedin: "", speciality: "Banking" },
  { name: "Brian Hughes", title: "Advisor", image: brianHughes, bio: "", logos: [], linkedin: "", speciality: "Banking" },
  { name: "Ciara Burnham", title: "Advisor", image: ciaraBurnham, bio: "", logos: [], linkedin: "", speciality: "Wealth Tech" },
  { name: "Colin Walsh", title: "Advisor", image: colinWalsh, bio: "", logos: [], linkedin: "", speciality: "Wealth Tech" },
  { name: "David Boehmer", title: "Advisor", image: davidBoehmer, bio: "", logos: [], linkedin: "", speciality: "Insurance" },
  { name: "Harvey Hudes", title: "Advisor", image: harveyHudes, bio: "", logos: [], linkedin: "", speciality: "Insurance" },
  { name: "James Peterson", title: "Advisor", image: jamesPeterson, bio: "", logos: [], linkedin: "", speciality: "Crypto" },
  { name: "Jeff Holland", title: "Advisor", image: jeffHolland, bio: "", logos: [], linkedin: "", speciality: "Crypto" },
  { name: "Kirk Chapman", title: "Advisor", image: kirkChapman, bio: "", logos: [], linkedin: "", speciality: "Payments" },
  { name: "Marshall Lux", title: "Advisor", image: marshallLux, bio: "", logos: [], linkedin: "", speciality: "Lending" },
  { name: "Michael Heller", title: "Advisor", image: michaelHeller, bio: "", logos: [], linkedin: "", speciality: "Banking" },
  { name: "Mike Lincoln", title: "Advisor", image: mikeLincoln, bio: "", logos: [], linkedin: "", speciality: "Wealth Tech" },
  { name: "Miles Reidy", title: "Advisor", image: milesReidy, bio: "", logos: [], linkedin: "", speciality: "Insurance" },
  { name: "Oliver Goldstein", title: "Advisor", image: oliverGoldstein, bio: "", logos: [], linkedin: "", speciality: "Crypto" },
  { name: "Phil Goldfeder", title: "Advisor", image: philGoldfeder, bio: "", logos: [], linkedin: "", speciality: "Payments" },
  { name: "Princeton Graham", title: "Advisor", image: princetonGraham, bio: "", logos: [], linkedin: "", speciality: "Lending" },
  { name: "Sanjay Sachdev", title: "Advisor", image: sanjaySachdev, bio: "", logos: [], linkedin: "", speciality: "Banking" },
  { name: "Stephen Mugford", title: "Advisor", image: stephenMugford, bio: "", logos: [], linkedin: "", speciality: "Wealth Tech" },
  { name: "Tom Brown", title: "Advisor", image: tomBrown, bio: "", logos: [], linkedin: "", speciality: "Insurance" },
  { name: "Tricia Kemp", title: "Advisor", image: triciaKemp, bio: "", logos: [], linkedin: "", speciality: "Crypto" },
];

export const specialities = ["All", "Payments", "Lending", "Banking", "Wealth Tech", "Insurance", "Crypto"];
