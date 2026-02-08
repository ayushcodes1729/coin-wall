"use client"
import Link from "next/link";
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Navbar } from "./components/Navbar";
import { GenerateWallet } from "./components/GenerateWallet";
import { WalletGenerator } from "./components/WalletGenerator";

export default function Home() {

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Header */}
      <div className="text-center mb-12 mt-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600 mb-4">
          Crypto Wallet Generator
        </h1>
        <p className="text-gray-400 text-lg">
          Securely generate and manage your Solana and Ethereum wallets
        </p>
      </div>
      {/* Wallet Generator */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-2xl">
          <WalletGenerator/>
        </div>
      </div>
    </div>
  );
}
