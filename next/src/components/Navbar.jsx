import Link from "next/link";
import React, { useEffect, useState } from "react";
import FiverrLogo from "./FiverrLogo";
import { useStateProvider } from "@/context/StateContext";
import { IoSearchOutline } from "./../../node_modules/react-icons/io5/index.esm";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { GET_USER_INFO } from "@/utils/constants";
import axios from 'axios'

const Navbar = () => {
  const [cookies] = useCookies()
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [
    { showLoginModal, showSignupModal, userInfo, isSeller },
    dispatch,
  ] = useStateProvider();
  const handleLogin = () => {};

  const handleSignup = () => {};

  const links = [
    { linkName: "Fiverr Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if(cookies.jwt && !userInfo ){
        console.log(cookies.jwt)
        const getUserInfo = async() => {
            try {
                const {data: {user}} = await axios.post(GET_USER_INFO, {}, {withCredentials: true, })
                let projectedUserInfo = {...user};
            } catch (error) {
                console.log(error)
            }
        }
        getUserInfo()
    }
  }, [cookies, userInfo])
  

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
                fillColor={!isFixed && userInfo ? "#ffffff" : "#401145"}
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
          {!userInfo ? <ul className="flex gap-10 items-center">
            {links.map(({linkName, handler, type}) => (
                <li key={linkName} className={`${isFixed ? "text-base " : "text-white"} font-medium `}>
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && <button onClick={handler}>{linkName}</button>}
                    {type === "button2" && <button onClick={handler} className={`border text-md px-3 rounded-sm py-1 font-semibold ${!isFixed ? "border-white text-white" : "border-[#1dbf73] text-[#1dbf73]" }  hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}>{linkName}</button>}
                </li>
            ))}
          </ul> : <ul></ul>}
        </nav>
      )}
    </>
  );
};

export default Navbar;
