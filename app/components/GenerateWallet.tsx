import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import nacl, { SignKeyPair } from "tweetnacl";
import bs58 from 'bs58'

enum WalletType {
    Solana,
    Ethereum
}

interface Key {
    publicKey: string; privateKey: string
}

export const GenerateWallet = () => {
    const [keys, setKeys] = useState<(Key)[]>([]);
    const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");
    const [walletType, setWalletType] = useState<WalletType>(WalletType.Solana);
    let userSecretRecoveryPhrase = "";


    const handleGenerateWallet = (secretRecoveryPhrase: string, type: WalletType) => {
        try {
            const storedMnemonic = window.localStorage.getItem("secretRecoveryPhrase");
            // console.log("Stored mnemonic: ",storedMnemonic);
            const mnemonic = storedMnemonic || secretRecoveryPhrase || generateMnemonic();
            // console.log("Used mnemonic: ", mnemonic)
            setSecretRecoveryPhrase(mnemonic);
            !storedMnemonic && window.localStorage.setItem("secretRecoveryPhrase", mnemonic);
            const seed = mnemonicToSeedSync(mnemonic);
            
            const storedKeys = window.localStorage.getItem("keypairs")
            // console.log("Stored keys: ",storedKeys)
            const keypairArray = storedKeys && JSON.parse(storedKeys);
            // console.log("Keypair Array:", keypairArray)

            let n=0;
            
            if (keypairArray) {
                n = keypairArray.length + 1
            }
            else{
                n = 1;
            }
            // console.log("Generating wallet, n =", n);
            let derivationPath = `m/44'/501'/${n}'/0'`;
            let deriveSeed;
            let secret;
            let pubKey = "";
            let pvtKey = "";
            switch (type) {
                case WalletType.Solana:
                    derivationPath = `m/44'/501'/${n}'/0'`;
                    deriveSeed = derivePath(derivationPath, seed.toString("hex")).key;
                    secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
                    pubKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
                    pvtKey = bs58.encode(secret);
                    // console.log("Public key", pubKey)
                    break;

                case WalletType.Ethereum:
                    derivationPath = `m/44'/60'/${n}'/0'`;
                    deriveSeed = derivePath(derivationPath, seed.toString("hex")).key;
                    pvtKey = Buffer.from(deriveSeed).toString("hex");
                    const wallet = new ethers.Wallet(pvtKey);
                    pubKey = wallet.address;
                    break;

                default:
                    break;
            }

            if (pubKey === "" || pvtKey === "") {
                throw new Error("Public Key or private key now found");
            }
            const keypair: Key = { publicKey: pubKey, privateKey: pvtKey };
            console.log("Keypair: ",keypair);
            setKeys((prev) =>{
                const updated = [...prev, keypair];
                window.localStorage.setItem("keypairs", JSON.stringify(updated))
                return updated;
            });

            // console.log("Wallet generated")
            // console.log(pvtKey)
        } catch (error) {

        }
    };

    useEffect(() => {
        const storedSecretRecoveryPhrase = window.localStorage.getItem("secretRecoveryPhrase");
        const storedKeys = window.localStorage.getItem("keypairs");
        const keypairArray = storedKeys && JSON.parse(storedKeys);
        if (storedSecretRecoveryPhrase && storedKeys) {
            setSecretRecoveryPhrase(storedSecretRecoveryPhrase);
            setKeys(keypairArray);
        }
    }, []);
    return (
        <div className="py-7 px-8">
            <input
                type="text"
                placeholder="Enter your secret recovery phrase"
                name="recoveryPhrase"
                value={userSecretRecoveryPhrase}
                onChange={(e) => userSecretRecoveryPhrase = e.target.value}
                className="border-amber-100 border-2 text-xl w-full my-4 px-4"
            />
            <button className="bg-white" onClick={() => setWalletType(WalletType.Solana)}>Solana</button>
            <button className="bg-white" onClick={() => setWalletType(WalletType.Ethereum)}>Ethereum</button>
            <button onClick={() => {
                handleGenerateWallet(secretRecoveryPhrase, walletType);
                userSecretRecoveryPhrase = "";
            }}>
                Generate wallet
            </button>
            <div className="mt-4">
                {keys.map((key, index) => (
                    <div key={index} className="mb-2">
                        <p>
                            <strong>Public Key:</strong>{" "}
                            {key.publicKey}
                        </p>
                        <p>
                            <strong>Private Key:</strong>{" "}
                            {key.privateKey}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
