"use client";
import { useBitcoinTableDetails } from "@/components/BitcoinTable/hooks/useBitcoinTableDetails";
import { formatCurrency, formatVolume } from "@/lib/utils/formatters";
import styles from "./BitcoinTable.module.css";
export interface BitcoinTableProps {
  bitcoinPriceDetails: BitcoinPriceDetails[];
  tableRowSize?: number;
}

export const DEFAULT_TABLE_ROW_SIZE = 20;

export const BitcoinTable = ({
  bitcoinPriceDetails,
  tableRowSize = DEFAULT_TABLE_ROW_SIZE,
}: BitcoinTableProps) => {
  const { paginatedData, currentPage, setCurrentPage, totalPages } =
    useBitcoinTableDetails(bitcoinPriceDetails, tableRowSize);

  if (bitcoinPriceDetails.length === 0) {
    return <h2>Ingen data tilgjengelig.</h2>;
  }

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <section aria-label="Bitcoin Price Details" className={styles.heroSection}>
      <table className={styles.bitcoinTable}>
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
              <td className={styles.tableCell}>
                {formatCurrency(bitcoinPriceDetail.open)}
              </td>
              <td className={styles.tableCell}>
                {formatCurrency(bitcoinPriceDetail.high)}
              </td>
              <td className={styles.tableCell}>
                {formatCurrency(bitcoinPriceDetail.low)}
              </td>
              <td className={styles.tableCell}>
                {formatCurrency(bitcoinPriceDetail.close)}
              </td>
              <td className={styles.tableCell}>
                {formatVolume(bitcoinPriceDetail.volume)}
              </td>
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
      </nav>
    </section>
  );
};
