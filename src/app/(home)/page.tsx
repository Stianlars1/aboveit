import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
        <header>
            Header på plass
        </header>
        <main>
            Heisann Hoppsann!
        </main>
        <footer>Footer her ja</footer>
    </div>
  );
}
