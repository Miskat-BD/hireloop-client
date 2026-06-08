import React from 'react';
// Importing requested icons from @gravity-ui/icons
import { LogoFacebook, LogoGithub, LogoLinkedin } from '@gravity-ui/icons';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-16 px-6 md:px-16 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Top Section: Brand & Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">

                    {/* Brand Column */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white font-bold text-xl">
                            {/* Fallback Purple Logo Icon matching image_447816.png */}
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm font-black">
                                P!
                            </div>
                            <div className="leading-tight">
                                Hire<br /><span className="text-gray-300 font-semibold text-lg">Loop</span>
                            </div>
                        </div>
                        <p className="text-sm max-w-sm text-gray-500 mt-2 leading-relaxed">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>
                    </div>

                    {/* Product Column */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h3 className="text-blue-500 font-medium mb-4 text-sm tracking-wide">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Job discovery</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Worker AI</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Salary data</a></li>
                        </ul>
                    </div>

                    {/* Navigations Column */}
                    <div className="md:col-span-2">
                        <h3 className="text-blue-500 font-medium mb-4 text-sm tracking-wide">Navigations</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Career library</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="md:col-span-2">
                        <h3 className="text-blue-500 font-medium mb-4 text-sm tracking-wide">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Brand Guideline</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section: Socials & Copyright */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <a href="#" className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center text-white hover:bg-zinc-800 transition-colors" aria-label="Facebook">
                            <LogoFacebook width={18} height={18} />
                        </a>
                        <a href="#" className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-colors" aria-label="Pinterest">
                            <LogoGithub width={18} height={18} />
                        </a>
                        <a href="#" className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center text-white hover:bg-zinc-800 transition-colors" aria-label="LinkedIn">
                            <LogoLinkedin width={18} height={18} />
                        </a>
                    </div>

                    {/* Legal / Copyright */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-500">
                        <span>Copyright 2024 — Programming Hero</span>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Terms & Policy</a>
                            <span>-</span>
                            <a href="#" className="hover:text-white transition-colors">Privacy Guideline</a>
                        </div>
                    </div>

                </div>

            </div>
        </footer>
    );
}