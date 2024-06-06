import React, { useEffect, useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import { MenuButton } from "./menu-button";
import { NavButtons, navButtons } from "../../utils/navbar-buttons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Separator } from "./separator";

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
      <span className="text-2xl font-bold border-transparent hover:border-b-2 hover:border-zinc-900 duration-150">
        Blog
      </span>
    </Link>
  );
}

function MobileNavbar({ transparentWhenTop, backgroundTransparency, navButtons }: Navbar) {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state: RootState) => state.user.data);

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
          className={`text-zinc-900 transition-all ease-in duration-200 ${
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
          className="w-[60%] h-full border-l-2 bg-[#fffd] flex flex-col justify-start gap-2 p-5"
          onClick={(event) => event.stopPropagation()}
        >
          {navButtons.map((button, idx) => {
            if (!user._id) {
              if (
                button.title.toLowerCase() === "logout" ||
                button.title.toLowerCase() === "profile"
              ) {
                return null;
              }

              return (
                <React.Fragment key={button.title + idx}>
                  <MenuButton
                    className="w-full text-end text-3xl border-none"
                    href={button.href}
                    _blank={button._blank}
                  >
                    {button.title}
                  </MenuButton>
                  <Separator className="bg-zinc-700" />
                </React.Fragment>
              );
            }

            if (button.title.toLowerCase() === "login") return null;

            return (
              <React.Fragment key={button.title + idx}>
                <MenuButton
                  className="w-full text-end text-3xl border-none"
                  href={button.href}
                  _blank={button._blank}
                >
                  {button.title}
                </MenuButton>
                <Separator className="bg-zinc-700" />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function Desktop({ transparentWhenTop, backgroundTransparency, navButtons }: Navbar) {
  const user = useSelector((state: RootState) => state.user.data);

  return (
    <nav
      className={`fixed top-0 w-full z-30 border-b-2 ${!transparentWhenTop && "backdrop-blur-sm"}`}
      style={{
        background: transparentWhenTop ? `rgba(0, 0, 0, ${backgroundTransparency})` : "#fffd",
      }}
    >
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="lg:flex justify-between items-center w-full max-w-7xl mx-auto py-4 hidden">
          <NavbarLogo />

          <div className="flex justify-center items-center gap-5">
            {navButtons.map((button, idx) => {
              if (!user._id) {
                if (
                  button.title.toLowerCase() === "logout" ||
                  button.title.toLowerCase() === "profile"
                ) {
                  return null;
                }

                return (
                  <React.Fragment key={button.title + idx}>
                    <MenuButton href={button.href} _blank={button._blank}>
                      {button.title}
                    </MenuButton>
                  </React.Fragment>
                );
              }

              if (button.title.toLowerCase() === "login") return null;

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
      </div>
    </nav>
  );
}
