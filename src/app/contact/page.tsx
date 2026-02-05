"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, ArrowDownRight } from "lucide-react";
import { countryCodes } from "@/data/countryCodes";

const Contact = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    category: "",
    subCategory: "",
    subject: "",
    message: "",
  });

  const normalizeSubcategory = (category: string | null, sub: string | null) => {
    if (!category || !sub) return null;
    const s = sub.trim();
    if (category === "Project") {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    if (category === "Services") {
      const upper = s.toUpperCase();
      if (upper.includes("INDOOR") || upper.includes("OUTDOOR")) return "Signage";
      if (upper.includes("BRAND")) return "Branding";
      if (upper.includes("WAYFIND")) return "Wayfinding";
      if (upper.includes("DESIGN")) return "Design";
      if (upper.includes("CONSULT")) return "Consultation";
      return null;
    }
    return null;
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const subParam = searchParams.get("subcategory");
    const mappedSub = normalizeSubcategory(categoryParam, subParam);
    setFormData(prev => ({
      ...prev,
      category: categoryParam || prev.category,
      subCategory: mappedSub ?? prev.subCategory,
    }));
  }, [searchParams]);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const categories = {
    "Project": ["Residential", "Commercial", "Plotting", "Office", "Educational", "Retail"],
    "Services": ["Signage", "Branding", "Wayfinding", "Design", "Consultation"],
    "Other": ["Career", "Partnership", "General Inquiry"]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit. Please try again.");
        return;
      }
      alert("Thank you! Your message has been saved. We will contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        category: "",
        subCategory: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "hello@signsoldesign.com",
      href: "mailto:hello@signsoldesign.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 9819334677",
      href: "tel:+919819334677"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Office",
      value: "Varun Arcade, Ghodbunder Road, Manpada, Thane West, Thane, Maharashtra",
      href: "#"
    }
  ];

  return (
    <main className="bg-black min-h-screen text-white relative overflow-hidden selection:bg-orange-500/30 font-sans">
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />
      </div>

      <Nav />
      
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-20 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Left Side: Editorial Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12"
          >
            <div className="sticky top-32">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Available for new projects</span>
                </motion.div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.9]">
                  Let's <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">talk.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 max-w-lg leading-relaxed mb-16 font-light">
                  Have a project in mind? We'd love to hear about it. Tell us your story and let's build something extraordinary together.
                </p>
                
                <div className="space-y-10 border-t border-white/10 pt-10">
                    {contactInfo.map((info, idx) => (
                        <motion.a
                            key={info.label}
                            href={info.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (idx * 0.1) }}
                            className="group flex items-start gap-6 hover:opacity-100 opacity-70 transition-all duration-300"
                        >
                            <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                                {info.icon}
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{info.label}</h3>
                                <p className="text-lg md:text-xl font-medium group-hover:text-white transition-colors max-w-xs">{info.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
          </motion.div>

          {/* Right Side: Minimalist Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-7/12"
          >
            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-orange-500/10 transition-colors duration-700" />
                
                <div className="space-y-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="group/input relative">
                            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors"
                                required
                            />
                        </div>
                        <div className="group/input relative">
                            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Section */}
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
                        <div className="group/input relative">
                             <label className="absolute left-0 -top-6 text-xs text-gray-500 transition-all duration-300 pointer-events-none">
                                Country Code
                            </label>
                             <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                             >
                                {countryCodes.map((c) => (
                                    <option key={c.code} value={c.dial_code} className="bg-black text-white">
                                        {c.name} ({c.dial_code})
                                    </option>
                                ))}
                             </select>
                        </div>
                        <div className="group/input relative">
                            <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'phone' || formData.phone ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Category Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="group/input relative">
                             <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.category ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                                Category
                            </label>
                             <select
                                name="category"
                                value={formData.category}
                                onChange={(e) => {
                                    setFormData({ ...formData, category: e.target.value, subCategory: "" });
                                }}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                                required
                             >
                                <option value="" disabled className="bg-black text-gray-500"></option>
                                {Object.keys(categories).map((cat) => (
                                    <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                ))}
                             </select>
                        </div>

                        <div className="group/input relative">
                             <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${formData.subCategory ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                                Sub Category
                            </label>
                             <select
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                disabled={!formData.category}
                                className={`w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer ${!formData.category ? 'opacity-50 cursor-not-allowed' : ''}`}
                                required
                             >
                                <option value="" disabled className="bg-black text-gray-500"></option>
                                {formData.category && categories[formData.category as keyof typeof categories].map((sub) => (
                                    <option key={sub} value={sub} className="bg-black text-white">{sub}</option>
                                ))}
                             </select>
                        </div>
                    </div>

                    <div className="group/input relative">
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || formData.subject ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                            Subject (Optional)
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>

                    <div className="group/input relative">
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message ? '-top-6 text-xs text-gray-500' : 'top-4 text-xl text-gray-400'}`}>
                            Tell us about your project
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={4}
                            className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors resize-none leading-relaxed"
                            required
                        />
                    </div>

                    <div className="pt-8 flex items-center justify-between">
                        <p className="text-gray-500 text-sm hidden md:block">
                            We promise not to spam you. <br />
                            Typically replies in 24 hours.
                        </p>
                        <Button type="submit" variant="primary" className="px-12 py-6 text-lg">
                            Send Message
                        </Button>
                    </div>
                </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer hideContactCta={true} />
    </main>
  );
};

export default Contact;
