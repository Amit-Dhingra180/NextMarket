import Link from "next/link"
import { useContext, useEffect,useState } from "react"
import { ProductsContext } from "../../components/ProductsContext"


export default function Home() {
  const [productsInfo,setProductsInfo] = useState([])
  const [phrase,setPhrase] = useState([])

  //Fetching Products from api/products

  useEffect(() =>{
    fetch('/api/products')
    .then(response => response.json())
    .then(json => setProductsInfo(json))
  },[])

  const categoriesNames = [...new Set (productsInfo.map(p => p.category))];

  //Product filtering by name

  let products;
  if(phrase){
    products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase));
  }
  else{
    products = productsInfo;
  }

  const {selectedProducts} = useContext(ProductsContext);
  const {setSelectedProducts} = useContext(ProductsContext);

  function addProduct(_id){
    setSelectedProducts(prev => [...prev,_id]);
  }

  console.log()

  return (
    <div>
    <div className="p-5">
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="bg-gray-200 w-full py-2 px-4 rounded-xl"></input>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            <h2 className="text-2xl capitalize my-5">{categoryName}</h2>
            <div className="flex justify-around">
            {products.filter(p => p.category === categoryName).map(productInfo => (
              <div key={productInfo._id} className="px-5">
                <div className="w-64">
                  <div className=" bg-red-400 p-5 rounded-xl">
                    <img src={productInfo.picture}></img>
                  </div>
                  <div className="mt-2">
                    <h3 className=" font-bold text-lg">{productInfo.name}</h3>
                  </div>
                  <p className="text-sm mt-2">{productInfo.description}</p>
                  <div className="flex mt-2 leading-4">
                    <div className="text-2xl font-bold grow mt-5">${productInfo.price}</div>
                      <button onClick={() => addProduct(productInfo._id)} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
                    </div>
                  </div>
                </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
      <footer className="sticky bottom-0 text-white bg-black w-full flex justify-center space-x-24 p-5">
        <Link href={'/'}>Home</Link>
        <Link href={'/checkout'}>Cart {selectedProducts.length}</Link>
      </footer>
    </div>
  )
}

