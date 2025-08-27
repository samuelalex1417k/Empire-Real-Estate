'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LuLogIn, LuLogOut, LuPhone, LuMenu } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { FaUser  } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

export default function Navbar(props) {
  const { navClass, navJustify } = props;
  const [isMenu, setIsMenu] = useState(false);
  const [manu, setManu] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const pathname = usePathname();

  useEffect(() => {
    setManu(pathname);
    const windowScroll = () => {
      const navbar = document.getElementById("topnav");
      const scrolled = window.scrollY >= 50;
      setIsScrolled(scrolled);
      if (navbar) {
        navbar.classList.toggle('nav-sticky', scrolled);
      }
    };
    window.addEventListener("scroll", windowScroll);
    windowScroll();
    return () => { window.removeEventListener('scroll', windowScroll); };
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
      }
    }
    
  }, []);
const activeClass = "text-[#947e03]";
const defaultClass = isMenu ? "text-black" : (isScrolled ? "text-black" : "text-white");


  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const form = e.target;
    const username = form.username?.value?.trim();
    const password = form.password?.value?.trim();
    const email = !isLogin ? form.email?.value?.trim() : '';
    const confirm_Password = !isLogin ? form.confirm_password?.value?.trim() : '';

    if (!username || !password || (!isLogin && (!email || !confirm_Password))) {
      setErrorMsg('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirm_Password) {
      setErrorMsg('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const url = isLogin ? `${API_URL}/token/` : `${API_URL}/users/register/`;
      const payload = isLogin
        ? { username, password }
        : { username, email, password, confirm_password: confirm_Password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data.message || data.detail || data.username?.[0] || 'Authentication failed';
        setErrorMsg(msg);
        setLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.access);
        try {
          const decoded = jwtDecode(data.access);
          const usernameFromToken = decoded.username || decoded.user_name || decoded.user_id || '';
          localStorage.setItem('username', usernameFromToken);
        } catch (error) {
          console.error('JWT decode error:', error);
          localStorage.removeItem('username');
        }
        setIsAuthenticated(true);
        setShowLoginModal(false);
      } else {
        setIsLogin(true);
        setErrorMsg('Registration successful! Please login.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }

  return (
    <nav id="topnav" className={`defaultscroll ${navClass === "nav-light" ? '' : navClass === "nav-sticky" ? 'nav-white' : ''}`}>
      <div className="container relative flex justify-between items-center">
        <Link className="logo flex items-center" href="/">
          <span className="inline-block dark:hidden">
            <Image src="/images/2-removebg-preview.png" className="l-dark" width={115} height={23} alt="Justice RealEstate Logo Dark" />
            <Image src="/images/1-removebg-preview.png" className="l-light" width={117} height={23} alt="Justice RealEstate Logo Light" />
          </span>
          <Image src="/images/1-removebg-preview.png" width={115} height={23} className="hidden dark:inline-block" alt="Justice RealEstate Logo Dark Mode" />
        </Link>

        <div className="flex items-center">
          <button className="md:hidden p-2" onClick={() => setIsMenu(!isMenu)}>
            <LuMenu className="text-2xl" />
          </button>
          <ul className={`navigation-menu ${navClass} ${navJustify} ${isMenu ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4`}>
            <li><Link href="/"><span className={`transition-colors duration-200 hover:text-[#947e03] ${manu === "/" ? activeClass : defaultClass}`}>HOME</span></Link></li>
            <li><Link href="/listing"><span className={`transition-colors duration-200 hover:text-[#947e03] ${manu === "/listing" ? activeClass : defaultClass}`}>Properties</span></Link></li>
            <li><Link href="/blog"><span className={`transition-colors duration-200 hover:text-[#947e03] ${manu === "/blog" ? activeClass : defaultClass}`}>Blog</span></Link></li>
            <li><Link href="/aboutUs"><span className={`transition-colors duration-200 hover:text-[#947e03] ${manu === "/aboutUs" ? activeClass : defaultClass}`}>More</span></Link></li>
            <li><Link href="/contact"><span className={`transition-colors duration-200 hover:text-[#947e03] ${manu === "/contact" ? activeClass : defaultClass}`}>Contact us</span></Link></li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="tel:+251962493083"
            className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-300 text-base text-center rounded-full bg-[#947e03]/5 hover:bg-[#947e03] border border-[#947e03] hover:border-[#947e03] text-[#947e03] hover:text-white transition-all p-2"
          >
            <LuPhone className="size-4" />
          </a>

          {isAuthenticated && (
            <Link
              href="/user-dashboard"
              className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#947e03] hover:bg-[#ffffff] hover:text-[#947e03] border border-[#947e03] hover:border-[#947e03] text-white p-2"
            >
              <FaUser  className="size-4" />
            </Link>
          )}

          {!isAuthenticated ? (
            <button onClick={() => { setShowLoginModal(true); setIsLogin(true); setErrorMsg(''); }} className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#947e03] hover:bg-[#ffffff] hover:text-[#947e03] border border-[#947e03] hover:border-[#947e03] text-white p-2">
              <LuLogIn className="size-4" />
            </button>
          ) : (
            <button onClick={handleLogout} className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-[#947e03] hover:bg-[#ffffff] hover:text-[#947e03] border border-[#947e03] hover:border-[#947e03] text-white p-2">
              <LuLogOut className="size-4" />
            </button>
          )}
        </div>
      </div>

      {showLoginModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg relative"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="hidden md:flex w-1/2 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/real/property/single/4.jpg')` }}
            >
              <div className="bg-[#ffffff44] w-full">
                <div className="bg-[#ffffffb5] mt-55">
                  <h2 className="text-2xl text-[#947e03] text-center font-bold">
                    {isLogin ? "Welcome Back!" : "Join Us!"}
                  </h2>
                  <p className="text-sm text-black text-center">
                    {isLogin
                      ? "Login to explore more."
                      : "Create an account to get started with us."}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 relative flex flex-col justify-between">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-2 right-4 text-2xl text-black dark:text-white"
              >
                &times;
              </button>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-[#947e03]">
                  <b>{isLogin ? 'Login' : 'Sign Up'}</b>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input type="text" name="username" id="username" className="w-full h-10 px-3 py-2 border rounded-2xl font-normal bg-white dark:bg-gray-800 text-black dark:text-white" placeholder='Username' />
                  </div>

                  {!isLogin && (
                    <div>
                      <input type="email" name="email" id="email" className="w-full h-10 px-3 py-2 border rounded-2xl font-normal bg-white dark:bg-gray-800 text-black dark:text-white" placeholder='Email' />
                    </div>
                  )}

                  <div>
                    <input type="password" name="password" id="password" className="w-full h-10 px-3 py-2 border rounded-2xl font-normal bg-white dark:bg-gray-800 text-black dark:text-white" placeholder='Password' />
                  </div>

                  {!isLogin && (
                    <div>
                      <input type="password" name="confirm_password" id="confirm_password" className="w-full h-10 px-3 py-2 border rounded-2xl font-normal bg-white dark:bg-gray-800 text-black dark:text-white" placeholder='Confirm Password' />
                    </div>
                  )}

                  {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                  <button type="submit" disabled={loading} className="w-full mt-2 py-2 bg-[#947e03] text-white rounded-md">
                    {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Sign Up')}
                  </button>
                </form>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  className="text-[#947e03] underline"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrorMsg('');
                  }}
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
}
