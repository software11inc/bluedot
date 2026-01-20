import { StaticImageData } from "next/image";

// Import dinner images - Bilt Dinner
import biltMain from "@/app/assets/dinners/Bilt Dinner/main-bilt.webp";
import bilt008 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 008.webp";
import bilt009 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 009.webp";
import bilt011 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 011.webp";
import bilt013 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 013.webp";
import bilt026 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 026.webp";
import bilt061 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 061.webp";
import bilt083 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 083.webp";
import bilt093 from "@/app/assets/dinners/Bilt Dinner/V_Rachael Lee - 093.webp";

// Import dinner images - Cross River Dinner
import crossRiver003 from "@/app/assets/dinners/Cross river Dinner/IMG_0003.webp";
import crossRiver004 from "@/app/assets/dinners/Cross river Dinner/IMG_0004.webp";
import crossRiver1006 from "@/app/assets/dinners/Cross river Dinner/IMG_1006.webp";
import crossRiver7976 from "@/app/assets/dinners/Cross river Dinner/IMG_7976.webp";
import crossRiver7994 from "@/app/assets/dinners/Cross river Dinner/IMG_7994.webp";
import crossRiver7998 from "@/app/assets/dinners/Cross river Dinner/IMG_7998.webp";
import crossRiver8001 from "@/app/assets/dinners/Cross river Dinner/IMG_8001.webp";

// Import dinner images - Moneylion Dinner
import moneylion4869 from "@/app/assets/dinners/Moneylion Dinner/DSC04869.webp";
import moneylion4872 from "@/app/assets/dinners/Moneylion Dinner/DSC04872.webp";
import moneylion4884 from "@/app/assets/dinners/Moneylion Dinner/DSC04884.webp";
import moneylion4929 from "@/app/assets/dinners/Moneylion Dinner/DSC04929.webp";
import moneylion4934 from "@/app/assets/dinners/Moneylion Dinner/DSC04934.webp";
import moneylion4953 from "@/app/assets/dinners/Moneylion Dinner/DSC04953.webp";
import moneylion5013 from "@/app/assets/dinners/Moneylion Dinner/DSC05013.webp";

// Import dinner images - DriveWealth Dinner
import drivewealth340 from "@/app/assets/dinners/Drivewealth/DSC00340.webp";
import drivewealth421 from "@/app/assets/dinners/Drivewealth/DSC00421.webp";
import drivewealth473 from "@/app/assets/dinners/Drivewealth/DSC00473.webp";
import drivewealth509 from "@/app/assets/dinners/Drivewealth/DSC00509.webp";
import drivewealth584 from "@/app/assets/dinners/Drivewealth/DSC00584.webp";
import drivewealth589 from "@/app/assets/dinners/Drivewealth/DSC00589.webp";

// Import logos
import drivewealthLogo from "@/app/assets/main-logos/drivewealth.webp";
import crossRiverLogo from "@/app/assets/crossriver-logo.png";
import moneylionLogo from "@/app/assets/moneylion-logo.png";
import biltLogo from "@/app/assets/Bilt_Rewards_logo.svg.png";

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface DinnerEvent {
  title: string;
  date: string;
  slug: string;
  image: StaticImageData;
  galleryImages: StaticImageData[];
  logo?: StaticImageData;
  // Optional custom blog content
  blogTitle?: string;
  intro?: string;
  sections?: BlogSection[];
  quote?: { text: string; author: string };
}

