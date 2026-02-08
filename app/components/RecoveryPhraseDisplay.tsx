"use client";

import { useState } from "react";

interface RecoveryPhraseDisplayProps {
  phrase: string;
}

export const RecoveryPhraseDisplay = ({ phrase }: RecoveryPhraseDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const words = phrase.split(" ").filter((word) => word.trim() !== "");

  const copyAllWords = async () => {
    await navigator.clipboard.writeText(phrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!phrase) return null;

  return (
    <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-900/50 transition-all duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-amber-400">
              Secret Recovery Phrase
            </h3>
            <p className="text-gray-500 text-sm">
              {isExpanded ? "Click to hide" : "Click to reveal"}
            </p>
          </div>
        </div>
        <svg
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-200 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-6">
          {/* Warning */}
          <div className="mb-6 p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
            <p className="text-red-400 text-sm font-semibold">
              ⚠️ CRITICAL: Store this phrase securely! Anyone with this phrase can access your wallets.
            </p>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {words.map((word, index) => (
              <div
                key={index}
                className="bg-black/50 border border-gray-800 rounded-lg p-3 hover:border-amber-500/50 transition-all duration-200"
              >
                <div className="text-gray-500 text-xs font-semibold mb-1">
                  {index + 1}
                </div>
                <div className="text-gray-200 font-mono font-semibold">
                  {word}
                </div>
              </div>
            ))}
          </div>

          {/* Copy All Button */}
          <button
            onClick={copyAllWords}
            className="w-full py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {copied ? "✓ Copied to Clipboard!" : "Copy All Words"}
          </button>
        </div>
      </div>
    </div>
  );
};
