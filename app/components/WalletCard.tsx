"use client";

import { useState } from "react";

interface WalletCardProps {
  publicKey: string;
  privateKey: string;
  walletType: "Solana" | "Ethereum";
  index: number;
}

export const WalletCard = ({
  publicKey,
  privateKey,
  walletType,
  index,
}: WalletCardProps) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  

  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 font-semibold text-lg">Wallet #{index + 1}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              walletType === "Solana"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
            }`}
          >
            {walletType}
          </span>
        </div>
      </div>

      {/* Public Key */}
      <div className="mb-4">
        <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
          Public Key
        </label>
        <div className="flex items-center gap-2 bg-black/50 border border-gray-800 rounded-lg p-3">
          <code className="flex-1 text-gray-300 text-sm break-all font-mono">
            {publicKey}
          </code>
          <button
            onClick={() => copyToClipboard(publicKey, "public")}
            className="px-3 py-1 bg-gray-800 hover:bg-amber-600 text-gray-300 hover:text-white rounded text-xs font-semibold transition-all duration-200 whitespace-nowrap"
          >
            {copiedField === "public" ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Private Key */}
      <div>
        <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">
          Private Key
        </label>
        <div className="flex items-center gap-2 bg-black/50 border border-gray-800 rounded-lg p-3">
          <code className="flex-1 text-gray-300 text-sm break-all font-mono">
            {showPrivateKey ? privateKey : "•".repeat(64)}
          </code>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="px-3 py-1 bg-gray-800 hover:bg-amber-600 text-gray-300 hover:text-white rounded text-xs font-semibold transition-all duration-200 whitespace-nowrap"
            >
              {showPrivateKey ? "Hide" : "Show"}
            </button>
            {showPrivateKey && (
              <button
                onClick={() => copyToClipboard(privateKey, "private")}
                className="px-3 py-1 bg-gray-800 hover:bg-amber-600 text-gray-300 hover:text-white rounded text-xs font-semibold transition-all duration-200 whitespace-nowrap"
              >
                {copiedField === "private" ? "✓" : "Copy"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warning */}
      {showPrivateKey && (
        <div className="mt-3 p-3 bg-red-950/30 border border-red-900/50 rounded-lg">
          <p className="text-red-400 text-xs">
            ⚠️ Never share your private key with anyone!
          </p>
        </div>
      )}
    </div>
  );
};
