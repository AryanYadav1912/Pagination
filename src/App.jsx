import { useEffect, useState } from 'react'
import axios from 'axios'



function App() {

  const[products, setProducts] = useState([]);
  const[page,setPage] = useState(1);

  const fetchProducts = async() =>{
    const {data} = await axios(`https://dummyjson.com/products?limit=100`);

    if(data && data.products){
      setProducts(data.products);
    }

    
    
  }
  console.log(products);
  useEffect(() => {
    fetchProducts()
  }, [])

  const handlePage = (selectedPage) =>{
    if(selectedPage >0 && selectedPage <= products.length/10 && selectedPage !== page)
    setPage(selectedPage);
  }


  return (
    <>
    {products.length >0 && (
      <div className='products'>{products.slice(page*10-10,page*10).map((prod)=>{
        return(

          <span className='products__single' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span>
          </span>
        )

      })}</div>
    )}
    {
      products.length >0 && <div className='pagination'>
        <span onClick={() => handlePage(page-1)}>👈</span>
        {
          [...Array(products.length/10)].map((_,i)=>{
            return <span 

              className={page === i+1 ? "pagination__selected" : ""}
              onClick={() => handlePage(i+1)} 
              key={i}>
              {i+1}
              </span>
          })
        }
        <span onClick={()=>handlePage(page+1)}>👉</span>

      </div>
    }

      
    </>
  )
}

export default App
