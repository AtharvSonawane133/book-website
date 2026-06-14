import React from 'react';
import { Globe, Mail, Share2 } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-amber-400 flex items-center justify-center shadow">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M3 7v10c0 1.1.9 2 2 2h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7V5c0-1.1.9-2 2-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="text-white font-bold text-lg">GranthAlaya</div>
          </div>
          <p className="text-sm text-slate-400">Premium Indian bookstore and learning platform — curated books and verified courses.</p>
          <div className="flex items-center gap-3 mt-4">
            <a className="p-2 rounded hover:bg-white/5" href="#" title="Visit our website"><Globe size={18} /></a>
            <a className="p-2 rounded hover:bg-white/5" href="mailto:support@granthalaya.in" title="Email us"><Mail size={18} /></a>
            <a className="p-2 rounded hover:bg-white/5" href="#" title="Share"><Share2 size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/free" className="hover:text-white">Free Reads</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Help & Policies</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Return Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Secure Shopping</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm text-slate-400">Based in New Delhi, India</p>
          <p className="text-sm mt-2">Support: <a href="mailto:support@granthalaya.in" className="text-white">support@granthalaya.in</a></p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-slate-800 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <div>© {new Date().getFullYear()} GranthAlaya — All rights reserved.</div>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <div className="text-xs text-slate-400">Visa</div>
            <div className="text-xs text-slate-400">Mastercard</div>
            <div className="text-xs text-slate-400">RuPay</div>
            <div className="text-xs text-slate-400">UPI</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
