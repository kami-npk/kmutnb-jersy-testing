"use client";
import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import AddOrderPopup from "./addOrderPopup";
import { Order } from "@/app/type/order";
import { ShoppingCart } from "lucide-react";
type Props = {
  detect : () => void;
  setcolor : (color:string) => void;
  onNameChng? : (name:string) => void;
  onNumChng? : (num:string) => void;
  onNumberType? :(type:number) => void;
}
const OrderSection:React.FC<Props> = ({detect,setcolor,onNameChng,onNumChng,onNumberType}) => {
  const [Colorselected, setColorSelected] = useState("EFEFEF");
  const [sizeSelected, setSizeSelected] = useState("m");
  const sizeChart = [
    { size: "m", chest: "44", long: "27" },
    { size: "l", chest: "46", long: "28" },
    { size: "xl", chest: "48", long: "29" },
    { size: "2xl", chest: "50", long: "30" },
    { size: "3xl", chest: "52", long: "31" },
  ];
  const [nameTag, setnameTag] = useState("");
  const [numberType, setNumberType] = useState(1);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(1);
  const inputref = useRef<HTMLInputElement | null>(null);
  const inputref2 = useRef<HTMLInputElement | null>(null);
  const [nameTageErr, setNameTagErr] = useState(false);
  const [nameTagCountChar, setNameTagCountChar] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const handleNameTagChange = (value: string) => {
    const nameTag = value;

    const regex = /^[A-Za-z0-9]*$/;

    if (!regex.test(nameTag)) {
      setNameTagErr(true);
    } else {
      setNameTagErr(false);
    }

    if (nameTag.length <= 20) {
      setNameTagCountChar(nameTag.length);
      setnameTag(value);
      onNameChng?.(value);
    }
  };
  const handleClickCircle = () => {
    if (inputref.current) {
      inputref.current.focus();
    }
    setNumberType(2);
    onNumberType?.(2)
  };
  const onIncrease = () => {
    setAmount((i) => i + 1);
  };
  const onDecrease = () => {
    if (amount > 1) {
      setAmount((i) => i - 1);
    }
  };
  const handleNumberChange = (value: string) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      return;
    } else {
    }
    if (value.length <= 4) {
      setNumber(value);
      onNumChng?.(value)
    }
  };
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameTageErr) {
      inputref2.current?.focus(); // โฟกัสไปที่ช่องที่ error
      inputref2.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setNameTagErr(false);
      requestAnimationFrame(() => {
        setNameTagErr(true);
      });
      return;
    }
    const order = {
      color: Colorselected === "EFEFEF" ? "white" : "black",
      size: sizeSelected,
      nametag: nameTag,
      number: numberType === 1 ? "GGEZ" : number,
      amount: amount,
    };
    setSessionStorage(order);
    setOpenPopup(true);
    setTimeout(() => {
      setOpenPopup(false);
    }, 2000);
    console.log(order);
    detect();
  };
  const setSessionStorage = (data: Order) => {
    if (sessionStorage.getItem("order")) {
      const olddata:Order[] = JSON.parse(sessionStorage.getItem("order")||"[]")
      const newdata = [...olddata,data];
      sessionStorage.setItem('order',JSON.stringify(newdata));
    } else {
      sessionStorage.setItem("order", JSON.stringify([data]));
    }
    const cart = JSON.parse(sessionStorage.getItem('order')!);
    console.log(cart)

  };
  return (
    <div className="font-barlow-regular">
      <AddOrderPopup isOpen={openPopup}/>
      <form
        onSubmit={handleOnSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
      >
        <h2 className="text-[30px] font-bold">KMUTNB E-Sport Jersey 2025</h2>

        <div className="flex">
          <label className="block text-[16px] font-medium">Color : </label>
          <div className="flex items-center px-3 gap-2">
            {["EFEFEF", "180F28"].map((color) => (
              <div
                key={color}
                onClick={() => {
                  setColorSelected(color);
                  setcolor(color);
                }}
                style={{
                  backgroundColor: `#${color}`,
                  borderColor: `#${color}`,
                }}
                className={`w-[25px] h-[25px] rounded-full cursor-pointer ${
                  Colorselected === color
                    ? `border-4 border-[#${color}]`
                    : "border-0"
                }`}
              >
                {Colorselected === color && (
                  <div className="w-full h-full rounded-full border-3 border-white" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            {Colorselected === "EFEFEF" ? "White" : "Black"}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex">
            <label className="flex text-[16px] font-medium pr-4 justify-center items-center">
              Size :{" "}
            </label>
            <div className="flex gap-2">
              {sizeChart.map((chart) => (
                <div
                  key={chart.size}
                  className={`${
                    sizeSelected === chart.size
                      ? "border-[#E53535] border-2"
                      : ""
                  } select-none transition-colors duration-300 cursor-pointer border-1 border-[#CFCFCF] h-8 w-10 flex items-center justify-center rounded-[3px]`}
                  onClick={() => setSizeSelected(chart.size)}
                >
                  {chart.size}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[14px] text-[#454545]">
            Detail: Chest :{" "}
            {sizeChart.find((i) => i.size === sizeSelected)?.chest} inch Long :{" "}
            {sizeChart.find((i) => i.size === sizeSelected)?.long} inch
          </div>
        </div>
        <div>
          <StyledTextField
            fullWidth
            label="Name Tag"
            variant="outlined"
            value={nameTag}
            inputRef={inputref2}
            onChange={(e) => handleNameTagChange(e.target.value)}
          />
          <div className="flex gap-3">
            <p
              className={`${
                nameTagCountChar >= 20 ? "text-[#E53535]" : "text-[#CFCFCF]"
              }`}
            >
              {nameTagCountChar}/20
            </p>
            <p
              className={`${
                nameTageErr ? "text-[#E53535] animate-shake" : ""
              } text-[14px]`}
            >
              *Type in English letters and numbers
            </p>
          </div>
          <p className="text-[14px] ml-10">
            You can leave this empty if you prefer
          </p>
        </div>
        {nameTageErr}
        <div className="mt-2">
          <label className="flex text-[16px] font-medium pr-4">Number :</label>
          <div className="flex flex-col gap-6 mt-2 ml-4">
            <div
              className="flex gap-2"
              onClick={() => {
                setNumberType(1);
                onNumberType?.(1);
              }}
            >
              <div
                style={{
                  backgroundColor: `#fff`,
                  borderColor: numberType === 1 ? `#E53535` : `#E53535a0`,
                }}
                className={`w-[25px] h-[25px] rounded-full cursor-pointer border-3 border-[#000]`}
              >
                {numberType === 1 && (
                  <div className="w-full h-full bg-[#E53535] rounded-full border-3 border-white" />
                )}
              </div>
              <div className="justify-center itens-center flex">6GE2</div>
            </div>
            <div>
              <div
                className="flex gap-2 justify-center items-center"
                onClick={() => handleClickCircle()}
              >
                <div
                  style={{
                    backgroundColor: `#fff`,
                    borderColor: numberType !== 1 ? `#E53535` : `#E53535a0`,
                  }}
                  className={`w-[25px] h-[25px] rounded-full cursor-pointer border-3 border-[#000]`}
                >
                  {numberType !== 1 && (
                    <div className="w-full h-full bg-[#E53535] rounded-full border-3 border-white" />
                  )}
                </div>
                <StyledTextField
                  fullWidth
                  label="Your Number"
                  variant="outlined"
                  onChange={(e) => handleNumberChange(e.target.value)}
                  type="text"
                  value={number}
                  inputRef={inputref}
                  slotProps={{
                    input: {
                      inputMode: "numeric", // แสดง numpad บนมือถือ
                      inputProps: {
                        pattern: "[0-9]*", // HTML attribute pattern
                      },
                    },
                  }}
                  sx={{
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield", // Firefox
                    },
                  }}
                />
              </div>
              <p className={`text-[14px] mt-1 ml-8`}>
                *Limit 4 Digit or You can leave this empty if you prefer
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label>Amount : </label>
          <div className="h-[40px] w-[80px] flex border-1 border-[#CFCFCF] rounded-[5px]">
            <div
              onClick={() => onDecrease()}
              className={`${
                amount === 1 ? "text-[#CFCFCF]" : ""
              } hover:bg-[#f8f8f8] border-r-1 border-[#CFCFCF] hover: select-none cursor-pointer h-full w-[25%] flex justify-center items-center font-extrabold text-[20px]`}
            >
              -
            </div>
            <div className={`h-full w-[50%]  flex justify-center items-center`}>
              <p>{amount}</p>
            </div>
            <div
              onClick={() => onIncrease()}
              className="border-l-1 border-[#CFCFCF] hover:bg-[#f8f8f8] select-none cursor-pointer h-full w-[25%]  flex justify-center items-center font-extrabold"
            >
              +
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center gap-2 select-none cursor-pointer w-full bg-[#E53535] text-white py-2 px-4 rounded hover:bg-[#c52f2f] transition-colors"
        >
          <ShoppingCart/>Add to Cart
        </button>
      </form>
    </div>
  );
};
export default OrderSection;

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
