import Link from "next/link";
import  orderDetails from "./index.js"

export default function SubmitPage() {
    return(
        <div>
            <div className="flex justify-center align-middle font-extrabold text-5xl">
                Order Recieved!
            </div>
            <div className="flex justify-center mt-10">
                Thank you {orderDetails.Name} for shopping with NextMarket
            </div>
            <footer className="sticky bottom-0 text-white bg-black w-full flex justify-center space-x-24 p-5 mt-8">
                <Link href={'/'}>Home</Link>
                <Link href={'/checkout'}>Cart</Link>
            </footer>
        </div>
    )
}
