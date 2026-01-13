"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 bg-stone-900/30 border border-stone-800 text-center">
        <h3 className="text-2xl font-medium text-white mb-4">
          Thank You!
        </h3>
        <p className="text-stone-400 mb-6">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-stone-400 hover:text-white transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-stone-400 text-sm mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 text-white placeholder-stone-600 focus:border-stone-600 focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-stone-400 text-sm mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 text-white placeholder-stone-600 focus:border-stone-600 focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-stone-400 text-sm mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 text-white placeholder-stone-600 focus:border-stone-600 focus:outline-none transition-colors"
          placeholder="Your company name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className="block text-stone-400 text-sm mb-2">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 text-white focus:border-stone-600 focus:outline-none transition-colors"
          >
            <option value="">Select a service</option>
            <option value="ai-automation">AI & Automation</option>
            <option value="mobile-app-development">Mobile App Development</option>
            <option value="web-development">Web Development</option>
            <option value="game-development">Game Development</option>
            <option value="3d-modeling">3D Modeling & Animation</option>
            <option value="custom-software">Custom Software</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-stone-400 text-sm mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 text-white focus:border-stone-600 focus:outline-none transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-250k">$100,000 - $250,000</option>
            <option value="250k+">$250,000+</option>
            <option value="not-sure">Not Sure Yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-stone-400 text-sm mb-2">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-stone-900/50 border border-stone-800 px-4 py-3 text-white placeholder-stone-600 focus:border-stone-600 focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your project, goals, and timeline..."
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-stone-500 text-xs text-center">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-stone-400">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
