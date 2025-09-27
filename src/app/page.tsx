"use client";
import Navbar from "./util/navbar";
import Hero from "./section/hero/hero";
import OrderSection from "./section/order/order";
import { useState, useEffect, useRef } from "react";
import { Order } from "./type/order";
import Footer from "./section/footer/footer";
import InfiniteText from "./util/infinitetext";
import ThreeDSection from "./util/3d";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const orderSectionRef = useRef<HTMLDivElement>(null);
  const [control, setControl] = useState<string | undefined>();
  const [color, setColor] = useState<"white" | "black">("white");
  const [number, setNumber] = useState("");
  const [nameTag, setNameTag] = useState("");
  const [numberType,setNumberType] = useState(1)
  useEffect(() => {
    handleGetItem();
  }, []);

  const handleGetItem = () => {
    const raw = sessionStorage.getItem("order");
    if (raw) {
      const data: Order[] = JSON.parse(raw);
      let all = 0;
      data.forEach((i) => (all += i.amount));
      setAmount(all);
    } else {
      setAmount(0);
    }
  };

  useEffect(() => {
    if (!orderSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setControl("slice");
          } else {
            setControl(undefined);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(orderSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleColorChange = (color: string) => {
    if (color === "EFEFEF") {
      setColor("white");
    } else {
      setColor("black");
    }
  };
  return (
    <div className="">
      <Navbar amount={amount} control={control} />
      <Hero />
      <div ref={orderSectionRef}>
        <InfiniteText />
        <div className="flex w-full justify-center gap-20 flex-col md:flex-row pt-5">
          {/* Canvas จะไม่ unmount */}
          <div className="overflow-hidden h-130 w-full md:h-200 md:w-200 flex justify-center items-center rounded-[7px] shadow px-5">
            <ThreeDSection model={color} nametag={nameTag} number={number} type={numberType}/>
          </div>
          <div>
            <OrderSection
              detect={handleGetItem}
              setcolor={handleColorChange}
              onNumChng={setNumber}
              onNameChng={setNameTag}
              onNumberType={setNumberType}
            />
          </div>
        </div>
        <div className="h-20 w-full"></div>
        <Footer /> 
        <div className="h-5 w-full"></div>
      </div>
    </div>
  );
}
