// Raw API response type
interface BitcoinPriceDetailsApiResponse {
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
type BitcoinPriceDetails = {
  date: string; // formatDate(timestamp: number) -> string
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
