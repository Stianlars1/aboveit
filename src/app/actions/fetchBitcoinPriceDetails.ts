"use server";
import { BITCOIN_PRICE_DETAILS_API_URL } from "@/lib/utils/urls";
import { cache } from "react";
import { formatDate } from "@/lib/utils/formatters";

export const fetchBitcoinPriceDetails = cache(
  async (): Promise<BitcoinPriceDetails[]> => {
    const rawResponse = await fetch(BITCOIN_PRICE_DETAILS_API_URL, {
      cache: "force-cache",
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to fetch Bitcoin price details");
    }

    const parsedData: BitcoinPriceDetailsApiResponse = await rawResponse.json();

    if (parsedData.Response !== "Success") {
      throw new Error(`API Error: ${parsedData.Message || "Unknown error"}`);
    }

    return mapBitcoinPriceData(parsedData);
  },
);

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
