import { siteConfig } from "./site-config";

export const contactPageData = {
  header: {
    tag: "Contact Form",
    title: "Have a question?\nContact us now",
    subtitle: "Have questions or need assistance? Our friendly team is ready to provide all the info you need – just get in touch."
  },
  info: {
    address1: {
      line1: "Teach Mania , SBI ATM Prachin Kanishka",
      line2: "Bazzar Samiti Main Gate Patna IN"
    },
    address2: "Bazzar Samiti Main Gate Patna IN",
    email: siteConfig.contactEmail,
    phones: ["+91 7004872749", "+91 7004872749"]
  },
  form: {
    namePlaceholder: "Your Name",
    phonePlaceholder: "Phone Number",
    emailPlaceholder: "Email Address",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Message",
    buttonText: "Send Message"
  }
};
