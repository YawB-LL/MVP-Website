"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Globe, Shield, TrendingUp } from "lucide-react"
import { Button } from "./button"
import { Modal } from "./modal"
import { TypeformEmbed } from "./typeform-embed"
import { trackEvent } from "@/lib/analytics"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const openModal = () => {
    setIsModalOpen(true)
    setIsOpen(false) // Close mobile menu if open
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout)
      }
    }
  }, [dropdownTimeout])

  // Handle pending navigation after route changes
  useEffect(() => {
    if (pendingNavigation && pathname === "/") {
      // Wait for the page to fully load, then scroll to section
      const timer = setTimeout(() => {
        scrollToSection(pendingNavigation)
        setPendingNavigation(null)
      }, 500) // Increased delay for better reliability
      
      return () => clearTimeout(timer)
    }
  }, [pathname, pendingNavigation])

  // Define which sections are pages vs homepage sections
  const pageRoutes = ["blog", "press", "careers", "contact"]
  const homepageSections = ["hero", "how-it-works", "pain-points", "trust", "about"]

  const handleNavClick = (section: string) => {
    trackEvent("navbar_click", { section })
    
    // Always close mobile menu and dropdown
    setIsOpen(false)
    setActiveDropdown(null)
    
    // Handle external page navigation
    if (pageRoutes.includes(section)) {
      console.log(`Navigating to page: /${section}`)
      router.push(`/${section}`)
      return
    }
    
    // Handle homepage sections
    if (homepageSections.includes(section)) {
      // If we're not on homepage, navigate there first
      if (pathname !== "/") {
        console.log(`Navigating from ${pathname} to homepage, then to section: ${section}`)
        setPendingNavigation(section)
        router.push("/")
        return
      }
      
      // If already on homepage, scroll directly to section
      console.log(`Already on homepage, scrolling to section: ${section}`)
      // Add small delay to ensure mobile menu animation completes
      setTimeout(() => {
        scrollToSection(section)
      }, 100)
    }
  }

  const scrollToSection = (section: string) => {
    if (section === "hero") {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      return
    }

    // Find the target element with retry logic
    const attemptScroll = (attempts = 0) => {
      const targetElement = document.getElementById(section)
      
      console.log(`Attempt ${attempts + 1}: Looking for section: ${section}, found:`, targetElement)
      
      if (targetElement) {
        scrollToElement(targetElement)
      } else if (attempts < 5) {
        // Retry up to 5 times with increasing delays
        const delay = 200 + (attempts * 100)
        console.log(`Section ${section} not found, retrying in ${delay}ms...`)
        setTimeout(() => attemptScroll(attempts + 1), delay)
      } else {
        console.warn(`Section with id "${section}" not found after ${attempts + 1} attempts`)
        // Debug: List all sections on the page
        const allSections = document.querySelectorAll('section[id], div[id]')
        console.log('Available sections on page:', Array.from(allSections).map(s => s.id))
        
        // Fallback: scroll to top if section not found
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
    }
    
    attemptScroll()
  }

  const scrollToElement = (element: HTMLElement) => {
    // Get the actual navbar height dynamically
    const navbarElement = document.querySelector('nav')
    const navbarHeight = navbarElement ? navbarElement.offsetHeight : 80
    
    // Add some extra padding for better visual spacing
    const extraPadding = 20
    const elementPosition = element.offsetTop - navbarHeight - extraPadding
    
    console.log(`Scrolling to element at position: ${elementPosition}`)
    console.log(`Element offsetTop: ${element.offsetTop}`)
    console.log(`Navbar height: ${navbarHeight}`)
    
    // Ensure we don't scroll to negative positions
    const finalPosition = Math.max(0, elementPosition)
    
    console.log(`Final scroll position: ${finalPosition}`)
    
    // Smooth scroll to the element
    window.scrollTo({
      top: finalPosition,
      behavior: "smooth"
    })
  }

  const handleDropdownEnter = (itemName: string) => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setActiveDropdown(itemName)
  }

  const handleDropdownLeave = () => {
    // Add a delay before closing the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 300) // 300ms delay for better stability
    setDropdownTimeout(timeout)
  }

  const navItems = [
    { name: "Home", href: "hero" },
    { 
      name: "Platform", 
      href: "how-it-works",
      dropdown: [
        { name: "How It Works", href: "how-it-works", icon: TrendingUp },
        { name: "Investment Process", href: "pain-points", icon: Shield },
        { name: "Regulatory Compliance", href: "trust", icon: Shield }
      ]
    },
    { name: "About", href: "about" },
    { name: "Blog", href: "blog" },
    { name: "Careers", href: "careers" },
    { name: "Contact", href: "contact" }
  ]

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-base/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick("hero")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-highlight rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                LandLedger
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <button
                      className="flex items-center gap-2 text-text hover:text-primary transition-colors duration-300 py-2"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-text hover:text-primary transition-colors duration-300 py-2 relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-text hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                        >
                          <dropdownItem.icon className="w-4 h-4 text-primary" />
                          <span>{dropdownItem.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 hover:border-primary/40"
              >
                Join Waitlist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              {isOpen ? <X className="w-5 h-5 text-text" /> : <Menu className="w-5 h-5 text-text" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-base/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-left text-text hover:text-primary transition-colors duration-300 py-3"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-2 mt-2 border-l border-white/10 pl-4"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <button
                                  key={dropdownItem.name}
                                  onClick={() => handleNavClick(dropdownItem.href)}
                                  className="flex items-center gap-3 w-full text-left text-text-secondary hover:text-primary transition-colors duration-300 py-2 cursor-pointer"
                                >
                                  <dropdownItem.icon className="w-4 h-4 text-primary" />
                                  <span>{dropdownItem.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left text-text hover:text-primary transition-colors duration-300 py-3"
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={openModal}
                    className="inline-flex items-center gap-3 w-full bg-gradient-to-r from-primary to-highlight hover:from-primary/90 hover:to-highlight/90 text-white font-bold py-3 rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 justify-center border-2 border-primary/20 hover:border-primary/40"
                  >
                    Join Waitlist
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-20" />

      {/* Typeform Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        size="xl"
        className="max-h-[90vh] overflow-hidden"
      >
        <TypeformEmbed
          formId="NYKX0LYM"
          title="Join the Waitlist"
          onClose={closeModal}
        />
      </Modal>
    </>
  )
}