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

// Import logos
import logoMercury from "@/app/assets/team-logos/Mercury_Financial.png";
import logoJPM from "@/app/assets/team-logos/JPM_logo_2008_DIGITAL_B_Black.png";
import logoCapitalOne from "@/app/assets/team-logos/capital-one@logotyp.us.png";
import logoMcKinsey from "@/app/assets/team-logos/Mckinsey.png";
import logoBCG from "@/app/assets/team-logos/BCG.jpeg";
import logoVaro from "@/app/assets/team-logos/varo@logotyp.us.png";
import logoLloyds from "@/app/assets/team-logos/lloyds@logotyp.us.png";
import logoOak from "@/app/assets/team-logos/Oak.png";
import logoMissionOG from "@/app/assets/team-logos/missionOG.png";
import logoArgus from "@/app/assets/team-logos/Argus_Advisory.png";
import logoSoFi from "@/app/assets/team-logos/sofi@logotyp.us.png";
import logoGalileo from "@/app/assets/team-logos/Galileo_Financial_Technologies.png";
import logoSquare from "@/app/assets/team-logos/square@logotyp.us.png";
import logoOmnumi from "@/app/assets/team-logos/omnumi.png";
import logoMastercard from "@/app/assets/team-logos/mastercard@logotyp.us.png";
import logoUBS from "@/app/assets/team-logos/ubs@logotyp.us.png";
import logoCreditSuisse from "@/app/assets/team-logos/credit-suisse@logotyp.us.png";
import logoVerisk from "@/app/assets/team-logos/verisk@logotyp.us.png";
import logoDataDisrupt from "@/app/assets/team-logos/Datadisrupt.png";
import logoFormatOne from "@/app/assets/team-logos/Format_One.png";
import logoJefferies from "@/app/assets/team-logos/jefferies@logotyp.us.png";
import logo500 from "@/app/assets/team-logos/500.png";
import logoYahoo from "@/app/assets/team-logos/yahoo@logotyp.us.png";
import logoCiti from "@/app/assets/team-logos/citi@logotyp.us.png";
import logoPaulHastings from "@/app/assets/team-logos/paul-hastings@logotyp.us.png";
import logoNYCA from "@/app/assets/team-logos/NYCA.png";
import logoVisa from "@/app/assets/team-logos/visa@logotyp.us.png";
import logoBanff from "@/app/assets/team-logos/Banff.png";
import logoHeidrick from "@/app/assets/team-logos/Heidrick_&_Struggles.png";
import logoFSVector from "@/app/assets/team-logos/FS_Vector.png";
import logoQED from "@/app/assets/team-logos/qed.jpeg";
import logoTreliant from "@/app/assets/team-logos/Treliant.png";
import logoEvercore from "@/app/assets/team-logos/Evercore.jpeg";
import logoAllianceBernstein from "@/app/assets/team-logos/Alliance_Bernstein.png";
import logoLiquidLP from "@/app/assets/team-logos/Liquid_LP.png";
import logoOpenstock from "@/app/assets/team-logos/openstock-logo.webp";
import logoTata from "@/app/assets/team-logos/tata.png";
import logoPrincipal from "@/app/assets/team-logos/principal.png";
import logoShinsei from "@/app/assets/team-logos/Shinsei_Bank.png";
import logoAccenture from "@/app/assets/team-logos/accenture.png";
import logoEurex from "@/app/assets/team-logos/Eurex.jpeg";
import logoCooley from "@/app/assets/team-logos/Cooley.png";
import logoAudaxHealth from "@/app/assets/team-logos/Audax_Health.png";
import logoNetworkSolutions from "@/app/assets/team-logos/Network_Solutions.png";
import logoWarburgPincus from "@/app/assets/team-logos/Warburg_Pincus.png";
import logoPineBrook from "@/app/assets/team-logos/Pine_Brook.png";
import logoAffirm from "@/app/assets/team-logos/affirm.png";
import logoDiscover from "@/app/assets/team-logos/Discover.png";
import logoHSBC from "@/app/assets/team-logos/HSBC.png";
import logoAFC from "@/app/assets/team-logos/AFC.png";
import logoBloomberg from "@/app/assets/team-logos/bloombergpng.png";
import logoCrossRiver from "@/app/assets/team-logos/cross_river.png";
import logoNYState from "@/app/assets/team-logos/NY_State.png";

export interface Advisor {
  name: string;
  title: string;
  image: StaticImageData;
  bio: string;
  logos: StaticImageData[];
  linkedin: string;
  speciality: string;
}

