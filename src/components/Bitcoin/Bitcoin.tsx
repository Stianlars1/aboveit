"use client";
import { BitcoinTable } from "@/components/BitcoinTable/BitcoinTable";
import { useQuery } from "@tanstack/react-query";
import { BITCOIN_PRICE_DETAILS_API_URL } from "@/lib/utils/urls";
import {
  BitcoinPriceDetails,
  BitcoinPriceDetailsApiResponse,
} from "@/types/bitcoin";
import { formatDate } from "@/lib/utils/formatters";
import styles from "./Bitcoin.module.css";

export const Bitcoin = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["bitcoinPriceDetails"],
    queryFn: async (): Promise<BitcoinPriceDetailsApiResponse> => {
      const response = await fetch(BITCOIN_PRICE_DETAILS_API_URL);
      return response.json();
    },
    select: (
      response: BitcoinPriceDetailsApiResponse,
    ): BitcoinPriceDetails[] => {
      return mapBitcoinPriceData(response);
    },
  });

  if (!data) {
    return <p>null data lol</p>;
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          margin: "0 auto",
        }}
      >
        <div className={styles.spinner} /> Laster inn..
      </div>
    );
  }

  if (isError) {
    return <p>Error...</p>;
  }

  return <BitcoinTable bitcoinPriceDetails={data} />;
};

const mapBitcoinPriceData = (
  apiResponse: BitcoinPriceDetailsApiResponse,
): BitcoinPriceDetails[] => {
  return apiResponse.Data.Data.map((item) => ({
    date: formatDate(item.time),
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    volume: item.volumefrom,
  }));
};
