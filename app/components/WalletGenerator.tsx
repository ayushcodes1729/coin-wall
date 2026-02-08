"use client";

import { useState } from "react";

interface WalletGeneratorProps {
  walletType: "Solana" | "Ethereum";
  onWalletTypeChange: (type: "Solana" | "Ethereum") => void;
  onGenerateWallet: (recoveryPhrase?: string) => void;
}

export const WalletGenerator = ({
  walletType,
  onWalletTypeChange,
  onGenerateWallet,
}: WalletGeneratorProps) => {
  const [customPhrase, setCustomPhrase] = useState("");

  const handleGenerate = () => {
    onGenerateWallet(customPhrase.trim() || undefined);
    setCustomPhrase("");
  };

  return (
      <div className="bg-linear-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-gray-800">
      <h2 className="text-3xl font-bold text-amber-400 mb-6">Generate Wallet</h2>
      
      {/* Wallet Type Selection */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-semibold mb-3">
          Select Blockchain
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => onWalletTypeChange("Solana")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              walletType === "Solana"
                ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 scale-105"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Solana
          </button>
          <button
            onClick={() => onWalletTypeChange("Ethereum")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              walletType === "Ethereum"
                ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 scale-105"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Ethereum
          </button>
        </div>
      </div>

      {/* Custom Recovery Phrase Input */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-semibold mb-3">
          Custom Recovery Phrase (Optional)
        </label>
        <input
          type="text"
          placeholder="Enter your secret recovery phrase (or leave empty to generate new)"
          value={customPhrase}
          onChange={(e) => setCustomPhrase(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg rounded-lg shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-200 transform hover:scale-[1.02]"
      >
        Generate {walletType} Wallet
      </button>
    </div>
  );
};
