import { useMemo, useState } from "react";
import { useNative } from "@/hook/useNative";
import {
  BitcoinPriceDetails,
  FormattedBitcoinPriceDetails,
} from "@/types/bitcoin";
import { formatCurrency } from "@/lib/utils/formatters";

const optionalRowSizes = [10, 20, 50, 100];

export const useBitcoinTableDetails = (
  bitcoinPriceDetails: BitcoinPriceDetails[],
  tableRowSize: number,
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableRowSizeState, setTableRowSizeState] = useState(tableRowSize);

  const isNative = useNative();

  const totalPages = useMemo(() => {
    return Math.ceil(bitcoinPriceDetails.length / tableRowSizeState);
  }, [bitcoinPriceDetails.length, tableRowSizeState]);

  const startIndex = currentPage * tableRowSizeState;
  const endIndex = startIndex + tableRowSizeState;

  const formattedData = useMemo<FormattedBitcoinPriceDetails[]>(
    () => getFinalBitcoinData(bitcoinPriceDetails, isNative),
    [bitcoinPriceDetails, isNative],
  );

  const paginatedData = formattedData.slice(startIndex, endIndex);

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
        aria-label="Velg antall rader per side"
      >
        {optionalRowSizes.map((size) => (
          <option key={size} value={size} aria-label={`Vis ${size} rader`}>
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

const getFinalBitcoinData = (
  data: BitcoinPriceDetails[],
  isNative: boolean,
): FormattedBitcoinPriceDetails[] => {
  return data.map((item) => ({
    date: item.date,
    open: formatCurrency(item.open, isNative ? 0 : 2),
    high: formatCurrency(item.high, isNative ? 0 : 2),
    low: formatCurrency(item.low, isNative ? 0 : 2),
    close: formatCurrency(item.close, isNative ? 0 : 2),
    volume: formatCurrency(item.volume, isNative ? 0 : 2),
  }));
};
