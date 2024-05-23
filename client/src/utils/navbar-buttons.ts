export interface NavButtons {
  title: string;
  href: string;
  className?: string;
  _blank: boolean;
}

export const navButtons: NavButtons[] = [
  {
    title: "Home",
    href: "/",
    _blank: false,
  },
  {
    title: "Profile",
    href: "/profile",
    _blank: false,
  },
  {
    title: "Logout",
    href: "/logout",
    _blank: false,
  },
  // {
  //   title: "Contact",
  //   href: "mailto:heitormbonfim@gmail.com?subject=I%20checked%20your%20website&body=Hello,%20Heitor",
  //   _blank: true,
  // },
];
