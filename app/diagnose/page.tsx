"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FailurePoint {
  step_number: number;
  step_description: string;
  reason: string;
}

interface DiagnosisResult {
  verdict: string;
  verdict_summary: string;
  impact_statement: string;
  explanation: string;
  evidence: string[];
  recommended_fix: string;
  confidence: string;
  failure_point?: FailurePoint;
}

export default function DiagnosePage() {
  const [formData, setFormData] = useState({
    agent_goal: "",
    instructions: "",
    execution_steps: "",
    final_output: "",
    expected_output: "",
  });
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://agent-autopsy-backend.vercel.app/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_goal: formData.agent_goal,
          instructions: formData.instructions,
          execution_steps: formData.execution_steps,
          final_output: formData.final_output,
          expected_output: formData.expected_output || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to diagnose agent failure. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      agent_goal: "",
      instructions: "",
      execution_steps: "",
      final_output: "",
      expected_output: "",
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors tracking-[-0.01em]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-[-0.02em] leading-tight">
            Diagnose Agent Failure
          </h1>
          <p className="mt-2 text-lg font-normal text-gray-600 leading-relaxed tracking-[-0.01em]">
            Provide details about your agent's execution to get a precise diagnosis.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[60%_40%]">
          {/* Left Side: Form */}
          <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="agent_goal"
                  className="block text-sm font-semibold text-gray-900 tracking-[-0.01em]"
                >
                  Agent Goal
                </label>
                <textarea
                  id="agent_goal"
                  name="agent_goal"
                  value={formData.agent_goal}
                  onChange={handleChange}
                  placeholder="What was the agent supposed to do?"
                  required
                  className="w-full min-h-[120px] rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-all tracking-[-0.01em] leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-semibold text-gray-900 tracking-[-0.01em]"
                >
                  Instructions Given
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="What instructions or system prompt did it have?"
                  required
                  className="w-full min-h-[120px] rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-all tracking-[-0.01em] leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="execution_steps"
                  className="block text-sm font-semibold text-gray-900 tracking-[-0.01em]"
                >
                  Execution Steps
                </label>
                <textarea
                  id="execution_steps"
                  name="execution_steps"
                  value={formData.execution_steps}
                  onChange={handleChange}
                  placeholder="Paste the agent's execution trace here..."
                  required
                  className="w-full min-h-[120px] rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-all tracking-[-0.01em] leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="final_output"
                  className="block text-sm font-semibold text-gray-900 tracking-[-0.01em]"
                >
                  Final Output
                </label>
                <textarea
                  id="final_output"
                  name="final_output"
                  value={formData.final_output}
                  onChange={handleChange}
                  placeholder="What did the agent actually produce?"
                  required
                  className="w-full min-h-[120px] rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-all tracking-[-0.01em] leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="expected_output"
                  className="block text-sm font-semibold text-gray-900 tracking-[-0.01em]"
                >
                  Expected Output <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <textarea
                  id="expected_output"
                  name="expected_output"
                  value={formData.expected_output}
                  onChange={handleChange}
                  placeholder="What should it have produced? (optional)"
                  className="w-full min-h-[120px] rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 transition-all tracking-[-0.01em] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 transform shadow-lg tracking-[-0.01em]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing agent failure...
                  </span>
                ) : (
                  "Diagnose Failure"
                )}
              </button>

              {error && (
                <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-800 tracking-[-0.01em]">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Results Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {result && (
              <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-sm space-y-6 animate-fade-in-up">
                {/* Verdict */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-[-0.02em] leading-tight">
                    {result.verdict}
                  </h2>
                  {result.verdict_summary && (
                    <p className="text-base font-normal text-gray-600 leading-relaxed tracking-[-0.01em]">
                      {result.verdict_summary}
                    </p>
                  )}
                </div>

                {/* Impact Statement */}
                {result.impact_statement && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                      Impact
                    </h3>
                    <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
                      <p className="text-sm font-medium text-gray-900 leading-relaxed tracking-[-0.01em]">
                        {result.impact_statement}
                      </p>
                    </div>
                  </div>
                )}

                {/* Explanation */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Explanation
                  </h3>
                  <p className="text-base font-normal text-gray-700 leading-relaxed tracking-[-0.01em]">
                    {result.explanation}
                  </p>
                </div>

                {/* Failure Point */}
                {result.failure_point && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                      Failure Point
                    </h3>
                    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
                      <p className="text-sm font-medium text-gray-900 leading-relaxed tracking-[-0.01em]">
                        <span className="font-semibold">Step {result.failure_point.step_number}:</span>{" "}
                        {result.failure_point.step_description} — {result.failure_point.reason}
                      </p>
                    </div>
                  </div>
                )}

                {/* Evidence */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Evidence
                  </h3>
                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4 space-y-3">
                    <ul className="space-y-2 text-sm font-normal text-gray-700 leading-relaxed tracking-[-0.01em]">
                      {result.evidence.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-gray-400 font-medium">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Fix */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Recommended Fix
                  </h3>
                  <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-gray-900 leading-relaxed tracking-[-0.01em]">
                      {result.recommended_fix}
                    </p>
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold tracking-[-0.01em] ${
                      result.confidence.toLowerCase().includes("high")
                        ? "bg-green-100 text-green-800 border-2 border-green-200"
                        : result.confidence.toLowerCase().includes("medium")
                        ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-200"
                        : "bg-red-100 text-red-800 border-2 border-red-200"
                    }`}
                  >
                    Confidence: {result.confidence}
                  </span>
                </div>

                {/* Diagnose Another Button */}
                <button
                  onClick={handleReset}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transform tracking-[-0.01em]"
                >
                  Diagnose Another
                </button>
              </div>
            )}

            {!result && !loading && (
              <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-sm text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 tracking-[-0.01em]">
                  Submit the form to see diagnosis results here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
