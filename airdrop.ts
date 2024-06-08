import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";


const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        
        // Richiediamo un airdrop di 1 SOL al nostro wallet utilizzando il metodo requestAirdrop
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // Indirizzo del wallet a cui inviare i fondi
            1 * LAMPORTS_PER_SOL    // Quantità di SOL richiesta (1 SOL = 1_000_000_000 LAMPORTS)
        );

        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();