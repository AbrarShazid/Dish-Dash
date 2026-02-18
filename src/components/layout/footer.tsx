"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Apple,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const companyLinks = [
    { title: "About us", url: "/about" },
    { title: "Contact us", url: "/contact" },
    { title: "Press", url: "/press" },
    { title: "How DishDash works", url: "/how-it-works" },
  ];

  const servicesLinks = [
    { title: "Food delivery", url: "/delivery" },
  
  ];

  const partnerLinks = [

    { title: "Terms & conditions", url: "/terms" },
    { title: "Refund & cancellation", url: "/refund" },
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com", label: "Youtube" },
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className={cn("bg-white dark:bg-[#171717] border-t", className)}>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
               DishDash
              </h2>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Order food from the best restaurants and shops with DishDash
             
            </p>

            {/* App Store Badges */}
       

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.url}
                  className="text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Company Links */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.url}
                        className="text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Services</h3>
                <ul className="space-y-3">
                  {servicesLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.url}
                        className="text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partner Links */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Partners</h3>
                <ul className="space-y-3">
                  {partnerLinks.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.url}
                        className="text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Description Text */}
        <div className="mt-8 p-6 bg-amber-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Bangladesh’s leading food delivery app with over 10,000+ restaurants
            along with amazing deals and services. Discover a world of culinary
            delights and flavorful experiences with DishDash, your ultimate food
            destination. We specialize and offer four different services which
            include – super-fast delivery.
          </p>
        </div>

        {/* <Separator className="my-8" /> */}

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 ">
            © Copyright 2026 DishDash Express Limited. All rights reserved.
          </p>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
