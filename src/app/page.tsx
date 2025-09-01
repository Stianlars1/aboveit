"use client";
import styles from "./page.module.css";
import { Bitcoin } from "@/components/Bitcoin/Bitcoin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const client = new QueryClient();
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Bitcoin siste 100 dager</h1>

      <main className={styles.main}>
        <QueryClientProvider client={client}>
          <Bitcoin />
        </QueryClientProvider>
      </main>
    </div>
  );
}
