import React from 'react';

// FIX: Define a new props interface to include an optional 'size' property.
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// FIX: Update the base Icon component to use the 'size' prop for width and height.
const Icon: React.FC<IconProps> = ({ size = "24", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

// FIX: Update all exported icon components to use IconProps.
export const Home: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>
);

export const Trophy: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></Icon>
);

export const Wallet: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" /></Icon>
);

export const User: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>
);

export const Bell: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></Icon>
);

export const Search: React.FC<IconProps> = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>
);

export const Award: React.FC<IconProps> = (props) => (
  <Icon {...props}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></Icon>
);

export const Zap: React.FC<IconProps> = (props) => (
  <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>
);

export const Target: React.FC<IconProps> = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>
);

export const Brain: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.97-3.41 2.5 2.5 0 0 1-2.02-3.48A2.5 2.5 0 0 1 5.5 8V6.5A2.5 2.5 0 0 1 8 4a2.5 2.5 0 0 1 1.5-2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.97-3.41 2.5 2.5 0 0 0 2.02-3.48A2.5 2.5 0 0 0 18.5 8V6.5A2.5 2.5 0 0 0 16 4a2.5 2.5 0 0 0-1.5-2z" /></Icon>
);

export const Send: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Icon>
);

export const Flame: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></Icon>
);

export const X: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>
);

export const Gift: React.FC<IconProps> = (props) => (
  <Icon {...props}><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></Icon>
);

export const Gamepad2: React.FC<IconProps> = (props) => (
  <Icon {...props}><line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" /><line x1="15" x2="15" y1="12" y2="12" /><line x1="17" x2="17" y1="10" y2="10" /><path d="M17.71 7.21a2 2 0 0 0-2.02-2.02l-1.42 1.42a2 2 0 0 0 2.84 2.84z" /><path d="M6.29 16.79a2 2 0 0 0 2.02 2.02l1.42-1.42a2 2 0 0 0-2.84-2.84z" /><path d="M3 10h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3v-1a2 2 0 0 1 2-2 2 2 0 0 0 0-4 2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" /><path d="M21 14h-1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1v1a2 2 0 0 1-2 2 2 2 0 0 0 0 4 2 2 0 0 1 2 2v3" /></Icon>
);

export const Users: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
);

export const Star: React.FC<IconProps> = (props) => (
  <Icon {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>
);

export const DollarSign: React.FC<IconProps> = (props) => (
  <Icon {...props}><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Icon>
);

export const TrendingUp: React.FC<IconProps> = (props) => (
  <Icon {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Icon>
);

export const TrendingDown: React.FC<IconProps> = (props) => (
  <Icon {...props}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></Icon>
);

export const BarChart3: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></Icon>
);

export const Settings: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></Icon>
);

export const Menu: React.FC<IconProps> = (props) => (
  <Icon {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></Icon>
);

export const Sparkles: React.FC<IconProps> = (props) => (
    <Icon {...props}><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/></Icon>
);

export const ChevronLeft: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
);

export const Edit: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></Icon>
);