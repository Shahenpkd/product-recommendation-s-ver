import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Sparkles, TrendingUp, Star, ArrowRight, Zap, Filter, Heart, ExternalLink } from 'lucide-react';

const ProductRecommendationApp = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [route, setRoute] = useState(window.location.hash === '#/about' ? 'about' : 'home');
  const mouseRef = useRef({ x: 0, y: 0 });

  const fullText = "AI-Powered Product Discovery";
  
  // Mock product results for demonstration
  const mockResults = [
    {
      id: 1,
      name: "Nike Air Max 270",
      price: "$129.99",
      originalPrice: "$160.00",
      rating: 4.8,
      reviews: 2341,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "Running Shoes",
      match: 95
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: "$139.99",
      originalPrice: "$180.00",
      rating: 4.7,
      reviews: 1876,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
      category: "Running Shoes",
      match: 92
    },
    {
      id: 3,
      name: "Allbirds Tree Runner",
      price: "$98.00",
      rating: 4.6,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
      category: "Eco-Friendly",
      match: 89
    }
  ];

  // Animated counter hook
  const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return [count, elementRef];
  };

  const [productCount] = useCountUp(10000000, 2000);
  const [accuracyCount] = useCountUp(95, 1500);
  const [userCount] = useCountUp(50000, 2500);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setAnimatedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simple hash-based routing for About page
  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash === '#/about' ? 'about' : 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goToAbout = () => {
    window.location.hash = '#/about';
  };

  const goHome = () => {
    window.location.hash = '#/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const features = [
    { 
      icon: Sparkles, 
      text: "AI-Driven Suggestions", 
      desc: "Smart algorithms analyze your preferences using advanced machine learning",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: TrendingUp, 
      text: "Trending Products", 
      desc: "Stay ahead with real-time trending items and market insights",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Star, 
      text: "Personalized Results", 
      desc: "Recommendations tailored specifically to your unique preferences",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const examplePrompts = [
    "Find me a gaming laptop with RTX graphics",
    "Show me budget laptops under $800",
    "I need a laptop for video editing",
    "Find me a lightweight ultrabook for travel"
  ];

  return (
    <div className="app">
      {/* Enhanced Background */}
      <div className="background">
        <div className="blob purple"></div>
        <div className="blob green"></div>
        <div className="blob blue"></div>
        <div className="mesh-gradient"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 4}`}></div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="brand" onClick={goHome} style={{cursor: 'pointer'}}>
          <div className="logo">
            <ShoppingBag className="icon" />
          </div>
          <span className="brand-name">Advanced Product Recommendation System</span>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={goToAbout}>About</button>
          <button className="nav-link">Features</button>
          <button className="cta-button">
            <span>Get Started</span>
            <div className="button-shimmer"></div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        {route === 'about' ? (
          <div className="hero" style={{textAlign: 'left'}}>
            <div className="badge">
              <Zap className="badge-icon" />
              <span>About This Capstone</span>
            </div>
            <h1 className="hero-title">Team Members</h1>
            <p className="hero-desc" style={{maxWidth: 900}}>
              Below are the contributors to this project along with their registration numbers.
            </p>
            <div className="features" style={{marginTop: '2rem'}}>
              <div className="feature-card tilt-card">
                <h3>Abdulla Shahensha Razwaa</h3>
                <p>Reg No: 22BCE9149</p>
              </div>
              <div className="feature-card tilt-card">
                <h3>Binayak Sinha</h3>
                <p>Reg No: 22BCE8642</p>
              </div>
              <div className="feature-card tilt-card">
                <h3>Vudathu Rahul</h3>
                <p>Reg No: 22BCE9172</p>
              </div>
              <div className="feature-card tilt-card">
                <h3>Kanithi Tirumala Satya Sathvik</h3>
                <p>Reg No: 22BCE8492</p>
              </div>
            </div>
          </div>
        ) : (
        <div className="hero">
          <div className="badge">
            <Zap className="badge-icon" />
            <span>Powered by Advanced AI</span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text blur-reveal">{animatedText}</span>
            <span className="cursor">|</span>
          </h1>

          <p className="hero-desc blur-reveal">
            Transform your shopping experience with intelligent product recommendations. 
            Simply describe what you're looking for, and let our AI find the perfect matches.
          </p>

          {/* Enhanced Search Interface */}
          <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Describe the product you're looking for..."
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="search-input"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className="search-btn magnetic-btn"
              >
                {isLoading ? (
                  <div className="advanced-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                  </div>
                ) : (
                  <>
                    <span>Find Products</span>
                    <ArrowRight className="arrow" />
                    <div className="button-ripple"></div>
                  </>
                )}
              </button>
            </div>
            <div className="search-glow"></div>
          </div>

          {/* Example Prompts */}
          <div className="examples">
            <p>Try these examples:</p>
            <div className="example-list">
              {examplePrompts.map((example, index) => (
                <button 
                  key={index} 
                  onClick={() => setPrompt(example)} 
                  className="example-btn floating-btn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Results Section */}
        {route === 'home' && showResults && (
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">Laptop Matches Found</h2>
              <div className="results-filters">
                <button className="filter-btn">
                  <span>Filters</span>
                </button>
              </div>
            </div>
            <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Dummy laptop product results, no images */}
              {[{
                product_name: "ASUS ROG Strix G16, AMD Ryzen 9 8940HX, Gaming Laptop (RTX 5050-8GB/115W TGP/16GB RAM/1TB SSD/FHD+/16''/165Hz/90Whr/Windows 11)",
                brand: "ASUS",
                series: "ROG Strix G16",
                colour: "Eclipse Gray",
                form_factor: "Gaming Laptop",
                standing_screen_display_size: "16 Inches",
                screen_resolution: "1920 x 1200",
                processor_type: "Ryzen 9",
                ram_gb: 16,
                storage_gb: 1000,
                graphics_coprocessor: "NVIDIA GeForce RTX 5050",
                operating_system: "Windows 11 Home",
                mrp: 144990,
                selling_price: 140640,
                discount: 3.0,
                rating: 4.8,
                reviews_count: 30
              }, {
                product_name: "HP Pavilion Aero 13, AMD Ryzen 7, 16GB RAM, 512GB SSD, 13.3'' WUXGA, Windows 11 Home",
                brand: "HP",
                series: "Pavilion Aero 13",
                colour: "Silver",
                form_factor: "Ultrabook",
                standing_screen_display_size: "13.3 Inches",
                screen_resolution: "1920 x 1200",
                processor_type: "Ryzen 7",
                ram_gb: 16,
                storage_gb: 512,
                graphics_coprocessor: "AMD Radeon",
                operating_system: "Windows 11 Home",
                mrp: 89999,
                selling_price: 74999,
                discount: 16.7,
                rating: 4.5,
                reviews_count: 18
              }].map((product, index) => (
                <div key={index} className="product-card" style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(31,41,55,0.98) 80%, rgba(59,130,246,0.08) 100%)',
                  borderRadius: '1rem',
                  boxShadow: '0 2px 24px rgba(168,85,247,0.10)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  color: '#f3f4f6',
                  border: '1px solid rgba(255,255,255,0.07)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s',
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white', marginBottom: '0.5rem', letterSpacing: '0.01em' }}>{product.product_name}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.95rem', color: '#d1d5db' }}>
                    <div><strong style={{color:'#a855f7'}}>Brand:</strong> {product.brand}</div>
                    <div><strong style={{color:'#10b981'}}>Series:</strong> {product.series}</div>
                    <div><strong style={{color:'#3b82f6'}}>Color:</strong> {product.colour}</div>
                    <div><strong style={{color:'#f472b6'}}>Form Factor:</strong> {product.form_factor}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem', color: '#d1d5db' }}>
                    <div><strong style={{color:'#facc15'}}>Display:</strong> {product.standing_screen_display_size} ({product.screen_resolution})</div>
                    <div><strong style={{color:'#a3e635'}}>Processor:</strong> {product.processor_type}</div>
                    <div><strong style={{color:'#34d399'}}>RAM:</strong> {product.ram_gb} GB</div>
                    <div><strong style={{color:'#60a5fa'}}>Storage:</strong> {product.storage_gb} GB SSD</div>
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#d1d5db' }}>
                    <strong style={{color:'#f472b6'}}>Graphics:</strong> {product.graphics_coprocessor}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#d1d5db' }}>
                    <strong style={{color:'#a855f7'}}>OS:</strong> {product.operating_system}
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '1rem', color: '#f3f4f6', marginTop: '0.5rem' }}>
                    <div><strong style={{color:'#facc15'}}>MRP:</strong> ₹{product.mrp.toLocaleString()}</div>
                    <div><strong style={{color:'#10b981'}}>Price:</strong> ₹{product.selling_price.toLocaleString()}</div>
                    <div><strong style={{color:'#a855f7'}}>Discount:</strong> {product.discount}%</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '1rem', color: '#f3f4f6' }}>
                    <div><strong style={{color:'#f472b6'}}>Rating:</strong> {product.rating} / 5</div>
                    <div><strong style={{color:'#3b82f6'}}>Reviews:</strong> {product.reviews_count}</div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 70%)',
                    zIndex: 0,
                  }}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Features */}
        {route === 'home' && (
          <div className="features">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card tilt-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`feature-icon bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="icon" />
                </div>
                <h3>{feature.text}</h3>
                <p>{feature.desc}</p>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Stats */}
        {route === 'home' && (
          <div className="stats">
            <div className="stat-item">
              <div className="stat-value">{productCount.toLocaleString()}+</div>
              <p>Products Analyzed</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">{accuracyCount}%</div>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-item">
              <div className="stat-value">{userCount.toLocaleString()}+</div>
              <p>Happy Users</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© Advanced Product Recommendation System | Capstone Project</p>
      </footer>
    </div>
  );
};

export default ProductRecommendationApp;