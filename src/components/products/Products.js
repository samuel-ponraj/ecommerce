import React from "react";
import './Products.css'
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton'; 
import { toast, Toaster } from 'sonner';
import 'aos/dist/aos.css'

const Products = ({products, loading, error, setCartCount, clicked, setClicked}) => {
    
   
  if (loading) {
    return (
      <div className="product-list">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="product" >
            <Skeleton variant="rectangular" width="100%" height={250} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="100%" height={50} />
            <Skeleton variant="text" width="30%" height={30} />
            <Skeleton variant="rounded" width="50%" height={30} style={{ margin: '10px auto', display: 'block' }} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
   console.log(error)
  }

  return (
    <>
    <Toaster position="top-center" richColors /> 
    <div className="product-list">
    {products.map((product) => (
            <div key={product.id} className="product" >
            <img src={product.image} alt={product.title} />
            <p>{product.category.toUpperCase()}</p>
                <div className="rating">
                    <Rating name="read-only" value={product.rating.rate} readOnly size="small"/>
                    <p>{product.rating.rate}</p>
                </div>
            <h4>{product.title}</h4>
            <h3>₹{(product.price * 82).toFixed(2)}</h3>
            <button
                onClick={() => {
                    if (clicked[product.id] === 'Added to cart') {
                    setClicked(prevClicked => ({ ...prevClicked, [product.id]: 'Add to cart' }));
                    setCartCount(prevCount => Math.max(0, prevCount - 1));
                    toast.info('Item removed from the cart!');
                    } else {
                    setClicked(prevClicked => ({ ...prevClicked, [product.id]: 'Added to cart' }));
                    setCartCount(prevCount => prevCount + 1);
                    toast.success('Item added to the cart!');
                    }
                }}
                >
                {clicked[product.id] === 'Added to cart' ? 'Added to cart' : 'Add to cart'}
            </button>
            </div>
        ))}
      
    </div>
    </>
  );
};

export default Products;
