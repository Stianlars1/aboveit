// Raw API response type
export interface BitcoinPriceDetailsApiResponse {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: Record<string, unknown>;
  Data: {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: Array<{
      time: number;
      high: number;
      low: number;
      open: number;
      volumefrom: number;
      volumeto: number;
      close: number;
      conversionType: string;
      conversionSymbol: string;
    }>;
  };
}

// Clean domain model
export type BitcoinPriceDetails = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

// Formatted data for display (with currency strings)
export type FormattedBitcoinPriceDetails = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};
