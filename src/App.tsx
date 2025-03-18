import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpring, animated } from '@react-spring/web';
import {
  Search,
  MapPin,
  AlertTriangle,
  Flame,
  Wind,
  Droplets,
  Thermometer,
  ArrowRight,
  Globe2,
  Bell,
  MessageSquare,
  Github,
  Twitter,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const FIRE_STATS = [
  { name: 'Jan', fires: 65 },
  { name: 'Feb', fires: 45 },
  { name: 'Mar', fires: 90 },
  { name: 'Apr', fires: 120 },
  { name: 'May', fires: 150 },
  { name: 'Jun', fires: 200 },
];

const RISK_LEVELS = [
  {
    level: 'Extreme',
    color: 'bg-red-500',
    regions: ['California', 'Oregon'],
    description: 'Immediate action required'
  },
  {
    level: 'High',
    color: 'bg-orange-500',
    regions: ['Arizona', 'Nevada'],
    description: 'High alert, monitoring required'
  },
  {
    level: 'Moderate',
    color: 'bg-yellow-500',
    regions: ['Washington', 'Idaho'],
    description: 'Regular monitoring advised'
  },
  {
    level: 'Low',
    color: 'bg-green-500',
    regions: ['Alaska', 'Montana'],
    description: 'Standard precautions sufficient'
  }
];

const LATEST_ALERTS = [
  {
    id: 1,
    location: 'Northern California',
    type: 'Active Fire',
    severity: 'High',
    time: '2 hours ago'
  },
  {
    id: 2,
    location: 'Southern Oregon',
    type: 'Fire Risk',
    severity: 'Moderate',
    time: '4 hours ago'
  },
  {
    id: 3,
    location: 'Eastern Washington',
    type: 'Smoke Alert',
    severity: 'Low',
    time: '6 hours ago'
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const alertsRef = useRef(null);
  const navRef = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Hero animations
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // Stats animations
    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });

    // Alerts animations
    gsap.from(".alert-card", {
      scrollTrigger: {
        trigger: alertsRef.current,
        start: "top 75%",
      },
      opacity: 0,
      x: -30,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  }, []);

  const navSpring = useSpring({
    backgroundColor: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0.5)',
    backdropFilter: isScrolled ? 'blur(16px)' : 'blur(12px)',
    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
    config: { tension: 300, friction: 20 }
  });

  const mobileMenuSpring = useSpring({
    transform: isMobileMenuOpen ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: isMobileMenuOpen ? 1 : 0,
    config: { tension: 300, friction: 26 }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <animated.nav 
        ref={navRef}
        style={navSpring}
        className="fixed w-full z-50 border-b border-gray-700/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative group cursor-pointer">
                <Flame className="w-8 h-8 text-orange-500 mr-2 transform transition-transform group-hover:scale-110 duration-300" />
                <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300">
                BlazeFix
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Predictions', 'Live Map', 'Analytics', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="relative group"
                >
                  <span className="text-gray-300 hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="relative px-4 py-2 rounded-lg border border-orange-500 text-orange-500 overflow-hidden group">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Sign In
                </span>
                <div className="absolute inset-0 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white transform hover:translate-y-[-1px] hover:shadow-lg hover:shadow-orange-500/20 active:translate-y-0 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <animated.div 
          style={mobileMenuSpring}
          className="md:hidden absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-lg border-b border-gray-700/50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {['Predictions', 'Live Map', 'Analytics', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-700/50">
                <button className="w-full px-4 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500/10 transition-colors duration-300 mb-2">
                  Sign In
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 transition-opacity duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </animated.div>
      </animated.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <animated.div style={fadeIn} className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Saving Forests,
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                {" "}One Prediction at a Time
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Advanced AI-powered forest fire prediction system helping protect our environment through early detection and prevention.
            </p>
            
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="flex items-center p-2 bg-gray-800/50 backdrop-blur-md rounded-full border border-gray-700/50">
                <div className="flex items-center flex-1 px-4">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Enter location to check fire risk..."
                    className="w-full py-3 bg-transparent outline-none text-white placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="hidden md:flex items-center border-l border-gray-700 px-4">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <button className="text-gray-400 hover:text-white transition-colors">
                    Use my location
                  </button>
                </div>
                <button className="ml-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center">
                  Check Risk
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stat-card bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">247</h3>
                    <p className="text-gray-400">Active Wildfires</p>
                  </div>
                </div>
              </div>
              
              <div className="stat-card bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">89%</h3>
                    <p className="text-gray-400">Prediction Accuracy</p>
                  </div>
                </div>
              </div>
              
              <div className="stat-card bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">1.2M</h3>
                    <p className="text-gray-400">Acres Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </section>
      
      {/* Risk Levels Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Current Risk Levels</h2>
            <p className="text-xl text-gray-300">
              Real-time fire risk assessment across different regions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RISK_LEVELS.map((risk, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl ${risk.color} bg-opacity-20 flex items-center justify-center mb-6`}>
                  <Flame className={`w-8 h-8 ${risk.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{risk.level}</h3>
                <p className="text-gray-400 mb-4">{risk.description}</p>
                <div className="space-y-2">
                  {risk.regions.map((region, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {region}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Analytics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Fire Trend Analytics</h2>
            <p className="text-xl text-gray-300">
              Historical data and predictive insights
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={FIRE_STATS}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="fires"
                    stroke="#f97316"
                    fillOpacity={1}
                    fill="url(#fireGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <Wind className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">Wind Speed</h3>
              </div>
              <p className="text-3xl font-bold">12 mph</p>
              <p className="text-gray-400">North-East</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <Droplets className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">Humidity</h3>
              </div>
              <p className="text-3xl font-bold">45%</p>
              <p className="text-gray-400">Relatively dry</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <Thermometer className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold">Temperature</h3>
              </div>
              <p className="text-3xl font-bold">84°F</p>
              <p className="text-gray-400">Above average</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Alerts Section */}
      <section ref={alertsRef} className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Alerts</h2>
            <p className="text-xl text-gray-300">
              Real-time updates from our monitoring system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LATEST_ALERTS.map((alert) => (
              <div 
                key={alert.id}
                className="alert-card bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold">{alert.type}</span>
                  </div>
                  <span className="text-sm text-gray-400">{alert.time}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{alert.location}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'High' ? 'bg-red-500' :
                    alert.severity === 'Moderate' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`} />
                  <span className="text-sm text-gray-300">{alert.severity} Risk</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50 hover:border-orange-500/50 transition-colors">
              View All Alerts
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center border border-orange-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to protect your community?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of communities using BlazeFix to predict and prevent forest fires.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                Get Started Now
              </button>
              <button className="px-8 py-4 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 text-white font-bold rounded-lg hover:border-orange-500/50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700/50 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <Flame className="w-8 h-8 text-orange-500 mr-2" />
                <span className="text-2xl font-bold">BlazeFix</span>
              </div>
              <p className="text-gray-400 mb-6">
                Advanced forest fire prediction and prevention through AI technology.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-orange-500/20 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-orange-500/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-orange-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Product</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Live Map</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Live Support</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 BlazeFix. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;