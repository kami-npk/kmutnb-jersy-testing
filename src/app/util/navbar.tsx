"use client";
import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
const NavbarContainer = tw.div``;
const NavbarLogo = tw.div``;
const NavbarContent = tw.div``;
const NavbarBorder = tw.div``;
const NavbarTop = tw.div``;
const Cart = tw.div``;
type props = {
  control?: string;
  amount:number;
};
const Navbar: React.FC<props> = ({ control ,amount}) => {
  
  return (
    <NavbarContainer className="fixed inset-0 w-full h-full z-[999] flex items-center justify-center pointer-events-none">
      <NavbarBorder className={` relative md:w-[98%] w-[94%] h-[95%] border border-[#CFCFCF] rounded-[7px]`}>
        <NavbarTop className={`${control&&'bg-white'} flex border-b border-[#CFCFCF] px-4 py-2 justify-between`}>
          <NavbarLogo className="">
            <Link className="pointer-events-auto" href="/">
              <Image
                src={control==='have'||control==='slice'?'logoB.svg':"/logo.svg"}
                alt="logo"
                width={130}
                height={500}
                sizes="10vw"
                priority
              />
            </Link>
          </NavbarLogo>
          <NavbarContent className={`flex gap-4 items-center justify-center ${control?'text-black':'text-white'}`}>
            <Link
              href="/CheckOrder"
              className="pointer-events-auto font-barlow-regular text-[20px] hover:text-[#E53535] duration-300"
            >
              Check Order
            </Link>
            <Link
              href="https://www.facebook.com/KMUTNBEsports"
              className="pointer-events-auto font-barlow-regular text-[20px] hover:text-[#E53535] duration-300"
              target="__blank"
            >
              Contact us
            </Link>
            
          </NavbarContent>
        </NavbarTop>
        {control !== 'have'&& (
          <Link className="pointer-events-auto" href="/cart">
            <Cart className="shadow-[0px_2px_3px_rgba(0,0,0,0.2)] h-12 w-12 hover: bg-[#f3f3f3] font-barlow-regular bottom-3 right-3 rounded-full absolute flex justify-center items-center">
              {amount !==0 && <p className="absolute text-[14px] top-2 bg-[#E53535] w-4 h-4 flex justify-center items-center text-white rounded-full">{amount}</p>}
              <ShoppingCart className="absolute bottom-2 left-[11px]" />
            </Cart>
          </Link>
        )}
      </NavbarBorder>
    </NavbarContainer>
  );
};

export default Navbar;
