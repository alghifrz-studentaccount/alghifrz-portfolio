import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import content from '@/data/content.json'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface NavItem {
    name: string;
    href: string;
}

const Navbar = () =>  {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const { navbar } = content;
    const router = useRouter();

    // Throttle function using useRef to persist state
    const useThrottle = (func: (...args: unknown[]) => void, limit: number) => {
        const inThrottle = useRef(false);

        return useCallback((...args: unknown[]) => {
            if (!inThrottle.current) {
                func(...args);
                inThrottle.current = true;
                setTimeout(() => {
                    inThrottle.current = false;
                }, limit);
            }
        }, [func, limit]);
    };

    // Throttled scroll handler
    const throttledHandleScroll = useThrottle(() => {
        // Don't check on projects page
        if (router.pathname.startsWith('/projects')) return;

        const scrollPosition = window.scrollY;
        const headerOffset = 80; // Height of the navbar

        // Reset active section if at the top
        if (scrollPosition < headerOffset) {
            setActiveSection('');
            window.history.replaceState(null, '', window.location.pathname);
            return;
        }

        // Get all sections
        const sections = content.navbar.menuItems
            .filter((item: NavItem) => item.href.startsWith('/#'))
            .map((item: NavItem) => {
                const sectionId = item.href.replace('/#', '');
                const element = document.getElementById(sectionId);
                if (!element) {
                    console.warn(`Section with id "${sectionId}" not found`);
                    return null;
                }
                const rect = element.getBoundingClientRect();
                return {
                    id: sectionId,
                    element,
                    top: rect.top + window.pageYOffset - headerOffset,
                    bottom: rect.bottom + window.pageYOffset - headerOffset
                };
            })
            .filter(Boolean);

        // Find the current section
        let currentSection = '';
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && scrollPosition >= section.top && scrollPosition < section.bottom) {
                currentSection = section.id;
                break;
            }
        }

        // Update active section and URL hash if needed
        if (currentSection !== activeSection) {
            setActiveSection(currentSection);
            // Update URL hash without scroll
            if (currentSection) {
                window.history.replaceState(null, '', `/#${currentSection}`);
            } else {
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
    }, 100);

    useEffect(() => {
        setMounted(true)
        
        // Handle hash on page load
        if (window.location.hash) {
            const sectionId = window.location.hash.slice(1);
            setActiveSection(sectionId);
        }

        // Add scroll event listener
        window.addEventListener('scroll', throttledHandleScroll);
        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, [throttledHandleScroll])

    // Handle hash changes
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash) {
                const sectionId = window.location.hash.slice(1);
                setActiveSection(sectionId);
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                setActiveSection('');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen)

    const isActive = (path: string) => {
        // For home link
        if (path === '/') {
            return router.pathname === path && !activeSection;
        }
        
        // For projects page and its sub-pages
        if (path === '/projects') {
            return router.pathname.startsWith('/projects');
        }

        // For section links
        if (path.startsWith('/#')) {
            const section = path.replace('/#', '');
            return activeSection === section;
        }

        return false;
    }

    // Handle route changes
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url === '/projects') {
                setActiveSection('');
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const handleNavigation = async (item: NavItem) => {
        setIsOpen(false);
        
        if (item.href === '/projects') {
            // Set active section first to trigger the indicator animation
            setActiveSection('');
            // Use router.push with shallow to prevent full page reload
            await router.push('/projects', undefined, { shallow: true });
        } else if (item.href === '/') {
            setActiveSection('');
            await router.push('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Handle hash-based navigation
            const sectionId = item.href.replace('/#', '');
            
            // If we're on any projects page, navigate to home with hash
            if (router.pathname.startsWith('/projects')) {
                setActiveSection(sectionId);
                await router.push(`/#${sectionId}`);
                // Add a small delay to ensure the page is loaded
                await new Promise(resolve => setTimeout(resolve, 100));
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Smooth scroll with custom animation
                    const startPosition = window.pageYOffset;
                    const distance = offsetPosition - startPosition;
                    const duration = 800; // 0.8 seconds
                    let start: number | null = null;

                    function easeInOutCubic(t: number): number {
                        return t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }

                    function animation(currentTime: number) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Apply easing function
                        const ease = easeInOutCubic(progress);
                        
                        // Scroll to the calculated position
                        window.scrollTo(0, startPosition + distance * ease);

                        // Update URL hash based on current scroll position
                        const currentScroll = startPosition + distance * ease;
                        const sections = content.navbar.menuItems
                            .filter((item: NavItem) => item.href.startsWith('/#'))
                            .map((item: NavItem) => {
                                const id = item.href.replace('/#', '');
                                const el = document.getElementById(id);
                                if (!el) return null;
                                const rect = el.getBoundingClientRect();
                                return {
                                    id,
                                    top: rect.top + window.pageYOffset - headerOffset,
                                    bottom: rect.bottom + window.pageYOffset - headerOffset
                                };
                            })
                            .filter(Boolean);

                        // Find the current section based on scroll position
                        let currentSection = '';
                        for (const section of sections) {
                            if (section && currentScroll >= section.top && currentScroll < section.bottom) {
                                currentSection = section.id;
                                break;
                            }
                        }

                        // Update URL hash if section changed
                        if (currentSection && currentSection !== activeSection) {
                            window.history.replaceState(null, '', `/#${currentSection}`);
                            setActiveSection(currentSection);
                        }

                        // Continue animation if not complete
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    }

                    // Start the animation
                    requestAnimationFrame(animation);
                }
               
            } else if (router.asPath.endsWith('=404notfound')) {
                setActiveSection(sectionId);
                await router.push(`/#${sectionId}`);
                // Add a small delay to ensure the page is loaded
                await new Promise(resolve => setTimeout(resolve, 100));
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Smooth scroll with custom animation
                    const startPosition = window.pageYOffset;
                    const distance = offsetPosition - startPosition;
                    const duration = 800; // 0.8 seconds
                    let start: number | null = null;

                    function easeInOutCubic(t: number): number {
                        return t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }

                    function animation(currentTime: number) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Apply easing function
                        const ease = easeInOutCubic(progress);
                        
                        // Scroll to the calculated position
                        window.scrollTo(0, startPosition + distance * ease);

                        // Update URL hash based on current scroll position
                        const currentScroll = startPosition + distance * ease;
                        const sections = content.navbar.menuItems
                            .filter((item: NavItem) => item.href.startsWith('/#'))
                            .map((item: NavItem) => {
                                const id = item.href.replace('/#', '');
                                const el = document.getElementById(id);
                                if (!el) return null;
                                const rect = el.getBoundingClientRect();
                                return {
                                    id,
                                    top: rect.top + window.pageYOffset - headerOffset,
                                    bottom: rect.bottom + window.pageYOffset - headerOffset
                                };
                            })
                            .filter(Boolean);

                        // Find the current section based on scroll position
                        let currentSection = '';
                        for (const section of sections) {
                            if (section && currentScroll >= section.top && currentScroll < section.bottom) {
                                currentSection = section.id;
                                break;
                            }
                        }

                        // Update URL hash if section changed
                        if (currentSection && currentSection !== activeSection) {
                            window.history.replaceState(null, '', `/#${currentSection}`);
                            setActiveSection(currentSection);
                        }

                        // Continue animation if not complete
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    }

                    // Start the animation
                    requestAnimationFrame(animation);
                }
               
            } else {
                // Normal navigation within the home page
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Smooth scroll with custom animation
                    const startPosition = window.pageYOffset;
                    const distance = offsetPosition - startPosition;
                    const duration = 800; // 0.8 seconds
                    let start: number | null = null;

                    function easeInOutCubic(t: number): number {
                        return t < 0.5
                            ? 4 * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }

                    function animation(currentTime: number) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Apply easing function
                        const ease = easeInOutCubic(progress);
                        
                        // Scroll to the calculated position
                        window.scrollTo(0, startPosition + distance * ease);

                        // Update URL hash based on current scroll position
                        const currentScroll = startPosition + distance * ease;
                        const sections = content.navbar.menuItems
                            .filter((item: NavItem) => item.href.startsWith('/#'))
                            .map((item: NavItem) => {
                                const id = item.href.replace('/#', '');
                                const el = document.getElementById(id);
                                if (!el) return null;
                                const rect = el.getBoundingClientRect();
                                return {
                                    id,
                                    top: rect.top + window.pageYOffset - headerOffset,
                                    bottom: rect.bottom + window.pageYOffset - headerOffset
                                };
                            })
                            .filter(Boolean);

                        // Find the current section based on scroll position
                        let currentSection = '';
                        for (const section of sections) {
                            if (section && currentScroll >= section.top && currentScroll < section.bottom) {
                                currentSection = section.id;
                                break;
                            }
                        }

                        // Update URL hash if section changed
                        if (currentSection && currentSection !== activeSection) {
                            window.history.replaceState(null, '', `/#${currentSection}`);
                            setActiveSection(currentSection);
                        }

                        // Continue animation if not complete
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    }

                    // Start the animation
                    requestAnimationFrame(animation);
                }
            }

            
        }
    }

    if (!mounted) {
        return null;
    }
  
    return (
        <>
            <nav className="bg-black/50 text-white shadow-md fixed w-full z-50 backdrop-blur-xl py-2">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-1 md:py-1 flex justify-between items-center">
                    <div className="text-md md:text-xl font-bold">
                        <Link href="/">
                            <div className='flex items-center gap-2'>
                                <Image 
                                    src={activeSection === 'home' || activeSection === 'contact' ? "/logo.png" : "/logoW.png"} 
                                    alt="logo" 
                                    width={40} 
                                    height={40} 
                                />
                                {navbar.logo.text}
                                <span className="text-blue-400">{navbar.logo.highlight}</span>        
                            </div>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>

                    <ul className="hidden md:flex space-x-8 font-medium">
                        {navbar.menuItems.map((item) => (
                            <li key={`desktop-${item.href}`} className="relative">
                                <button 
                                    onClick={() => handleNavigation(item)}
                                    className={`relative py-2 px-1 ${
                                        isActive(item.href) 
                                            ? 'text-blue-400' 
                                            : 'text-gray-300 hover:text-white'
                                    } transition-colors duration-300 cursor-pointer`}
                                >
                                    {item.name}
                                    <AnimatePresence>
                                        {isActive(item.href) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ 
                                                    // type: "tween",
                                                    // duration: 0.3,
                                                    // ease: "easeInOut"
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            className="md:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-2 bg-black/80 backdrop-blur-xl">
                                <ul className="space-y-2">
                                    {navbar.menuItems.map((item) => (
                                        <motion.li 
                                            key={`mobile-${item.href}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button 
                                                onClick={() => handleNavigation(item)}
                                                className={`w-full text-left py-3 px-4 rounded-lg ${
                                                    isActive(item.href) 
                                                        ? 'bg-blue-400/20 text-blue-400' 
                                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                                } transition-all duration-300`}
                                            >
                                                {item.name}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
}

export default Navbar;