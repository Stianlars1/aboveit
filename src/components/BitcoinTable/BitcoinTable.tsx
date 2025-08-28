"use client";
import { useBitcoinTableDetails } from "@/components/BitcoinTable/hooks/useBitcoinTableDetails";
import { BitcoinPriceDetails } from "@/types/bitcoin";
import styles from "./BitcoinTable.module.css";
import { DEFAULT_TABLE_ROW_SIZE } from "@/lib/utils/constants";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export interface BitcoinTableProps {
  bitcoinPriceDetails: BitcoinPriceDetails[];
  tableRowSize?: number;
}

export const BitcoinTable = ({
  bitcoinPriceDetails,
  tableRowSize = DEFAULT_TABLE_ROW_SIZE,
}: BitcoinTableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const {
    paginatedData,
    currentPage,
    setCurrentPage,
    totalPages,
    RowSizeSelector,
  } = useBitcoinTableDetails(bitcoinPriceDetails, tableRowSize);

  useGSAP(
    () => {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0.25, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
      );
    },
    { scope: tableRef },
  );

  if (bitcoinPriceDetails.length === 0) {
    return <h2 className={styles.emptyState}>Ingen data tilgjengelig.</h2>;
  }

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <section aria-label="Bitcoin Price Details" className={styles.heroSection}>
      <table className={styles.bitcoinTable} ref={tableRef}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>Dato</th>
            <th className={styles.tableHeader}>Åpning</th>
            <th className={styles.tableHeader}>Høy</th>
            <th className={styles.tableHeader}>Lav</th>
            <th className={styles.tableHeader}>Lukking</th>
            <th className={styles.tableHeader}>Volum</th>
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {paginatedData.map((bitcoinPriceDetail, index) => (
            <tr
              className={styles.tableRow}
              key={`${bitcoinPriceDetail.date}-${index}`}
            >
              <td className={styles.tableCell}>{bitcoinPriceDetail.date}</td>
              <td className={styles.tableCell}>{bitcoinPriceDetail.open}</td>
              <td className={styles.tableCell}>{bitcoinPriceDetail.high}</td>
              <td className={styles.tableCell}>{bitcoinPriceDetail.low}</td>
              <td className={styles.tableCell}>{bitcoinPriceDetail.close}</td>
              <td className={styles.tableCell}>{bitcoinPriceDetail.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          Forrige
        </button>
        <p className={styles.paginationInfo}>
          viser <strong>{currentPage}</strong> av <strong>{totalPages}</strong>
        </p>
        <button
          className={styles.paginationButton}
          disabled={currentPage >= totalPages}
          onClick={handleNextClick}
        >
          Neste
        </button>

        <RowSizeSelector />
      </nav>
    </section>
  );
};
