import { useMemo, useState } from "react";

const optionalRowSizes = [10, 20, 50, 100];

export const useBitcoinTableDetails = (
  bitcoinPriceDetails: BitcoinPriceDetails[],
  tableRowSize: number,
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableRowSizeState, setTableRowSizeState] = useState(tableRowSize);

  const totalPages = useMemo(() => {
    return Math.ceil(bitcoinPriceDetails.length / tableRowSizeState);
  }, [bitcoinPriceDetails.length, tableRowSizeState]);

  const startIndex = currentPage * tableRowSizeState;
  const endIndex = startIndex + tableRowSizeState;

  const paginatedData = bitcoinPriceDetails.slice(startIndex, endIndex);

  const handleRowSizeChange = (newSize: number) => {
    if (optionalRowSizes.includes(newSize)) {
      setTableRowSizeState(newSize);
      setCurrentPage(0);
    }
  };

  // render component for switching row size from dropdown
  const RowSizeSelector = () => {
    return (
      <select
        value={tableRowSizeState}
        onChange={(e) => handleRowSizeChange(Number(e.target.value))}
      >
        {optionalRowSizes.map((size) => (
          <option key={size} value={size}>
            {size} rader
          </option>
        ))}
      </select>
    );
  };

  return {
    paginatedData,
    currentPage: currentPage + 1,
    setCurrentPage,
    totalPages,
    itemsPerPage: tableRowSizeState,
    startIndex,
    endIndex: Math.min(endIndex, bitcoinPriceDetails.length),
    RowSizeSelector,
  };
};
