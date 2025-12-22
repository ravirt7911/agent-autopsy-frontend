"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 sm:px-8 lg:px-12">
        <div 
          className={`w-full max-w-4xl text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="mb-6 text-5xl font-bold tracking-[-0.02em] text-gray-900 sm:text-6xl lg:text-7xl leading-[1.1]">
            Agent Autopsy
          </h1>
          <p className="mb-12 text-xl font-normal text-gray-600 sm:text-2xl leading-relaxed tracking-[-0.01em]">
            Get honest, actionable diagnosis in seconds. No fluff, just truth.
          </p>
          <Link
            href="/diagnose"
            className="inline-block rounded-lg bg-gray-900 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transform shadow-lg tracking-[-0.01em]"
          >
            Diagnose Agent Failure
          </Link>
        </div>

        {/* Explainer Section */}
        <div className="mt-32 w-full max-w-6xl">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
            <div 
              className={`group relative rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-[-0.02em]">
                  Pinpoint the exact failure point
                </h3>
              </div>
              <p className="text-[15px] font-normal text-gray-600 leading-relaxed tracking-[-0.01em]">
                We identify the specific step, tool, or reasoning chain where your agent failed—not vague "AI issues" or generic error messages.
              </p>
            </div>

            <div 
              className={`group relative rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-[-0.02em]">
                  Evidence-backed, not guesswork
                </h3>
              </div>
              <p className="text-[15px] font-normal text-gray-600 leading-relaxed tracking-[-0.01em]">
                Every diagnosis includes specific examples from your agent's execution logs, so you can see exactly what went wrong and why.
              </p>
            </div>

            <div 
              className={`group relative rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-[-0.02em]">
                  One clear fix, not a laundry list
                </h3>
              </div>
              <p className="text-[15px] font-normal text-gray-600 leading-relaxed tracking-[-0.01em]">
                Get a single, prioritized recommendation you can implement right away—no overwhelming lists of potential issues.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
