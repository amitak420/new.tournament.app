import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-400/10 bg-slate-900/60 px-5 py-8 mt-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:text-left">
          <FooterSection title="About">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
          </FooterSection>
          <FooterSection title="Support">
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Report Issue</FooterLink>
          </FooterSection>
          <FooterSection title="Legal">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Compliance</FooterLink>
          </FooterSection>
          <FooterSection title="Follow Us">
            <div className="mt-2 flex justify-center gap-3 md:justify-start">
              <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
              <SocialLink href="#" aria-label="YouTube">▶️</SocialLink>
              <SocialLink href="#" aria-label="Twitter">𝕏</SocialLink>
              <SocialLink href="#" aria-label="Discord">💬</SocialLink>
            </div>
          </FooterSection>
        </div>
        <div className="border-t border-slate-400/10 pt-6 text-center text-sm text-slate-400/70">
          <div className="mb-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Cookies</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </div>
          <p>© {new Date().getFullYear()} eSports Arena | All rights reserved | Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

const FooterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="text-sm font-bold uppercase text-slate-200">{title}</h4>
    <ul className="mt-2 space-y-2">{children}</ul>
  </div>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} className="text-xs text-slate-300/60 transition-colors hover:text-blue-400">{children}</a>
  </li>
);

const SocialLink: React.FC<{ href: string; 'aria-label': string; children: React.ReactNode }> = (props) => (
  <a {...props} className="grid h-8 w-8 place-items-center rounded-full border border-slate-400/20 bg-slate-400/10 transition-all hover:-translate-y-0.5 hover:bg-blue-500/20" />
);


export default Footer;
