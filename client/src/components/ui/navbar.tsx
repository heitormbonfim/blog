import React, { useEffect, useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuButton } from "./menu-button";
import { NavButtons, navButtons } from "../../utils/navbar-buttons";

interface Navbar extends NavbarTransparency {
  navButtons: NavButtons[];
}

interface NavbarTransparency {
  transparentWhenTop?: boolean;
  backgroundTransparency: number;
}

interface NavbarProps {
  transparentWhenTop?: boolean;
  mobileOnly?: boolean;
}

export default function Navbar({ transparentWhenTop, mobileOnly }: NavbarProps) {
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const [backgroundTransparency, setBackgroundTransparency] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }

    return () => window.removeEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (mobileOnly) {
      return setIsMobile(true);
    }

    if (windowWidth && windowWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (transparentWhenTop) {
      const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
      };

      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
      }
    }
  }, [transparentWhenTop]);

  useEffect(() => {
    if (transparentWhenTop) {
      let backgroundTransparencyVar = clientWindowHeight / 600;

      if (backgroundTransparencyVar < 1) {
        setBackgroundTransparency(backgroundTransparencyVar);
      }
    }
  }, [clientWindowHeight, transparentWhenTop]);

  return (
    <>
      {isMobile ? (
        <MobileNavbar
          transparentWhenTop={transparentWhenTop}
          backgroundTransparency={backgroundTransparency}
          navButtons={navButtons}
        />
      ) : (
        <Desktop
          transparentWhenTop={transparentWhenTop}
          backgroundTransparency={backgroundTransparency}
          navButtons={navButtons}
        />
      )}
    </>
  );
}

function NavbarLogo() {
  return (
    <Link to="/">
      <span className="text-2xl font-bold mx-3 border-transparent hover:text-zinc-50 hover:border-b-2 hover:border-green-500 duration-150">
        Heitor M Bonfim
      </span>
    </Link>
  );
}

function MobileNavbar({ transparentWhenTop, backgroundTransparency, navButtons }: Navbar) {
  const [showMenu, setShowMenu] = useState(false);

  function handleToggleMenu(event: React.MouseEvent<any>) {
    event.stopPropagation();

    setShowMenu((prev) => !prev);
  }

  return (
    <nav
      className={`fixed top-0 w-full z-30 transition-all ease-in duration-200 lg:hidden border-b-2 ${
        showMenu && "!bg-[#fffd]"
      }`}
      style={{
        background: transparentWhenTop ? `rgba(0, 0, 0, ${backgroundTransparency})` : "#fffd",
      }}
    >
      <div
        className={`flex justify-between items-center w-full mx-auto py-4 px-2 relative ${
          showMenu && "backdrop-blur-sm"
        }`}
      >
        <NavbarLogo />

        <MdOutlineMenuOpen
          size={35}
          className={`text-zinc-100 mx-3 transition-all ease-in duration-200 ${
            showMenu && "rotate-180"
          }`}
          onClick={(event) => handleToggleMenu(event)}
        />
      </div>

      <div
        className={`backdrop-blur-sm fixed w-full h-full z-30 transition-transform ease-in duration-200 ${
          !showMenu && "translate-x-full"
        } flex justify-end`}
        onClick={(event) => handleToggleMenu(event)}
      >
        <div
          className="w-[60%] h-full bg-[#fffd] flex flex-col justify-start gap-2 p-5"
          onClick={(event) => event.stopPropagation()}
        >
          {navButtons.map((button, idx) => {
            return (
              <React.Fragment key={button.title + idx}>
                <MenuButton
                  className="w-full text-center font-bold text-2xl border-b-0"
                  href={button.href}
                  _blank={button._blank}
                >
                  {button.title}
                </MenuButton>
                <hr />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function Desktop({ transparentWhenTop, backgroundTransparency, navButtons }: Navbar) {
  return (
    <nav
      className={`fixed top-0 w-full z-30 border-b-2 ${!transparentWhenTop && "backdrop-blur-sm"}`}
      style={{
        background: transparentWhenTop ? `rgba(0, 0, 0, ${backgroundTransparency})` : "#fffd",
      }}
    >
      <div className="lg:flex justify-between items-center w-full max-w-[1320px] mx-auto py-4 px-2 hidden">
        <NavbarLogo />

        <div className="flex justify-center items-center gap-5">
          {navButtons.map((button, idx) => {
            return (
              <React.Fragment key={button.title + idx}>
                <MenuButton href={button.href} _blank={button._blank}>
                  {button.title}
                </MenuButton>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
