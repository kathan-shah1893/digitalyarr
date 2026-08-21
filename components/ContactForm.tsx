"use client";

import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

/* -- Options -------------------------------- */

const serviceOptions = [
  "Software & Application Development",
  "API & Integration",
  "Cloud & Infrastructure",
  "Cybersecurity",
  "AI & Automation",
  "IT Support & Managed Services",
  "Identity & Access Management",
  "Other",
];

/* -- Types --------------------------------- */

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  agreed: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  agreed?: string;
}

const INITIAL: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  description: "",
  agreed: false,
};

/* -- Validation ------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!data.description.trim()) {
    errors.description = "Please describe your project or requirement.";
  } else if (data.description.trim().length < 20) {
    errors.description = "Please provide at least 20 characters so we can understand your needs.";
  }

  if (!data.agreed) {
    errors.agreed = "You must agree to the Terms & Conditions and Privacy Policy to proceed.";
  }

  return errors;
}

/* -- Component ------------------------------- */

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* Mark a field as touched when the user leaves it */
  const handleBlur = useCallback(
    (field: keyof FormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const errs = validate({ ...form });
      setErrors(errs);
    },
    [form]
  );

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    const updated = { ...form, [name]: newValue } as FormData;
    setForm(updated);

    /* Clear any previous submission error when the user edits the form */
    if (submitError) setSubmitError(null);

    /* Re-validate touched fields live */
    if (touched[name as keyof FormData]) {
      setErrors(validate(updated));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    /* Mark all validatable fields as touched and run full validation */
    const allTouched: Partial<Record<keyof FormData, boolean>> = {
      name: true,
      email: true,
      phone: true,
      description: true,
      agreed: true,
    };
    setTouched(allTouched);

    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      /* Focus the first field with an error */
      const firstErrorKey = Object.keys(errs)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.focus();
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const message = [
        "New Contact Form Submission — DigitalYarr",
        "==========================================",
        "",
        "CONTACT DETAILS",
        "",
        `Name:    ${form.name}`,
        `Email:   ${form.email}`,
        `Phone:   ${form.phone}`,
        `Company: ${form.company.trim() || "Not provided"}`,
        "",
        "PROJECT DETAILS",
        "",
        `Service Required: ${form.service || "Not specified"}`,
        "",
        "PROJECT DESCRIPTION",
        "",
        form.description,
        "",
        "==========================================",
        "Submitted via the DigitalYarr Contact Us form.",
      ].join("\n");

      const res = await fetch(
        "https://mail-service-zxbn.onrender.com/send-email-digitalyarr",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "New DigitalYarr Contact Form Submission",
            message,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      setForm(INITIAL);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or reach us directly at contactus@digitalyarr.com."
      );
    } finally {
      setLoading(false);
    }
  }

  /* - Success state ---------------------------- */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-3">Message received</h3>
        <p className="text-muted max-w-sm leading-relaxed">
          Thank you for reaching out. A member of the DigitalYarr team will be in touch shortly
          to discuss your requirements.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm(INITIAL); setErrors({}); setTouched({}); }}
          className="mt-8 text-sm text-primary hover:text-primary-dark font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* - Styles ------------------------------- */
  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-surface text-navy text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${errors[field] && touched[field as keyof FormData] ? "border-red-400" : "border-border"}`;

  const labelBase = "block text-sm font-medium text-navy mb-1.5";

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project enquiry form">
      <div className="space-y-6">

        {/* Name + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelBase}>
              Full Name{" "}
              <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              placeholder="Jane Smith"
              aria-describedby={errors.name && touched.name ? "name-error" : undefined}
              aria-invalid={!!(errors.name && touched.name)}
              className={inputClass("name")}
            />
            {errors.name && touched.name && (
              <FieldError id="name-error" message={errors.name} />
            )}
          </div>

          <div>
            <label htmlFor="company" className={labelBase}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Corp"
              className={`${inputBase} border-border`}
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelBase}>
              Email Address{" "}
              <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="jane@company.com"
              aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              aria-invalid={!!(errors.email && touched.email)}
              className={inputClass("email")}
            />
            {errors.email && touched.email && (
              <FieldError id="email-error" message={errors.email} />
            )}
          </div>

          <div>
            <label htmlFor="phone" className={labelBase}>
              Phone Number{" "}
              <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              placeholder="+91 98980 00000"
              aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
              aria-invalid={!!(errors.phone && touched.phone)}
              className={inputClass("phone")}
            />
            {errors.phone && touched.phone && (
              <FieldError id="phone-error" message={errors.phone} />
            )}
          </div>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className={labelBase}>
            Service Required
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${inputBase} border-border cursor-pointer`}
          >
            <option value="">Select a service…</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelBase}>
            Project Description{" "}
            <span className="text-primary" aria-hidden="true">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            value={form.description}
            onChange={handleChange}
            onBlur={() => handleBlur("description")}
            placeholder="Please describe your technology challenge or project requirement…"
            aria-describedby={errors.description && touched.description ? "description-error" : undefined}
            aria-invalid={!!(errors.description && touched.description)}
            className={`${inputClass("description")} resize-none`}
          />
          {errors.description && touched.description && (
            <FieldError id="description-error" message={errors.description} />
          )}
        </div>

        {/* Terms & Privacy checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              id="agreed"
              name="agreed"
              type="checkbox"
              checked={form.agreed}
              onChange={handleChange}
              onBlur={() => handleBlur("agreed")}
              aria-describedby={errors.agreed && touched.agreed ? "agreed-error" : undefined}
              aria-invalid={!!(errors.agreed && touched.agreed)}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2 flex-shrink-0 cursor-pointer accent-primary"
            />
            <span className="text-sm text-muted leading-relaxed">
              I agree to the{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
              >
                Privacy Policy
              </Link>
              .{" "}
              <span className="text-primary" aria-hidden="true">*</span>
            </span>
          </label>
          {errors.agreed && touched.agreed && (
            <FieldError id="agreed-error" message={errors.agreed} />
          )}
        </div>

        {/* Required fields note */}
        <p className="text-xs text-muted">
          Fields marked <span className="text-primary font-medium" aria-hidden="true">*</span>{" "}
          are required.
        </p>

        {/* Submission error banner */}
        {submitError && (
          <div role="alert" className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
            {submitError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {loading ? (
            <>
              <span
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* -- Field Error helper -------------------------- */

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
      <AlertCircle size={12} aria-hidden="true" className="flex-shrink-0" />
      {message}
    </p>
  );
}
