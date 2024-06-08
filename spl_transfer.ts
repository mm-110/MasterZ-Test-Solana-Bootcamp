import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
 } from "@solana/spl-token";

 import "dotenv/config";
 import { getKeypairFromEnvironment } from "@solana-developers/helpers";
 
 const keypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("9gkeSTuuBgg4g12qTVaxps8Xhyj1kDLwb36UYJeFoCs");
const fromAta = new PublicKey("4Unzm9uJ9hSEjW68uLjcTv2Sh7A4s6df4V5DYxcUmwtG");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    const amount = 10e5;

    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
    console.log("Amount in ATA: ", amountToAta.toString());
})()