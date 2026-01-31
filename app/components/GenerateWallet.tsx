import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

export const GenerateWallet = () => {
    const handleGenerateWallet = () => {
        const mnemonic = generateMnemonic();  // just a string with different wods
        // console.log("Mnemonic", mnemonic);
        const seed = mnemonicToSeedSync(mnemonic);
        for (let i = 0; i < 4; i++) {
            const derivationPath = `m/44'/501'/${i}'/0'`;
            const deriveSeed = derivePath(derivationPath, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
            console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
        }
    };
    return (
        <div>
            <button onClick={handleGenerateWallet}>Generate wallet</button>
        </div>
    );
};
