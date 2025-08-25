// Icons
import * as Icon from "react-feather";
import { FiPhone, FiKey } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { PiBriefcase } from "react-icons/pi";

// ================== Key Features ==================
export const KeyFeatures = [
  { Icon: Icon.Monitor, title: "Fully Responsive" },
  { Icon: Icon.Heart, title: "Browser Compatibility" },
  { Icon: Icon.Eye, title: "Retina Ready" },
  { Icon: Icon.Layout, title: "Based On Tailwindcss 3" },
  { Icon: Icon.Feather, title: "Feather Icons" },
  { Icon: Icon.Code, title: "Built With SASS" },
  { Icon: Icon.UserCheck, title: "W3c Valid Code" },
  { Icon: Icon.Globe, title: "Browsers Compatible" },
  { Icon: Icon.Settings, title: "Easy to customize" },
];

// ================== Team Data ==================
export const teamData = [
  {
    image: "/images/client/01.jpg",
    name: "Ronny Jofra",
    title: "C.E.O.",
    desc: "If the distribution of letters and words is random",
    background: "bg-[#947e03]/10 dark:bg-[#947e03]/30 ",
  },
  {
    image: "/images/client/02.jpg",
    name: "Aliana Rosy",
    title: "HR",
    desc: "If the distribution of letters and words is random",
    background: "bg-emerald-600/10 dark:bg-emerald-600/30 ",
  },
  {
    image: "/images/client/03.jpg",
    name: "Sofia Razaq",
    title: "C.O.O.",
    desc: "If the distribution of letters and words is random",
    background: "bg-red-600/10 dark:bg-red-600/30  ",
  },
  {
    image: "/images/client/04.jpg",
    name: "Micheal Carlo",
    title: "Director",
    desc: "If the distribution of letters and words is random",
    background: "bg-sky-600/10 dark:bg-sky-600/30  ",
  },
  // Duplicate entries removed for clarity
];

// ================== About Services ==================
export const aboutServices = [
  {
    image: "/images/client/amazon.svg",
    name: "Thomas Israel",
    description: `" If the distribution of letters and words is random... "`,
  },
  {
    image: "/images/client/google.svg",
    name: "Carl Oliver",
    description: `" If the distribution of letters and words is random... "`,
  },
  {
    image: "/images/client/lenovo.svg",
    name: "Barbara McIntosh",
    description: `" If the distribution of letters and words is random... "`,
  },
  {
    image: "/images/client/paypal.svg",
    name: "Jill Webb",
    description: `" If the distribution of letters and words is random... "`,
  },
  {
    image: "/images/client/shopify.svg",
    name: "Dean Tolle",
    description: `" If the distribution of letters and words is random... "`,
  },
  {
    image: "/images/client/spotify.svg",
    name: "Christa Smith",
    description: `" If the distribution of letters and words is random... "`,
  },
];

// ================== Accordion ==================
export const accordionData = [
  { id: 1, title: "How does it work ?", content: "There are many variations..." },
  { id: 2, title: "Do I need a designer to use Techwind ?", content: "There are many variations..." },
  { id: 3, title: "What do I need to do to start selling ?", content: "There are many variations..." },
  { id: 4, title: "What happens when I receive an order ?", content: "There are many variations..." },
];

// ================== Real Estate Services ==================
export const realEstateServices = [
  {
    description: '" Techwind made the processes so easy. Techwind instantly increased the amount of interest and ultimately saved us over $10,000. "',
    image: "/images/client/01.jpg",
    name: "Christa Smith",
    role: "Manager",
  },
  {
    description: '" I highly recommend Techwind as the new way to sell your home "by owner". My home sold in 24 hours for the asking price. "',
    image: "/images/client/02.jpg",
    name: "Christa Smith",
    role: "Manager",
  },
  {
    description: ' " My favorite part about selling my home myself was meeting the buyers personally. " ',
    image: "/images/client/03.jpg",
    name: "Christa Smith",
    role: "Manager",
  },
];

// ================== Contact ==================
export const contactData = [
  {
    icon: FiPhone,
    title: "Phone",
    desc: "Reach out to us directly",
    contact: "+251-962493083",
    href: "tel:+251962493083",
  },
  {
    icon: FaRegEnvelope,
    title: "Email",
    desc: "Drop us a message anytime",
    contact: "justicerealestate@example.com",
    href: "mailto:samuelalemseged855@gmail.com",
  },
  {
    icon: RiMapPinLine,
    title: "Location",
    desc: "Find us on Google Maps",
    contact: "View on Google map",
  },
];

// ================== Work Process ==================
export const workData = [
  {
    icon: AiOutlineHome,
    title: "Evaluate Property",
    desc: "Get a fair property evaluation before making decisions.",
  },
  {
    icon: PiBriefcase,
    title: "Meeting with Agent",
    desc: "Schedule a consultation with our expert agents.",
  },
  {
    icon: FiKey,
    title: "Close the Deal",
    desc: "Finalize your transaction smoothly and confidently.",
  },
];