export const dinnerSeries: DinnerEvent[] = [
  {
    title: "Cross River Dinner",
    date: "December 2025",
    slug: "cross-river-summit",
    image: crossRiver7998,
    galleryImages: [crossRiver003, crossRiver004, crossRiver1006, crossRiver7976, crossRiver7994, crossRiver8001],
    logo: crossRiverLogo,
    blogTitle: "Cross River Founder Gilles Gade: Banking with Heart and Purpose",
    intro: "The pioneer and arguably the most important company in fintech banking is Cross River Bank. Blue Dot Investors hosted an intimate dinner with Gilles Gade, the Founder and CEO of Cross River Bank. For those who follow fintech and embedded banking, Cross River needs little introduction. It's the technology-driven infrastructure powering some of the industry's most innovative companies. But spending an evening with Gilles offered something far more valuable than a discussion of APIs and embedded finance: a window into the philosophy and values that have guided Cross River since its founding.",
    sections: [
      {
        heading: "An Unconventional Path",
        paragraphs: [
          "Gilles Gade's path to banking is anything but conventional. Born and raised in Paris, he began his career in 1990 at Citi before building an impressive resume across some of Wall Street's most prestigious institutions, including Bear Stearns and Barclays.",
          "But it was 2008, in the depths of the financial crisis, when Gilles made his most consequential decision: founding Cross River Bank.",
        ],
      },
      {
        heading: "Standing by Customers",
        paragraphs: [
          "At dinner, Gilles also shared some remarkable stories that illustrate Cross River's approach to banking. He spoke about backing customers during near-death moments, those critical junctures when other institutions would have walked away. He recounted the intense early days of COVID-19, when Cross River quickly pivoted to become one of the most prolific Paycheck Protection Program (PPP) lenders in the country.",
        ],
      },
      {
        heading: "The Story Behind the Name",
        paragraphs: [
          "The story behind Cross River's name itself reveals Gilles's thoughtfulness. While he didn't elaborate on the full origin story at dinner, he did share how the name came to be—an ancient biblical detail that reflects the same care and intention he brings to every aspect of the business.",
        ],
      },
      {
        heading: "Philanthropy as Strategy",
        paragraphs: [
          "What was most striking about the evening wasn't any particular business insight or industry trend—it was Gilles's unwavering commitment to charitable giving, even during the most challenging times. In an industry where philanthropy often takes a backseat during downturns, Cross River has made it central to their strategy.",
          "Gilles shared that at Cross River, they have made charitable giving an integral part of their strategy. They believe their success is tied to the level of philanthropy and volunteerism they engage in, and does not depend on past performance. They do well when, and because, they do good. For Gilles, charity isn't something done out of the goodness of one's heart—it's the right thing to do. Period.",
        ],
      },
      {
        heading: "Banking with Purpose",
        paragraphs: [
          "As Cross River continues to shape the future of financial services through its technology and partnerships, it's clear that Gilles Gade's greatest innovation isn't just technical—it's showing an entire industry what banking with heart and purpose looks like.",
        ],
      },
    ],
    quote: {
      text: "We do well when, and because, we do good. Charity isn't something done out of the goodness of one's heart—it's the right thing to do. Period.",
      author: "Gilles Gade, Founder & CEO of Cross River Bank",
    },
  },
  {
    title: "Bilt Dinner",
    date: "November 2025",
    slug: "bilt-rewards-dinner",
    image: biltMain,
    galleryImages: [bilt008, bilt009, bilt011, bilt013, bilt026, bilt083],
    logo: biltLogo,
    blogTitle: "Bilt Founder Ankur Jain: How to Build an Enduring Brand",
    intro: "There is no company in fintech today that is generating more excitement than BILT. They have done something that many considered impossible: build a financial ecosystem based around rewards for renters. Bilt CEO and Founder, Ankur Jain, joined us for an intimate dinner sharing insights about building one of fintech's most audacious ventures.",
    sections: [
      {
        heading: "Born to Build",
        paragraphs: [
          "Ankur grew up immersed in entrepreneurship. His father left Microsoft to found InfoSpace when Ankur was six, and he spent afternoons in startup offices absorbing the business-building process. By eleven, he'd launched his first company. That early exposure instilled a conviction: technology could solve real problems affecting everyday people. After stints founding Humin (acquired by Tinder) and establishing Kairos as a venture studio, Ankur identified an enormous gap: Americans spend over $500 billion annually on rent with zero rewards or a path to homeownership.",
        ],
      },
      {
        heading: "Building Three Companies at Once",
        paragraphs: [
          "Ankur shared the challenges of building really three companies at once: a credit card program, a payments platform, and a merchant rewards network. The complexity behind this architecture is staggering. After a 2018 conversation with real estate magnate Barry Sternlicht revealed how profitable airline and hotel loyalty programs are, Ankur realized rent represented an even larger opportunity. But building it proved nearly impossible.",
        ],
      },
      {
        heading: "The Early Days",
        paragraphs: [
          "The early days tested every assumption. Landlords initially refused to fund the rewards program despite loving the concept. This forced Bilt to create its own loyalty currency, which in hindsight was actually a breakthrough that made the economics work. Then came 18 months petitioning the FHA, Fannie Mae, and Treasury Department to approve using rewards points toward home down payments, a use case regulators had never contemplated. Rejections piled up before approval finally came in October 2019. Meanwhile, Ankur assembled partners including Mastercard, Wells Fargo, and major property owners representing millions of rental units. Each partnership required solving unprecedented technical and regulatory challenges.",
        ],
      },
      {
        heading: "Pandemic Breakthrough",
        paragraphs: [
          "It wasn't until the pandemic that Bilt was able to start gaining traction with landlords. With the economy grinding to a halt, suddenly the big landlords were more open to new ideas to boost tenant retention.",
        ],
      },
      {
        heading: "What's Next",
        paragraphs: [
          "While providing few details, Ankur teased the release of Bilt for homeowners that will be launching in Q1 2026, which will move them beyond the rental market. Ankur's north star? In ten years, Bilt becomes the central financial platform for residential living, from renting to homeownership and every transaction in between.",
          "Despite the late hour, everyone in the room remained fully engaged as Ankur shared how Bilt has become such a transformational company. His message was clear: the opportunity to reshape how Americans build wealth through housing is just beginning.",
        ],
      },
    ],
    quote: {
      text: "The opportunity to reshape how Americans build wealth through housing is just beginning.",
      author: "Ankur Jain, Founder & CEO of Bilt",
    },
  },
  {
    title: "MoneyLion Dinner",
    date: "September 2025",
    slug: "moneylion-leaders",
    image: moneylion4953,
    galleryImages: [moneylion4869, moneylion4872, moneylion4884, moneylion4929, moneylion4934, moneylion5013],
    logo: moneylionLogo,
    blogTitle: "MoneyLion Founder Dee Choubey: From Founding to IPO to Exit",
    intro: "It is rare for a fintech founder to take a company all the way from founder to the public markets to an acquisition, but that is the story of Dee Choubey, founder of MoneyLion. At our September dinner, Dee shared insights from over a decade building one of fintech's most successful platforms.",
    sections: [
      {
        heading: "From Wall Street to Fintech Pioneer",
        paragraphs: [
          "After more than a decade on Wall Street, including stints at Goldman Sachs, Citadel, and Barclays, Dee witnessed firsthand how traditional banking systematically failed everyday Americans. That frustration sparked MoneyLion's founding in 2013 with a clear mission: leverage AI and machine learning to reframe how people engage with their finances. What began as a digital lending platform evolved into a comprehensive ecosystem combining banking, investing, credit products, and personalized financial guidance in a single app.",
        ],
      },
      {
        heading: "Building a Social Media Powerhouse",
        paragraphs: [
          "MoneyLion was very early in its leverage of social media as an engagement tool. Dee explained the thinking here and how they were able to build their social media following to millions of consumers, the largest in all of fintech. Their partnership with YouTube star Mr. Beast broke new ground in financial services, introducing the MoneyLion Beast Games, and helped them expand their reach to new heights.",
        ],
      },
      {
        heading: "The SPAC Journey",
        paragraphs: [
          "MoneyLion went public via a SPAC merger with Fusion Acquisition Corp in September 2021, debuting on the NYSE under the ticker ML, proudly inheriting Merrill Lynch's former symbol. During our dinner, Dee discussed in detail the lessons learned from that SPAC journey. The process brought both opportunities and challenges, from navigating timing delays to understanding the importance of finding the right sponsor who truly understands both your business model and the capital markets. The experience reinforced that going public isn't just about raising capital, it's about finding partners aligned with your long-term vision.",
        ],
      },
      {
        heading: "The Power of a Great Team",
        paragraphs: [
          "Dee emphasized something that resonated throughout the evening: the critical importance of having a great founding team. MoneyLion's success, he stressed, came from assembling owner-operators who bought into the mission rather than simply showing up for a job. That dedication to the vision became MoneyLion's foundation through every pivot and challenge.",
        ],
      },
      {
        heading: "A New Chapter",
        paragraphs: [
          "The company's trajectory took another significant turn in December 2025 when Gen Digital announced its acquisition of MoneyLion. After reaching a record 2025 revenue of $546 million with 20.4 million customers, MoneyLion entered its next chapter, one that promises expanded opportunities while maintaining its core mission of financial empowerment.",
          "For entrepreneurs in the room, Dee's journey offers a masterclass in persistence, strategic timing, and the power of building with people who genuinely care about the mission you're pursuing.",
        ],
      },
    ],
    quote: {
      text: "MoneyLion's success came from assembling owner-operators who bought into the mission rather than simply showing up for a job.",
      author: "Dee Choubey, Founder of MoneyLion",
    },
  },
  {
    title: "DriveWealth Dinner",
    date: "June 2025",
    slug: "drivewealth-dinner",
    image: drivewealth584,
    galleryImages: [drivewealth340, drivewealth421, drivewealth473, drivewealth509, drivewealth589],
    logo: drivewealthLogo,
    blogTitle: "DriveWealth: Democratizing Investing for the World",
    intro: "Before fractional shares became table stakes, before every neobank offered investing, there was DriveWealth. Founded in 2012, DriveWealth pioneered the infrastructure that would eventually power investing for hundreds of millions of people worldwide. We hosted CEO Michael Blaugrund and COO Venu Palaparthi for an intimate dinner where they shared the journey of building the rails that democratized access to the stock market.",
    sections: [
      {
        heading: "The Vision Before Its Time",
        paragraphs: [
          "Michael and Venu painted a picture of DriveWealth's founding vision: the infrastructure powering brokerage was built for a different era. It was expensive, slow, and designed for wealthy clients making large trades. The rest of the world was locked out.",
          "DriveWealth was founded with a radical premise: build cloud-native brokerage infrastructure from scratch that could handle fractional shares, real-time trading, and seamless API integration. At the time, most thought it was crazy. Fractional shares? Who would want to buy $5 of Amazon stock?",
        ],
      },
      {
        heading: "Building the Picks and Shovels",
        paragraphs: [
          "Michael discussed the strategic decision to build B2B infrastructure rather than a consumer app. While it would have been tempting to chase the direct-to-consumer opportunity, the real leverage came from powering other companies. Today, DriveWealth's infrastructure powers investing features for Revolut, Stake, Hatch, and dozens of other platforms across 150+ countries.",
          "Venu dove into the challenges of building enterprise infrastructure. Unlike consumer apps where you can iterate quickly, enterprise clients demand bulletproof reliability. A bug doesn't just affect your app—it affects millions of users across dozens of partner platforms. He described building a culture of engineering excellence that could meet these demands.",
        ],
      },
      {
        heading: "Going Global",
        paragraphs: [
          "One of DriveWealth's most significant achievements is bringing U.S. market access to investors worldwide. Venu explained how they navigated the complex web of international regulations to enable someone in Australia, Europe, or South America to buy fractional shares of U.S. stocks as easily as someone in New York.",
          "This global expansion required not just technical innovation but deep regulatory expertise. Each country presented unique challenges around KYC, tax reporting, and securities law. DriveWealth built a compliance infrastructure as sophisticated as its trading technology.",
        ],
      },
      {
        heading: "The Embedded Finance Revolution",
        paragraphs: [
          "Michael reflected on how DriveWealth helped catalyze the broader embedded finance movement. When they started, the idea that a non-financial company would offer investing seemed far-fetched. Now it's expected. Every super app, every neobank, every fintech platform wants to offer their users the ability to invest.",
          "This shift validated DriveWealth's original thesis but also attracted competition. Michael discussed how they've maintained their edge through continuous innovation—launching crypto trading, building out retirement account infrastructure, and expanding into new asset classes.",
        ],
      },
      {
        heading: "What's Next for Democratized Investing",
        paragraphs: [
          "Looking ahead, both Michael and Venu see enormous runway remaining. Despite the progress, most of the world's population still lacks access to modern investment infrastructure. Emerging markets represent a massive opportunity, as do new asset classes and investment products.",
          "As the evening concluded, they left us with a powerful observation: the democratization of investing isn't just about access to stocks. It's about giving everyone the tools to build long-term wealth. DriveWealth's mission—to make investing accessible to everyone—is still just getting started.",
        ],
      },
    ],
    quote: {
      text: "We didn't just want to build a better brokerage. We wanted to rebuild the entire infrastructure of investing from the ground up—and make it accessible to everyone.",
      author: "Michael Blaugrund, CEO of DriveWealth",
    },
  },
];

// Bento box images for community page (main image from each dinner)
export const bentoImages = [moneylion4953, bilt083, crossRiver7976, moneylion4869];
