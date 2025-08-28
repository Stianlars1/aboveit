import { useMemo, useState } from "react";

export const useBitcoinTableDetails = (
  bitcoinPriceDetails: BitcoinPriceDetails[],
  tableRowSize: number,
) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(() => {
    return Math.ceil(bitcoinPriceDetails.length / tableRowSize);
  }, [bitcoinPriceDetails.length, tableRowSize]);

  const startIndex = currentPage * tableRowSize;
  const endIndex = startIndex + tableRowSize;

  const paginatedData = bitcoinPriceDetails.slice(startIndex, endIndex);

  return {
    paginatedData,
    currentPage: currentPage + 1,
    setCurrentPage,
    totalPages,
    itemsPerPage: tableRowSize,
    startIndex,
    endIndex: Math.min(endIndex, bitcoinPriceDetails.length),
  };
};
