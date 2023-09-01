import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../components/ProductsContext";


export default function CheckoutPage() {
  const { selectedProducts } = useContext(ProductsContext);
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [cname, setCname] = useState([]);
  const [mobileNumber, setMobileNumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const selectedProductsData = data.filter(product => selectedProducts.includes(product._id));
        setSelectedProductDetails(selectedProductsData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (selectedProducts.length > 0) {
      fetchProductDetails();
    } else {
      setSelectedProductDetails([]);
    }
  }, [selectedProducts]);

  // Adding quantity field to selected products

  const updatedProductDetails = selectedProductDetails.map((product) => {
    return {
      product: { ...product },
      quantity: selectedProducts.filter((id) => id === product._id).length,
    };
  });
  
  
  //Calculating Total Price

  let subTotal = 0;                                                           
  let delivery = 0;
  if(selectedProductDetails.length>0){
    delivery = 10;
  }
updatedProductDetails.forEach((product) => {
  subTotal += product.quantity * product.product.price;
});
const totalPrice = subTotal + delivery;

//trying to save order in database

const orderDetails = {
  Product_details: updatedProductDetails,
  Name:cname,
  Mobile_number:mobileNumber,
  Email_id:email,
  Address:address,
  Price: totalPrice,
};

useEffect(() => {
  console.log(orderDetails);
}, []); 

  return (
    <div>
      {selectedProductDetails.length > 0 ? (
        selectedProductDetails.map(product => (
          <div key={product._id} className="p-5 flex">
            <div className=" bg-gray-400 p-5 w-48 rounded-xl mr-5">
                <img src={product.picture}></img>
            </div>
            <div>
              <h3 className="py-2 font-bold text-lg">{product.name}</h3>
              <p>{product.description}</p>
              <div className="flex">
                <div className="font-bold grow">${product.price}</div>
                <div className="px-2">
                  <span className="px-2">Quantity: {selectedProducts.filter(id => id === product._id).length}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No selected products.</p>
      )}
        <div className="px-10 mt-5">
            <input value={cname} onChange={e =>setCname(e.target.value)} type="text" className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-3" placeholder="Name"></input>
            <input value={mobileNumber} onChange={e =>setMobileNumber(e.target.value)} type="text" className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-3"placeholder="Mobile Number"></input>
            <input value={email} onChange={e =>setEmail(e.target.value)} type="text" className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-3"placeholder="Email address"></input>
            <input value={address} onChange={e =>setAddress(e.target.value)} type="text" className="w-full bg-gray-200 rounded-lg px-4 py-2 mb-3"placeholder="Address"></input>
        </div>
        <div className="p-5">
          <div className="flex mb-2">
            <h3 className="grow">Subtotal: </h3>
            <h3>${subTotal}</h3>
          </div>
          <div className="flex mb-2">
            <h3 className="grow">Delivery: </h3>
            <h3>${delivery}</h3>
          </div>
          <div className="flex mb-2">
            <h3 className="grow">Total: </h3>
            <h3>${totalPrice}</h3>
          </div>
        </div>
        {selectedProductDetails.length > 0 ? (
        <div className="flex justify-center my-2">
          <Link href={"/submit"}>
            <button type="submit" className="bg-emerald-400 p-2 rounded-xl text-white">PAY ${totalPrice}</button>
          </Link>
        </div>
        ):(
          <div> </div> 
        )};
      <footer className="sticky bottom-0 text-white bg-black w-full flex justify-center space-x-24 p-5">
        <Link href={"/"}>Home</Link>
        <Link href={"/checkout"}>Cart</Link>
      </footer>
    </div>
  );
}





