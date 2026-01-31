"use client"
import Link from "next/link";
import { generateMnemonic, mnemonicToSeedSync} from "bip39"
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Navbar } from "./components/Navbar";
import { GenerateWallet } from "./components/GenerateWallet";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar/>
      <GenerateWallet/>
    </div>
  );
}