export const advisors: Advisor[] = [
  {
    name: "Arjun Arora",
    title: "Advisor",
    image: arjunArora,
    bio: "Arjun Arora is the founder and advisor at Format One, advising funds, startups, and Fortune 100 companies on strategy, monetization, and fundraising. He was previously a Partner at 500 Startups and founded ReTargeter (acquired by Sellpoints in 2015). Earlier, he led business development at Yahoo! Real Estate and was the IC member at Nike VL.",
    logos: [logoFormatOne, logoJefferies, logo500, logoYahoo],
    linkedin: "https://www.linkedin.com/in/arjundevarora/",
    speciality: "Fundraising",
  },
  {
    name: "David Boehmer",
    title: "Advisor",
    image: davidBoehmer,
    bio: "David is the Founder and CEO of Banff Advisors. He previously spent 20 years at Heidrick & Struggles (Nasdaq: HSII), where he served on the Global Management Committee and as Global Managing Partner of the Financial Services Practice. A trusted advisor to the Boards of the world's largest banks and fintechs, David was named a Young Global Leader by the World Economic Forum in 2012.",
    logos: [logoBanff, logoHeidrick],
    linkedin: "https://www.linkedin.com/in/dboehmer/",
    speciality: "Operating Talent",
  },
  {
    name: "Ariel Boyman",
    title: "Advisor",
    image: arielBoyman,
    bio: "Ariel Boyman's career includes over 25 years of experience leading inorganic growth and financing initiatives for leading solutions and services providers in the technology sector. He has led, and advised on, initiatives representing over $25 billion in transaction value as a corporate development professional and investment banker. Ariel is the Founder of DataDisrupt and was previously Vice President M&A, Investments and Strategic Partnerships at Mastercard. Prior to joining Mastercard, Ariel held senior corporate development roles at Cognizant and Verisk Analytics as well as senior investment banking roles at UBS and Credit Suisse, where he spent seven years with the CSFB Technology Investment Banking Group. Ariel received an MBA from Columbia Business School and a BBA from the University of Michigan.",
    logos: [logoMastercard, logoUBS, logoCreditSuisse, logoVerisk, logoDataDisrupt],
    linkedin: "https://www.linkedin.com/in/ariel-boyman-bb429b3/details/experience/",
    speciality: "Data & Analytics",
  },
  {
    name: "Tom Brown",
    title: "Advisor",
    image: tomBrown,
    bio: "Thomas Brown is a senior counsel at Paul Hastings. J.P. Morgan has called him \"fintech's most famous legal mind.\" Over three decades, he has represented nearly every major company in the space, as well as their founders and investors. Prior to Paul Hastings, Thomas was a partner with and general counsel of NYCA, a leading venture capital firm focused on connecting innovative companies to the global financial system. At Paul Hastings, Thomas' practice is focused primarily on competition law and legal issues affecting the financial services industry. He is a past chair of the firm's Competition practice and co-chair of the firm's Fintech practice. In addition to strategically advising payment systems and financial services clients across a broad spectrum of regulatory issues, he has litigated notable antitrust cases, including class actions.",
    logos: [logoPaulHastings, logoNYCA, logoVisa],
    linkedin: "https://www.linkedin.com/in/tpbrown5/",
    speciality: "Legal",
  },
  {
    name: "Ciara Burnham",
    title: "Advisor",
    image: ciaraBurnham,
    bio: "Ciara Burnham is a financial services executive, board director, and investor with decades of experience across investment banking and fintech. She spent roughly two decades as a senior managing director at Evercore, helping build the firm's investment banking and investment management platform globally. She has also advised early-stage fintech companies and served as a senior advisor and partner with QED Investors, after earlier roles at Sanford Bernstein and McKinsey.",
    logos: [logoEvercore, logoMcKinsey, logoAllianceBernstein, logoQED],
    linkedin: "https://www.linkedin.com/in/ciara-burnham-5a963a14/",
    speciality: "Strategy",
  },
  {
    name: "Kirk Chapman",
    title: "Advisor",
    image: kirkChapman,
    bio: "Kirk Chapman is CEO and co-founder of Omnumi, bringing over 20 years of banking and payments technology experience. He previously led operational technology at SoFi and advised CEO Anthony Noto, and served as Head of Strategy for Galileo. Earlier, he founded and ran an MSP supporting banks and banking technology across the U.S. Southeast.",
    logos: [logoSoFi, logoGalileo, logoSquare, logoOmnumi],
    linkedin: "https://www.linkedin.com/in/kirk-chapman-58969667/",
    speciality: "Crypto",
  },
  {
    name: "Phil Goldfeder",
    title: "Advisor",
    image: philGoldfeder,
    bio: "Phil Goldfeder is CEO of the American Fintech Council (AFC), working at the intersection of policy, compliance, and fintech innovation. Before AFC, he led global public affairs at Cross River and founded the Online Lending Policy Institute. His career spans nearly two decades bridging public- and private-sector work in financial services regulation and responsible product standards.",
    logos: [logoAFC, logoBloomberg, logoCrossRiver, logoNYState],
    linkedin: "https://www.linkedin.com/in/philgoldfeder/",
    speciality: "Regulatory",
  },
  {
    name: "Oliver Goldstein",
    title: "Advisor",
    image: oliverGoldstein,
    bio: "Oliver Goldstein is a private equity investor currently serving as a Partner at Newlight Partners. He previously co-led financial services and fintech investing at TPG's Rise Fund and earlier was a Managing Director at Pine Brook. His career spans growth and buyout investing across financial services and technology-enabled businesses.",
    logos: [logoWarburgPincus, logoPineBrook],
    linkedin: "https://www.linkedin.com/in/oliver-goldstein-97974b14/",
    speciality: "PE Investing",
  },
  {
    name: "Princeton Graham",
    title: "Advisor",
    image: princetonGraham,
    bio: "Princeton Graham is a Managing Principal at FS Vector, advising fintech and traditional financial institutions on operational strategy, regulatory analysis, licensing, partnerships, and building risk/compliance programs. Before FS Vector, he worked at Treliant and supported a private family office, and also spent time at QED Investors. He has also worked with U.S. Senators Tim Kaine and Mark Warner.",
    logos: [logoFSVector, logoQED, logoTreliant],
    linkedin: "https://www.linkedin.com/in/princeton-graham/",
    speciality: "Regulatory",
  },
  {
    name: "Michael Heller",
    title: "Advisor",
    image: michaelHeller,
    bio: "Michael Heller is an Advisor at Oak HC/FT and an Operating Partner at Mission OG where he focuses on growth equity and early-stage fintech opportunities. Michael sits on several boards including Blastpoint and Validifi. Michael was recently chairman of Audigent which was acquired by Experian in 2024. Additionally, he served as President of FactorTrust, an alternative credit bureau that was acquired by TransUnion in 2017. Prior to that, Michael co-founded and served as President of Argus Information & Advisory, a leading data and analytics provider for the global payments industry, which was acquired by Verisk Analytics for $425 million in 2012.",
    logos: [logoOak, logoMissionOG, logoArgus],
    linkedin: "https://www.linkedin.com/in/michael-heller-62a6249/",
    speciality: "Credit",
  },
  {
    name: "Jeff Holland",
    title: "Advisor",
    image: jeffHolland,
    bio: "Jeff Holland brings over 30 years of global financial services experience and is a retired partner at Brown Brothers Harriman (BBH), where he served as Global Head of the Financial Institutions Group and directed or chaired BBH's non-U.S. subsidiaries in Europe and Asia. Prior to BBH, he worked at Accenture across Boston, New York, and Frankfurt, advising financial institutions. Since retiring, Jeff has focused on advising and investing in emerging companies and supporting philanthropic initiatives. He currently serves on the boards of Sanford C. Bernstein Funds, United Way of Mass Bay, and the Francis Ouimet Scholarship Fund, advises Novaya Real Estate Ventures and is President of the Governors Island Club. Jeff holds a B.S. in Management and Finance from Clarkson University and resides in Boston with his family.",
    logos: [logoAccenture, logoEurex],
    linkedin: "",
    speciality: "Financial Institutions",
  },
  {
    name: "Harvey Hudes",
    title: "Advisor",
    image: harveyHudes,
    bio: "Harvey Hudes is founder of Caliber, an Inc 5000 marketing communications firm focused on helping financial services, fintechs, insurtechs, & proptechs increase their visibility and credibility. Harvey started the firm after seeing a gap between fintech innovation and financial-services storytelling while working in financial media. They have since collaborated with more than 300 companies, including Goldman Sachs, Blackstone, KKR, and Berkshire Hathaway portfolio companies, financial institutions, investors, and numerous other industry-leading and growth-stage companies.\n\nHarvey is an active investor in the fintech ecosystem and holds Advisory Board positions with a number of innovating organizations.\n\nHe also owns The Financial Revolutionist, a media outlet providing readers with financial innovation insights and intelligence.",
    logos: [],
    linkedin: "https://www.linkedin.com/in/harveyhudes/",
    speciality: "PR & Communications",
  },
  {
    name: "Brian Hughes",
    title: "Advisor",
    image: brianHughes,
    bio: "Brian D. Hughes is a member of Affirm's Board (since July 2024), bringing deep experience in growth strategy, digital transformation, and risk management. He is an independent consultant and strategic advisor to Boston Consulting Group serving financial-services clients. Previously, he held senior roles at Discover Financial Services including Chief Risk Officer (2016-2021), and earlier leadership roles at HSBC's card/retail services business and Booz Allen Hamilton.",
    logos: [logoAffirm, logoBCG, logoDiscover, logoHSBC],
    linkedin: "https://www.linkedin.com/in/bdhughes17/",
    speciality: "Identity & Fraud",
  },
  {
    name: "Tricia Kemp",
    title: "Advisor",
    image: triciaKemp,
    bio: "Tricia Kemp is a Co-Founder and Advisor at Oak HC/FT, where she has spent over a decade investing in category-defining fintechs like Rapyd, Paxos, and Feedzai. Her deep domain expertise stems from her time at Cendant (formerly CUC International), where she led marketing and operations for high-scale credit card affinity programs and managed major subsidiaries including Welcome Wagon and Entertainment Publications. She began her career in foundational roles at Merrill Lynch and Hewlett Packard. Tricia is a perennial fixture on Institutional Investor's FinTech Finance 40.",
    logos: [logoOak],
    linkedin: "https://www.linkedin.com/in/patriciafkemp/",
    speciality: "Payments",
  },
  {
    name: "Mike Lincoln",
    title: "Advisor",
    image: mikeLincoln,
    bio: "Mike is the vice chair of Cooley and works with the firm's senior leadership team on matters of client relations, strategic planning, lateral growth and communications. His practice focuses on emerging companies, venture capital and M&A. In 1999, Mike co-founded Cooley's first East Coast office in Reston, Virginia.",
    logos: [logoCooley],
    linkedin: "https://www.linkedin.com/in/mike-lincoln-b5262/",
    speciality: "Legal",
  },
  {
    name: "Marshall Lux",
    title: "Advisor",
    image: marshallLux,
    bio: "Marshall Lux began his career at McKinsey where he led relationships with many US and Non-US Banks and Fintechs. After 22 years as a Senior Partner at McKinsey, he joined JPMC to lead risk at Chase. He then joined BCG as a Senior Partner.\n\nMarshall is currently on the Boards of Flagstar Bank, Mphasis, GreenSky among others. He advises a broad range of Fintechs, as well as PEs and VCs. He is also a prolific writer on fintech issues, writing through Senior Fellowships at Harvard and Georgetown.",
    logos: [logoMcKinsey, logoBCG, logoJPM],
    linkedin: "https://www.linkedin.com/in/marshall-lux-b05537120/",
    speciality: "Strategy",
  },
  {
    name: "Asheet Mehta",
    title: "Advisor",
    image: asheetMehta,
    bio: "Asheet Mehta previously led McKinsey's Financial Services Practice in the Americas and co-led it globally, and served on the Firm's Shareholders Council. His work spans insurers, payments, wealth/asset managers, and banks, supporting end-to-end transformations from operating model to platform redesign. He also serves on the Risk committees of the boards of Piramal and Pagaya.",
    logos: [logoMcKinsey],
    linkedin: "https://www.linkedin.com/in/asheet-mehta-37630957/",
    speciality: "Corporate Strategy",
  },
  {
    name: "Stephen Mugford",
    title: "Advisor",
    image: stephenMugford,
    bio: "Steve Mugford is a seasoned strategist with 3 decades of experience driving transformation at the intersection of Banking, Data Analytics and Technology. Steve started at BCG, and was Capital One's EVP Head of Strategy for 21 years. Steve identified transformative opportunities and risk at Capital One, and set Capital One's vision and agenda. During his tenure, Capital One grew from an unbranded monoline to a top US bank with a dominant brand, leading technology and leading customer service. Mr. Mugford is currently CEO of Flashpoint.ai an AI market intelligence platform. He serves on the board of Persado the leading AI marketing platform for banks, and VoloSports the leading Social Sports operator in the US.",
    logos: [logoCapitalOne],
    linkedin: "https://www.linkedin.com/in/stevemugford/",
    speciality: "Corporate Strategy",
  },
  {
    name: "James Peterson",
    title: "Advisor",
    image: jamesPeterson,
    bio: "James Peterson has served in senior leadership roles spanning consumer finance and bank partnership ecosystems, including as Chief Executive Officer at Mercury Financial. He has also held senior credit leadership roles at partner banks supporting fintech and marketplace lending programs. His background centers on building underwriting and risk frameworks that scale across consumer credit portfolios.",
    logos: [logoMercury, logoJPM, logoCapitalOne],
    linkedin: "https://www.linkedin.com/in/james-peterson-a4781293/",
    speciality: "Credit",
  },
  {
    name: "Miles Reidy",
    title: "Advisor",
    image: milesReidy,
    bio: "Miles Reidy previously was a Partner at QED. Prior to QED, Miles served as the Chief Financial Officer for Audax Health, Inc. and was Chief Operating Officer and Chief Financial Officer for Network Solutions. He also served as Executive Vice President and Chief Financial Officer for Sears Holdings Corporation. Miles spent almost a decade in several executive roles at Capital One Financial Corporation, a publicly traded consumer finance bank. Miles also serves on the Boards of the Royal Bank of Canada, US, Heinz School of Public Policy at Carnegie Mellon University, and the Easter Seals of Baltimore/Washington. He holds a B.S. from Georgetown University and a M.S. from Carnegie-Mellon University.",
    logos: [logoCapitalOne, logoAudaxHealth, logoNetworkSolutions, logoQED],
    linkedin: "https://www.linkedin.com/in/miles-reidy-3a99798/",
    speciality: "CFO Advisory",
  },
  {
    name: "Sanjay Sachdev",
    title: "Advisor",
    image: sanjaySachdev,
    bio: "Sanjay is based in India and the US and has spent over 25 years building game-changing asset management businesses in a number of Growth Markets. He is currently the Chairman of Zyfin, a smart beta asset management company based in India. He has served as the President and Chief Executive Officer at Tata Asset Management, based in India. Prior to joining Tata, Sanjay also served as the Chief Executive Officer at Principal PNB Asset Management and as Regional Head of Asset Management for S.E Asia for Shinsei Bank of Japan. He was also Managing Director and Country Manager for India at Principal International Inc and at The Principal International for 12 years, 9 of them in India.",
    logos: [logoTata, logoPrincipal, logoShinsei],
    linkedin: "https://www.linkedin.com/in/sanjay-s-2254a1/",
    speciality: "India",
  },
  {
    name: "Ashwin Shirvaikar",
    title: "Advisor",
    image: ashwinShirvaikar,
    bio: "Ashwin Shirvaikar is the Founder of Red Bear Advisory LLC, a Strategy and Communications advisor to CXOs in the Fintech and IT Services industries. He was previously a Managing Director at Citi and was Global Head/Co-Head of Fintech/IT Services Equity Research. He was an Institutional Investor (II) top-ranked analyst and a primary voice for Fintech valuation, having participated in over 75 IPOs over 24 years. He began his career in M&A at AlliedSignal and is a CFA Charterholder.",
    logos: [logoCiti],
    linkedin: "https://www.linkedin.com/in/ashwin-shirvaikar/",
    speciality: "IPO Readiness",
  },
  {
    name: "Alex Simpson",
    title: "Advisor",
    image: alexSimpson,
    bio: "Alex Simpson is the co-founder and CEO of LiquidLP, building liquidity solutions for private-market investors. A South Africa-born entrepreneur with 15+ years in fintech and three exits, he also invests and advises across the ecosystem, specializing in LP loans and private-fund NAV lending for family offices and RIAs. He is a quiet achiever and deeply relationship-driven.",
    logos: [logoOpenstock, logoLiquidLP],
    linkedin: "https://www.linkedin.com/in/alsimpson1/",
    speciality: "Liquidity",
  },
  {
    name: "Colin Walsh",
    title: "Advisor",
    image: colinWalsh,
    bio: "Colin is the founder and former CEO of Varo Bank, the first all-digital nationally chartered bank in U.S. history. Prior to starting Varo, he had 25 years of experience leading large-scale consumer businesses, including serving as an Executive Vice President at Wells Fargo, Managing Director at Lloyds Banking Group and Executive Vice President at American Express. Colin currently serves on the boards of Varo and MoneyGram and chairs the board of the British Film Institute - America. Colin recently founded and serves as Board Chair of the non-profit Civitas ID.",
    logos: [logoVaro, logoLloyds],
    linkedin: "https://www.linkedin.com/in/colindwalsh/",
    speciality: "Consumer Fintech",
  },
];

export const specialities = [
  "All",
  "Credit",
  "Strategy",
  "Consumer Fintech",
  "Corporate Strategy",
  "Crypto",
  "Data & Analytics",
  "Fundraising",
  "IPO Readiness",
  "Legal",
  "Operating Talent",
  "Regulatory",
  "Liquidity",
  "India",
  "PR & Communications",
  "Financial Institutions",
  "CFO Advisory",
  "PE Investing",
  "Identity & Fraud",
  "Payments",
];
