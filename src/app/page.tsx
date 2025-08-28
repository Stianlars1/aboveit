import styles from "./page.module.css";
import { fetchBitcoinPriceDetails } from "@/app/actions/fetchBitcoinPriceDetails";
import { BitcoinTable } from "@/components/BitcoinTable/BitcoinTable";

export default async function Home() {
  // Tar utgangspunkt i at fetchBitcoinPriceDetails ikke kaster feil
  const bitcoinPriceDetails = await fetchBitcoinPriceDetails();

  // pseudo code for simulating an error
  // const {isError, bitcoinPriceDetails } = await fetchBitcoinPriceDetails();
  // if (isError) {
  //   return (
  //     <ContextMessage type="error" message="Noe gikk galt ved henting av data." />
  //   )
  // }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Bitcoin siste 100 dager</h1>

      <main className={styles.main}>
        <BitcoinTable bitcoinPriceDetails={bitcoinPriceDetails} />
      </main>
    </div>
  );
}
