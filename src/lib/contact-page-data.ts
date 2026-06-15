import { siteConfig } from "./site-config";

export const contactPageData = {
  header: {
    tag: "Get in Touch",
    title: "Need a Cab?\nContact us now",
    subtitle: "Have questions about our fleet, pricing, or want to book a ride? Our team is available 24/7 to assist you."
  },
  info: {
    address1: {
      line1: "IndiasCab Services, Near SBI ATM",
      line2: "Siwan, Bihar, India"
    },
    address2: "Patna Office: Bypass Road, Patna, Bihar",
    email: siteConfig.contactEmail,
    phones: ["+91 7004872749", "+91 9999999999"] // Using the phone from Teachmania as primary for now
  },
  form: {
    namePlaceholder: "Your Name",
    phonePlaceholder: "Phone Number",
    emailPlaceholder: "Email Address",
    subjectPlaceholder: "Trip Type (One Way/Round Trip)",
    messagePlaceholder: "Details (Pickup location, date, time...)",
    buttonText: "Book via Message"
  }
};
