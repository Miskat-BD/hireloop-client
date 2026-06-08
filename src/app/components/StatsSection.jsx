"use client";

import { Briefcase, Factory, PersonMagnifier, Star } from "@gravity-ui/icons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    {
      id: 1,
      icon: <Briefcase className="h-6 w-6" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: <Factory className="h-6 w-6" />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <PersonMagnifier className="h-6 w-6" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <Star className="h-6 w-6" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      {/* Background Globe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: "url('/images/globe.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glow Effect */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-medium leading-relaxed text-white/90 md:text-4xl">
            Assisting over 15,000 job seekers
            <br />
            find their dream positions.
          </h2>

          {/* Job Type Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.span
              animate={{ rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
            >
              🏠 Remote Jobs
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
            >
              🏢 On-site Jobs
            </motion.span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div
          ref={ref}
          className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:border-violet-500/30 hover:bg-white/[0.05]">
                {/* Card Glow */}
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-white/5 blur-3xl transition duration-500 group-hover:bg-violet-500/30 group-hover:blur-2xl" />

                {/* Icon */}
                <div className="relative z-10 text-violet-400 transition duration-300 group-hover:text-violet-300 group-hover:scale-110">
                  {stat.icon}
                </div>

                {/* Number */}
                <h3 className="relative z-10 mt-8 text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </h3>

                {/* Label */}
                <p className="relative z-10 mt-3 text-sm text-gray-400">
                  {stat.label}
                </p>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}