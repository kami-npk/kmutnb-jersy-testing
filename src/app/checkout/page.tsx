"use client";
import { useEffect, useState ,useRef} from "react";
import Navbar from "../util/navbar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Building, ChevronDown, ChevronUp, Truck } from "lucide-react";
import RenderImage from "../util/renderImage";
import { Order } from "../type/order";
import { motion, AnimatePresence } from "framer-motion";
import QrGen from "./qrGen";
import { uploadData, uploadSlip } from "../supabase/service";
import UploadButton from "./uploadButton";
import Footer from "../section/footer/footer";
import { useRouter } from "next/navigation";
const Page = () => {
  const [name, setName] = useState("");
  const [method, setMethod] = useState("self");
  const [address, setAddress] = useState("");
  const [contact, setContract] = useState("");
  const [contactType, setContactType] = useState("");
  const [extend, setExtend] = useState(false);
  const [data, setData] = useState<Order[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const inputAddressRef = useRef<HTMLInputElement | null>(null);
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const inputContactRef = useRef<HTMLInputElement | null>(null);
  const [fileReq,setfileReq] = useState('')
  const [confirm,setConfirm] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const way = JSON.parse(sessionStorage.getItem("collect")!);
    const order = JSON.parse(sessionStorage.getItem("order")!);
    setData(order);
    setMethod(way);
  }, []);
  const calTotal = () => {
  const all = data.reduce((sum, i) => sum + i.amount, 0);
  const price = all >= 5 ? all * 325 : all * 339;
  const total = method === "deli" ? price + 50 : price;
  return { price, amout: all, total };
};
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if(method==='deli' && address===""){
        inputAddressRef.current?.focus();
        inputAddressRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
        return;
    }
    if(name === ''){
        inputNameRef.current?.focus();
        inputNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
        return;
    }
    if(contact===''){
        inputContactRef.current?.focus();
        inputContactRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
        return;
    }
    if(file===null){
        setfileReq('Please upload Bank slip to CONFIRM order')
        return;
    }
    setConfirm(true)
    const url = await uploadSlip(file!);
    const slipData = {
      name: name,
      pickup_method: method,
      contact: contact,
      order_items: data,
      slip_img_url: url,
      status: "pending",
      shipping_address: address,
    };
    const respond = await uploadData(slipData);
    if(respond){
        router.push('/confirmOrder');
    }
  };
  return (
    <div className="font-barlow-regular py-20">
      {confirm && <div className="bg-black/40 w-full h-full fixed z-1000 overflow-hidden pointer-events-auto"></div>}
      <Navbar control="have" amount={calTotal().amout} />
      <div className="mx-3 px-3 py-3 select-none">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setExtend((prev) => !prev)}
        >
          <p className="font-bold text-[20px]">Summary</p>
          <div className="flex gap-2">
            <p>
              {calTotal().total} THB ( {calTotal().amout} item )
            </p>
            {extend ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {extend && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <table className="w-full text-right">
                <tbody>
                  <tr>
                    <td className="pr-4 text-left">Price :</td>
                    <td>{calTotal().price} THB</td>
                  </tr>
                  {method === "deli" && (
                    <tr>
                      <td className="pr-4 text-left">Shipping Fee :</td>
                      <td>50 THB</td>
                    </tr>
                  )}
                  <tr className="font-bold">
                    <td className="pr-4 text-left">Total :</td>
                    <td>
                      {method === "deli"
                        ? calTotal().price + 50
                        : calTotal().price}{" "}
                      THB
                    </td>
                  </tr>
                </tbody>
              </table>
              {data.map((order, i) => (
                <div key={i} className="border-b border-[#CFCFCF] mx-6 py-6">
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
                        Number :{" "}
                        {order.number === "" ? '"blank"' : order.number}
                      </div>
                      <div className="text-[#707084] text-[14px]">
                        Color : {order.color}
                      </div>
                      <div className="text-[#707084] text-[14px]">
                        Size : {order.size}
                      </div>
                    </div>
                    <div>x{order.amount}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form
        onSubmit={handleConfirm}
        className="max-w-md mx-auto px-6 bg-white rounded-lg shadow space-y-4"
      >
        <h2 className="text-[30px] font-bold">Payment And Detail</h2>
        <div className="flex flex-col gap-2">
          {method === "self" ? (
            <div
              className={`border-1 border-[#CFCFCF] select-none h-10 flex px-7 items-center rounded-[4px]`}
            >
              <Building strokeWidth={1} className="mr-2" /> Self Pick at 8th
              floor ,40 Building KMUTNB
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div
                className={`border-1 border-[#CFCFCF] select-none h-10 flex px-7 items-center rounded-[4px]`}
              >
                <Truck strokeWidth={1} className="mr-2" />
                Delivery
              </div>
              <div>
                <StyledTextField
                  fullWidth
                  required
                  label="Shipping address"
                  variant="outlined"
                  value={address}
                  inputRef={inputAddressRef}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "80px",
                      alignItems: "flex-start",
                    },
                    "& .MuiOutlinedInput-input": {
                      paddingTop: "20px",
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <StyledTextField
            fullWidth
            required
            label="Name - Surname"
            variant="outlined"
            value={name}
            inputRef={inputNameRef}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledTextField
            fullWidth
            required
            label="Contact"
            variant="outlined"
            value={contact}
            inputRef={inputContactRef}
            onChange={(e) => setContract(e.target.value)}
          />
          <div className="flex gap-4">
            {["ig", "facebook", "line", "phone"].map((chart) => (
              <div
                key={chart}
                className={`${
                  contactType === chart ? "border-[#E53535] border-2" : ""
                } select-none transition-colors duration-300 cursor-pointer border-1 border-[#CFCFCF] h-8 w-fit px-3 flex items-center justify-center rounded-[3px]`}
                onClick={() => {
                  setContract(chart + " : ");
                  setContactType(chart);
                }}
              >
                {chart}
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <QrGen amount={calTotal().total} />
          <div className="my-3">
            <div className="text-[14px]">นายภูมิพัฒน์ ภักดีโต PromptPay</div>
            <p className="font-bold text-[20px]">
              {calTotal().total.toFixed(2)} THB
            </p>
          </div>
        </div>
        <div className="animate-shake text-red-500 text-[16px] flex justify-center">{fileReq}</div>
        <UploadButton onSelect={setFile} />
        <button
          type="submit"
          className="cursor-pointer w-full bg-[#E53535] text-white py-2 px-4 rounded hover:bg-[#c52f2f] transition-colors"
        >
          Confirm Order
        </button>
      </form>
      <div className="pt-15">
        <Footer/>
      </div>
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
    fontSize: "14px",
    fontFamily: "Barlow Condensed",
    fontWeight: 500,
    color: "#000", // สีของตัวอักษร
  },
}));
