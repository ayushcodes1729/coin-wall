"use client";

import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { WalletGenerator } from "./WalletGenerator";
import { WalletCard } from "./WalletCard";
import { RecoveryPhraseDisplay } from "./RecoveryPhraseDisplay";

interface WalletData {
    publicKey: string;
    privateKey: string;
    type: "Solana" | "Ethereum";
}

export const GenerateWallet = () => {
    const [wallets, setWallets] = useState<WalletData[]>([]);
    const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");

    

    useEffect(() => {
        const storedSecretRecoveryPhrase = window.localStorage.getItem("secretRecoveryPhrase");
        const storedWallets = window.localStorage.getItem("wallets");

        if (storedSecretRecoveryPhrase) {
            setSecretRecoveryPhrase(storedSecretRecoveryPhrase);
        }

        if (storedWallets) {
            setWallets(JSON.parse(storedWallets));
        }
    }, []);

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Recovery Phrase Display */}
                {secretRecoveryPhrase && (
                    <RecoveryPhraseDisplay phrase={secretRecoveryPhrase} />
                )}

                {/* Wallets List */}
                {wallets.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-amber-400">Your Wallets</h2>
                            <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 font-semibold">
                                {wallets.length} {wallets.length === 1 ? "Wallet" : "Wallets"}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {wallets.map((wallet, index) => (
                                <WalletCard
                                    key={index}
                                    publicKey={wallet.publicKey}
                                    privateKey={wallet.privateKey}
                                    walletType={wallet.type}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {wallets.length === 0 && (
                    <div className="text-center py-16 bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl">
                        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-10 h-10 text-amber-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">No Wallets Yet</h3>
                        <p className="text-gray-500">
                            Generate your first wallet to get started
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
