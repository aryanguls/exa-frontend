"use client"

import Link from "next/link";
import { JetBrains_Mono } from 'next/font/google';
import { useState } from "react";
import GridAnimation from './components/GridAnimation';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="h-screen w-screen relative overflow-hidden" onClick={() => setIsExpanded(false)}>
      {/* Grid Animation as background */}
      <div className="absolute inset-0">
        <GridAnimation />
      </div>

      <div className="relative h-full">
        {/* Main content area with fixed width */}
        <div 
          className="absolute inset-0 flex flex-col"
          onClick={(e) => {
            if (isExpanded) {
              e.stopPropagation();
              setIsExpanded(false);
            }
          }}
        >
          <div className="flex justify-center mb-6 mt-8">
            <div className="flex items-center space-x-3 bg-white bg-opacity-90 rounded-full px-8 py-2 text-md">
              <span className="hover:underline cursor-pointer">🎉 Announcing Exa Websets</span>
              <span>|</span>
              <span className="text-blue-600 hover:underline cursor-pointer">We're hiring</span>
            </div>
          </div>

          {/* Center content section */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Spacer to position content below the grid animation's focal point */}
              <div className="h-[45rem]" />
              
              <h2 className={`text-3xl mb-10 tracking-tighter text-white ${jetbrainsMono.className}`}>
                Exa offers business-grade <span className="text-blue-300">Search</span> and <span className="text-blue-300">Crawling</span> for any web data.
              </h2>
              
              <div className={`flex items-center justify-center space-x-4 mb-8 ${jetbrainsMono.className}`}>
                <button className="px-8 py-4 bg-black text-white border-2 border-black rounded-lg flex items-center hover:bg-black transition-colors">
                  <span className="mr-2">></span>
                  TRY API FOR FREE
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg flex items-center hover:border-blue-200 hover:text-blue-200 transition-colors">
                  <span>KNOW MORE</span>
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side vertical navigation */}
        <nav 
          onClick={(e) => {
            e.stopPropagation();
            if (!isExpanded) {
              setIsExpanded(true);
            } else {
              setIsExpanded(false);
            }
          }}
          className={`absolute right-0 top-0 bottom-0 flex flex-col items-stretch border-l border-white/20 bg-blue-700 transition-[width] duration-300 ease-in-out cursor-pointer ${isExpanded ? 'w-48' : 'w-16'} ${jetbrainsMono.className}`}
        >
          {/* Logo button */}
          <div className="h-16 border-b border-white/20 relative">
            <div className={`absolute inset-0 flex items-start pt-4 transition-all duration-300 ${isExpanded ? 'pl-10' : 'pl-12'}`}>
              <div className="w-8 h-8 relative">
                <svg 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ height: '24px' }}
                  viewBox="0 0 278 100" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 0H78.1818V7.46269L44.8165 50L78.1818 92.5373V100H0V0ZM39.5825 43.1172L66.6956 7.46269H12.4695L39.5825 43.1172ZM8.79612 16.3977V46.2687H31.5111L8.79612 16.3977ZM31.5111 53.7313H8.79612V83.6023L31.5111 53.7313ZM12.4695 92.5373L39.5825 56.8828L66.6956 92.5373H12.4695Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Top priority buttons */}
          <Link 
            href="/api-dashboard" 
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                e.preventDefault();
                setIsExpanded(true);
              }
            }}
            className="flex items-center text-sm p-4 text-white bg-black transition-colors hover:bg-black/80 whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">></span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              API DASHBOARD
            </span>
          </Link>

          <Link
            href="/websets"
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                e.preventDefault();
                setIsExpanded(true);
              }
            }}
            className="flex items-center text-sm p-4 bg-white text-blue-700 transition-colors hover:bg-white/90 whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">⊞</span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              WEBSETS
            </span>
          </Link>

          {/* Spacer to push remaining buttons to bottom */}
          <div className="flex-grow"></div>

          {/* Bottom buttons */}
          <Link 
            href="/products" 
            onClick={(e) => !isExpanded ? e.preventDefault() : null}
            className="flex items-center text-sm p-4 text-white transition-colors hover:bg-black hover:text-white whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">+</span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            PRODUCTS
            </span>
          </Link>

          <Link 
            href="/company" 
            onClick={(e) => !isExpanded ? e.preventDefault() : null}
            className="flex items-center text-sm p-4 text-white transition-colors hover:bg-black hover:text-white whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">%</span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            COMPANY
            </span>
          </Link>
          

          <Link 
            href="/pricing" 
            onClick={(e) => !isExpanded ? e.preventDefault() : null}
            className="flex items-center text-sm p-4 text-white transition-colors hover:bg-black hover:text-white whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">$</span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              PRICING
            </span>
          </Link>

          <Link 
            href="/docs"
            onClick={(e) => !isExpanded ? e.preventDefault() : null}
            className="flex items-center text-sm p-4 text-white transition-colors hover:bg-black hover:text-white whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">//</span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              DOCS
            </span>
          </Link>

          <Link 
            href="/search"
            onClick={(e) => !isExpanded ? e.preventDefault() : null}
            className="flex items-center text-sm p-4 text-white transition-colors hover:bg-black hover:text-white whitespace-nowrap"
          >
            <span className="flex-shrink-0 w-8 flex justify-center">🔍</span>
            <span className={`transition-opacity duration-300 ml-auto ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              SEARCH
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}