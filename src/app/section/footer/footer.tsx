import Link from "next/link";
const Footer = () =>{
    return (
        <div className="h-fit font-barlow-regular mx-4 px-4 py-5 border-t-1 border-[#CFCFCF] flex flex-col">
            © 2025 KMUTNB E-SPORTS CLUB
            <div>Contact</div>
            <div className="flex gap-7">
                <Link href="https://www.facebook.com/KMUTNBEsports">Facebook</Link>
                <Link href="https://www.facebook.com/KMUTNBEsports">Instagram</Link>
            </div>
        </div>
    )
}
export default Footer;