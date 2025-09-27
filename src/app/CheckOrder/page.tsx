"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../util/navbar";
import { Order } from "../type/order";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { fetchData } from "../supabase/service";
import { CheckOrder } from "../type/slip";
import RenderImage from "../util/renderImage";
import Footer from "../section/footer/footer";
const Page = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [result,setResult] = useState<CheckOrder|null>(null);
  const inputref2 = useRef<HTMLInputElement | null>(null);
  const [isLoading,setLoading] = useState(false);
  const [nameErr,setNameErr] = useState("")
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
    handleGetItem();
  }, []);

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    setLoading(true)
    setNameErr("")
    setResult(null)
    if(name){
        const result = await fetchData(name);
        console.log(result)
        if(result===null){
          setNameErr("Name is not correct or No purchase with this name Please contact us")
        }
        setResult(result)
    }else{
      setNameErr("Please enter your name-surname")
    }
    setLoading(false)
  }
  return (
   <div>
    <div className="w-[100dvw] min-h-[100dvh] flex justify-center font-barlow-regular pt-25">
     <div className="max-w-md min-w-100 mx-auto p-6 bg-white rounded-lg shadow space-y-4 h-fit">
      <Navbar amount={amount} control="have" />
      <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
        <div className="flex items-center justify-center text-[32px] font-bold">
          Check Order
        </div>
        <StyledTextField
          fullWidth
          label="Name - Surname"
          variant="outlined"
          value={name}
          inputRef={inputref2}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="flex justify-center gap-2 select-none cursor-pointer w-full bg-[#E53535] text-white py-2 px-4 rounded hover:bg-[#c52f2f] transition-colors"
        >
         {isLoading&&<img src="loading.gif" alt="loading" className="w-5"/>} Check
        </button>
        {nameErr !== '' && <div className="text-[#e53535]">{nameErr}</div>}
      </form>
      {result && 
        <div>
            <div className="text-[20px] font-bold">{result.name}</div>
            <div>{result.contact}</div>
            <div>Delivery Method : {result.pickup_method==='deli'?'Delivery':'Self Pick up @KMUTNB'}</div>
            {result.pickup_method!=='self' && <div>Address : {result.shipping_address}</div>}
            <div className="text-[#c5c5c5] font-[200]">if you want to change an order , feel free to contact us</div>
            {result.order_items.map((order,i)=>(
                <div key={i} className="flex gap-4 py-5 border-b-1 border-[#c5c5c5] justify-between">
                    <div className="flex gap-4">
                      <RenderImage color={order.color} number={order.number}/>
                    <div>
                      <div className="text-[18px] font-[500]">Nametag : {order.nametag}</div>
                    <div className="text-[#474747]">Number : {order.number}</div>
                    <div className="text-[#474747]">Color : {order.color}</div>
                    <div className="text-[#474747]">Size : {order.size.toUpperCase()}</div>
                    </div>
                    </div>
                    <div className="text-[20px]">{order.amount}x</div>
                </div>
            ))}
        </div>
        }
    </div>
   </div>
   <div className="py-10"><Footer/></div>
   </div>
  );
};

export default Page;
const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputLabel-root": {
    color: "#757575",
    fontSize: "14px",
    fontFamily: "Barlow Condensed",
    fontWeight: 400,
    margin: "-4px 4px",
  },
  "& .MuiInputLabel-shrink": {
    color: "#000",
    fontSize: "20px",
    fontFamily: "Barlow Condensed",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "#000",
    fontSize: "20px",
    fontFamily: "Barlow Condensed",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #CFCFCF",
    },
    "&:hover fieldset": {
      border: "1px solid #E53535",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      border: "2px solid #E53535",
    },
    height: "45px",
  },
  // 👇 ใส่ตรงนี้สำหรับข้อความที่พิมพ์
  "& .MuiOutlinedInput-input": {
    fontSize: "16px",
    fontFamily: "Barlow Condensed",
    fontWeight: 500,
    color: "#000", // สีของตัวอักษร
  },
}));
