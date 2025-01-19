import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header'
import Products from './components/products/Products';
import Sidebar from './components/sidebar/Sidebar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Footer from './components/footer/Footer';

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 50000]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cartCount, setCartCount] = useState(0)
  const [clicked, setClicked] = useState({})


  //Fetching the data from API

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    filterAndSortProducts();
  }, [selectedCategories, priceRange, sortBy]);


  //Filtering by Category

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };


  // Filtering by price range
  
  useEffect(() => {
    filterByPriceRange();
  }, [priceRange, products]);  

  const filterByPriceRange = () => {
    const filtered = products.filter(
      (product) =>
        (product.price * 82) >= priceRange[0] && (product.price * 82) <= priceRange[1]
    );
    setFilteredProducts(filtered);
    
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };


  //Sorting

  const handleSortChange = (sortCriteria) => {
    setSortBy(sortCriteria);
    setIsMenuOpen(false)
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(
      (product) =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (product.price * 82) >= priceRange[0] &&
      (product.price * 82) <= priceRange[1]
    );

    if (sortBy === 'Ratings') {
      filtered = filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortBy === 'Price: Low to High') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const searchProducts = products.filter(product => {
      return (
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredProducts(searchProducts);
  }, [searchQuery, products]); 


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} 
              setIsMenuOpen={setIsMenuOpen} 
              toggleMenu={toggleMenu} 
              cartCount={cartCount}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              scrollToTop={scrollToTop}/>
      <div className="content-wrapper">
        <Sidebar
          categories={categories}
          loading={loading}
          onCategoryChange={handleCategoryChange}
          onPriceRangeChange={handlePriceRangeChange}
          onSortChange={handleSortChange}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Products 
          products={filteredProducts} 
          loading={loading} 
          error={error} 
          clicked={clicked}
          setClicked={setClicked}
          setCartCount={setCartCount}/>
      </div>
      <div className="scroll-to-top-btn">
        <KeyboardArrowUpIcon onClick={scrollToTop} className='scroll-to-top-icon'/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
