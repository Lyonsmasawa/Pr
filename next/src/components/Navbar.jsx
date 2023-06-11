import Link from "next/link";
import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import { useStateProvider } from "@/context/StateContext";
import { IoSearchOutline } from "./../../node_modules/react-icons/io5/index.esm";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { GET_USER_INFO, HOST } from "@/utils/constants";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import Image from "next/image";

const Navbar = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [setIsContextMenuVisible]
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [
    { showLoginModal, showSignupModal, userInfo, isSeller },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setIsFixed(true);
    }
  }, [router.pathname]);

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      // console.log(cookies.jwt)
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(GET_USER_INFO, {}, { withCredentials: true });
          let projectedUserInfo = { ...user };
          console.log(projectedUserInfo);
          if (user.profileImage) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.profileImage,
            };
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          if (user.isProfileInfoSet === false) {
            router.push('/profile')
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo]);

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6 top-0 z-30 transition-all duration-300 ${
            isFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div className="">
            <Link href="/">
              <FiverrLogo
                fillColor={!isFixed && !userInfo ? "#ffffff" : "#401145"}
              />
            </Link>
          </div>
          <div
            className={`flex ${
              isFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              className="w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="what service are you looking for today"
            />
            <button
              className="bg-gray-900 p-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>
          {!userInfo ? (
            <ul className="flex gap-10 items-center">
              {links.map(({ linkName, handler, type }) => (
                <li
                  key={linkName}
                  className={`${
                    isFixed ? "text-black" : "text-white"
                  } font-medium `}
                >
                  {type === "link" && <Link href={handler}>{linkName}</Link>}
                  {type === "button" && (
                    <button onClick={handler}>{linkName}</button>
                  )}
                  {type === "button2" && (
                    <button
                      onClick={handler}
                      className={`border text-md px-3 rounded-sm py-1 font-semibold ${
                        !isFixed
                          ? "border-white text-white"
                          : "border-[#1dbf73] text-[#1dbf73]"
                      }  hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
                    >
                      {linkName}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#1DBF73] font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              <li
                className="cursor-pointer text-[#1DBF73] font-medium"
                onClick={handleOrdersNavigate}
              >
                Orders
              </li>

              <li
                className="cursor-pointer font-medium"
                onClick={handleModeSwitch}
              >
               Switch To {isSeller ? "Buyer" : "Seller"}
              </li>
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {userInfo &&
                        userInfo?.email &&
                        userInfo?.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
