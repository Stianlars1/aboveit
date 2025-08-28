import styles from "./page.module.css";
import { fetchBitcoinPriceDetails } from "@/app/actions/fetchBitcoinPriceDetails";
import { BitcoinTable } from "@/components/BitcoinTable/BitcoinTable";

export default async function Home() {
  const bitcoinPriceDetails = await fetchBitcoinPriceDetails();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bitcoin siste 100 dager</h1>
      </header>

      <main className={styles.main}>
        <BitcoinTable bitcoinPriceDetails={bitcoinPriceDetails} />
      </main>
    </div>
  );
}
