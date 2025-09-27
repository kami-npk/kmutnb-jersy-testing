"use client";
import { useEffect, useState } from "react";
import Navbar from "../util/navbar";
import { Order } from "../type/order";
import RenderImage from "../util/renderImage";
import { Trash2, Building, Truck } from "lucide-react";
import DeletePopup from "./deleteorderPopup";
import Link from "next/link";
import Footer from "../section/footer/footer";

const Page = () => {
  const [data, setData] = useState<Order[]>([]);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteNo, setDeleteNo] = useState(-1);
  const [collect, setCollect] = useState("self");
  useEffect(() => {
    sessionStorage.setItem("collect", JSON.stringify(collect));
  }, [collect]);
  useEffect(() => {
    const saved = sessionStorage.getItem("order");
    setData(saved ? JSON.parse(saved) : []);
  }, []);
  const onDecrease = (no: number) => {
    if (data[no].amount === 1) {
      setDeletePopup(true);
      setDeleteNo(no);
    } else {
      setData((prev) =>
        prev.map((item, i) =>
          i === no ? { ...item, amount: item.amount - 1 } : item
        )
      );
    }
  };
  const onIncrease = (no: number) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === no ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };
  useEffect(() => {
    let all = 0;
    data.forEach((i) => (all += i.amount));
    if (all >= 5) {
      setPrice(all * 325);
    } else {
      setPrice(all * 339);
    }
    setAmount(all);
    if (data.length !== 0) {
      sessionStorage.setItem("order", JSON.stringify(data));
      console.log(data);
    }
  }, [data]);
  const handleDelete = () => {
    const temp = data.filter((_,i)=> i!==deleteNo)
    setData(temp);
    window.scrollBy({ top: -100, behavior: "smooth" });
    sessionStorage.setItem("order",JSON.stringify(temp))
  };
  const discountCal = () => {
    if (amount >= 5) {
      return amount * 339 - amount * 325;
    } else {
      return amount * 339 - amount * 339;
    }
  };
  return (
    <div className="font-barlow-regular">
      <div className="hidden md:block">
        <Navbar control="have" amount={amount} />
        <DeletePopup
          isOpen={deletePopup}
          onClose={() => setDeletePopup(false)}
          confirm={handleDelete}
        />

        <div className="w-full h-20"></div>
        <div className="border-b-1 mx-8 pb-5 border-[#CFCFCF]">
          <div className="text-[28px] flex justify-center font-bold pt-2">
            Cart
          </div>
          <div className="flex justify-center text-[#707084]">
            Total orders: {amount}. |&nbsp;
            <p className="text-black"> Total: {price} THB</p>
          </div>
        </div>
        <div className="flex mx-20 gap-30">
          <div className="w-[50%] ">
            {data.map((order, i) => (
              <div key={i} className="border-b-1 border-[#CFCFCF] mx-6 py-6">
                <div className="flex">
                  <RenderImage color={order.color} number={order.number} />
                  <div className="pl-3">
                    <div className="font-[600]">
                      KMUTNB E-SPORTS JERSEY 2025
                    </div>
                    <div className="font-[600]">{order.amount * 339} THB</div>
                    <div className="text-[#707084] text-[14px]">
                      Nametag :{" "}
                      {order.nametag === "" ? '"blank"' : order.nametag}
                    </div>
                    <div className="text-[#707084] text-[14px]">
                      Number : {order.number === "" ? '"blank"' : order.number}
                    </div>
                    <div className="text-[#707084] text-[14px]">
                      Color : {order.color}
                    </div>
                    <div className="text-[#707084] text-[14px]">
                      Size : {order.size}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-[40px] w-[80px] flex border-1 border-[#CFCFCF] rounded-[5px]">
                    <div
                      onClick={() => onDecrease(i)}
                      className={` hover:bg-[#f8f8f8] border-r-1 border-[#CFCFCF] hover: select-none cursor-pointer h-full w-[25%] flex justify-center items-center font-extrabold text-[20px]`}
                    >
                      {order.amount === 1 ? (
                        <Trash2 className="h-[15px] w-[15px]" />
                      ) : (
                        "-"
                      )}
                    </div>
                    <div
                      className={`h-full w-[50%]  flex justify-center items-center`}
                    >
                      <p>{order.amount}</p>
                    </div>
                    <div
                      onClick={() => onIncrease(i)}
                      className="border-l-1 border-[#CFCFCF] hover:bg-[#f8f8f8] select-none cursor-pointer h-full w-[25%]  flex justify-center items-center font-extrabold"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[40%]">
            <div className="px-7 pt-4 gap-2 flex flex-col">
              <div
                onClick={() => setCollect("self")}
                className={`${
                  collect === "self"
                    ? "border-2 border-[#E53535] text-[#E53535]"
                    : "cursor-pointer hover:bg-[#e5353525]"
                }  border-1 border-[#CFCFCF] select-none h-10 flex px-7 items-center rounded-[4px]`}
              >
                <Building strokeWidth={1} className="mr-2" /> Self Pick at 8th
                floor ,40 Building KMUTNB
              </div>
              <div
                onClick={() => setCollect("deli")}
                className={`${
                  collect === "deli"
                    ? "border-2 border-[#E53535] text-[#E53535]"
                    : "cursor-pointer hover:bg-[#e5353525]"
                }  border-1 border-[#CFCFCF] select-none h-10 flex px-7 items-center rounded-[4px]`}
              >
                <Truck strokeWidth={1} className="mr-2" />
                Delivery
              </div>
            </div>
            <div className=" h-33 bottom-0 bg-white border-[#CFCFCF] px-5 py-3">
          <div className="flex flex-col gap-2 h-full">
            <div>
              <div className="flex justify-between">
                <p>Discount: </p>
                <p>{discountCal()} THB</p>
              </div>
              <div className="flex justify-between">
                <p>Total: </p> <p>{price} THB</p>
              </div>
            </div>
            <Link href={data.length <= 0 ? "/" : "/checkout"}>
              <div
                className={`${
                  data.length <= 0
                    ? "bg-[#CFCFCF] text-black"
                    : "bg-[#E53535] hover:bg-[#da2a2a] cursor-pointer"
                } flex justify-center items-center h-12 rounded-[5px] text-white`}
              >
                Check Out
              </div>
            </Link>
          </div>
        </div>
          </div>
        </div>

        <div className="min-h-[500px]"></div>
        <Footer />
        <div className="w-full bg-white h-7"></div>
      </div>

      <div className="block md:hidden">
        <Navbar control="have" amount={amount} />
        <DeletePopup
          isOpen={deletePopup}
          onClose={() => setDeletePopup(false)}
          confirm={handleDelete}
        />
        <div className="fixed z-999 w-full h-33 bottom-0 bg-white shadow border-t-1 border-[#CFCFCF] px-5 py-3">
          <div className="flex flex-col gap-2 w-full h-full">
            <div>
              <div className="flex justify-between">
                <p>Discount: </p>
                <p>{discountCal()} THB</p>
              </div>
              <div className="flex justify-between">
                <p>Total: </p> <p>{price} THB</p>
              </div>
            </div>
            <Link href={data.length <= 0 ? "/" : "/checkout"}>
              <div
                className={`${
                  data.length <= 0
                    ? "bg-[#CFCFCF] text-black"
                    : "bg-[#E53535] hover:bg-[#da2a2a] cursor-pointer"
                } flex justify-center items-center h-12 rounded-[5px] text-white`}
              >
                Check Out
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full h-20"></div>
        <div className="border-b-1 mx-8 pb-5 border-[#CFCFCF]">
          <div className="text-[28px] flex justify-center font-bold pt-2">
            Cart
          </div>
          <div className="flex justify-center text-[#707084]">
            Total orders: {amount}. |&nbsp;
            <p className="text-black"> Total: {price} THB</p>
          </div>
        </div>
        <div className="px-7 pt-4 gap-2 flex flex-col">
          <div
            onClick={() => setCollect("self")}
            className={`${
              collect === "self"
                ? "border-2 border-[#E53535] text-[#E53535]"
                : "cursor-pointer hover:bg-[#e5353525]"
            }  border-1 border-[#CFCFCF] select-none h-10 flex px-7 items-center rounded-[4px]`}
          >
            <Building strokeWidth={1} className="mr-2" /> Self Pick at 8th floor
            ,40 Building KMUTNB
          </div>
          <div
            onClick={() => setCollect("deli")}
            className={`${
              collect === "deli"
                ? "border-2 border-[#E53535] text-[#E53535]"
                : "cursor-pointer hover:bg-[#e5353525]"
            }  border-1 border-[#CFCFCF] select-none h-10 flex px-7 items-center rounded-[4px]`}
          >
            <Truck strokeWidth={1} className="mr-2" />
            Delivery
          </div>
        </div>
        <div className="min-h-[500px]">
          {data.map((order, i) => (
            <div key={i} className="border-b-1 border-[#CFCFCF] mx-6 py-6">
              <div className="flex">
                <RenderImage color={order.color} number={order.number} />
                <div className="pl-3">
                  <div className="font-[600]">KMUTNB E-SPORTS JERSEY 2025</div>
                  <div className="font-[600]">{order.amount * 339} THB</div>
                  <div className="text-[#707084] text-[14px]">
                    Nametag : {order.nametag === "" ? '"blank"' : order.nametag}
                  </div>
                  <div className="text-[#707084] text-[14px]">
                    Number : {order.number === "" ? '"blank"' : order.number}
                  </div>
                  <div className="text-[#707084] text-[14px]">
                    Color : {order.color}
                  </div>
                  <div className="text-[#707084] text-[14px]">
                    Size : {order.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-[40px] w-[80px] flex border-1 border-[#CFCFCF] rounded-[5px]">
                  <div
                    onClick={() => onDecrease(i)}
                    className={` hover:bg-[#f8f8f8] border-r-1 border-[#CFCFCF] hover: select-none cursor-pointer h-full w-[25%] flex justify-center items-center font-extrabold text-[20px]`}
                  >
                    {order.amount === 1 ? (
                      <Trash2 className="h-[15px] w-[15px]" />
                    ) : (
                      "-"
                    )}
                  </div>
                  <div
                    className={`h-full w-[50%]  flex justify-center items-center`}
                  >
                    <p>{order.amount}</p>
                  </div>
                  <div
                    onClick={() => onIncrease(i)}
                    className="border-l-1 border-[#CFCFCF] hover:bg-[#f8f8f8] select-none cursor-pointer h-full w-[25%]  flex justify-center items-center font-extrabold"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
        <div className="w-full bg-white h-33"></div>
      </div>
    </div>
  );
};
export default Page;
