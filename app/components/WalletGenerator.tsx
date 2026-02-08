"use client";

import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";


interface WalletGeneratorProps {
  walletType: "Solana" | "Ethereum";
  onWalletTypeChange: (type: "Solana" | "Ethereum") => void;
  onGenerateWallet: (recoveryPhrase?: string) => void;
}

interface WalletData {
    publicKey: string;
    privateKey: string;
    type: "Solana" | "Ethereum";
}

export const WalletGenerator = () => {
  const [customPhrase, setCustomPhrase] = useState("");
  const [walletType, setWalletType] = useState<"Solana" | "Ethereum">("Solana");
  const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const router = useRouter();

  const handleGenerateWallet = (customPhrase?: string) => {
          try {
              const storedMnemonic = window.localStorage.getItem("secretRecoveryPhrase");
              const mnemonic = customPhrase || storedMnemonic || generateMnemonic();
              console.log("Used mnemonic Mnemonic:", mnemonic);
  
              setSecretRecoveryPhrase(mnemonic);
              if (!storedMnemonic) {
                  window.localStorage.setItem("secretRecoveryPhrase", mnemonic);
              }
  
              const seed = mnemonicToSeedSync(mnemonic);
              const storedWallets = window.localStorage.getItem("wallets");
              const walletArray: WalletData[] = storedWallets ? JSON.parse(storedWallets) : [];
  
              // Count wallets of the same type to determine the derivation path index
              const sameTypeWallets = walletArray.filter((w) => w.type === walletType);
              const n = sameTypeWallets.length;
  
              let derivationPath: string;
              let pubKey = "";
              let pvtKey = "";
  
              if (walletType === "Solana") {
                  derivationPath = `m/44'/501'/${n}'/0'`;
                  console.log("Derivation Path:", derivationPath);
                  const deriveSeed = derivePath(derivationPath, seed.toString("hex")).key;
                  const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
                  pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
                  pvtKey = bs58.encode(secret);
              } else {
                  // Ethereum
                  derivationPath = `m/44'/60'/${n}'/0'`;
                  console.log("Derivation Path:", derivationPath);
                  const deriveSeed = derivePath(derivationPath, seed.toString("hex")).key;
                  pvtKey = Buffer.from(deriveSeed).toString("hex");
                  const wallet = new ethers.Wallet(pvtKey);
                  pubKey = wallet.address;
              }
  
              if (!pubKey || !pvtKey) {
                  throw new Error("Failed to generate wallet keys");
              }
  
              const newWallet: WalletData = {
                  publicKey: pubKey,
                  privateKey: pvtKey,
                  type: walletType,
              };
  
              setWallets((prev) => {
                  const updated = [...prev, newWallet];
                  window.localStorage.setItem("wallets", JSON.stringify(updated));
                  return updated;
              });
          } catch (error) {
              console.error("Error generating wallet:", error);
          }
      };

  const handleGenerate = () => {
    handleGenerateWallet(customPhrase.trim() || undefined);
    setCustomPhrase("");
    router.push("/wallets"); 
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
            onClick={() => setWalletType("Solana")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              walletType === "Solana"
                ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50 scale-105"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
            }`}
          >
            Solana
          </button>
          <button
            onClick={() => setWalletType("Ethereum")}
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
