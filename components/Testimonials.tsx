"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import testimonialsData from "@/data/testimonials.json";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-primary to-accent",
  "from-violet-500 to-primary",
  "from-accent to-emerald-400",
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-7 flex flex-col gap-5 shadow-sm h-full">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-navy/70 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${
            AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
          } flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-[11px] font-bold text-white">
            {getInitials(testimonial.name)}
          </span>
        </div>
        <div>
          <p className="text-sm font-bold text-navy leading-tight">{testimonial.name}</p>
          <p className="text-xs text-muted mt-0.5">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { testimonials } = testimonialsData;
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <div>
      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.12,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <TestimonialCard testimonial={t} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Desktop dots (decorative) */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/25"
          />
        ))}
      </div>

      {/* Mobile: single card with navigation */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          >
            <TestimonialCard testimonial={testimonials[active]} index={active} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:border-primary/40 hover:text-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === active
                    ? "w-5 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:border-primary/40 hover:text-primary transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
