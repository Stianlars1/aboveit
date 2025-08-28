export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("nb-NO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp * 1000));
}

export function formatVolume(volume: number): string {
  const formatter = new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (volume >= 1e9) {
    return `${formatter.format(volume / 1e9)} mrd`;
  } else if (volume >= 1e6) {
    return `${formatter.format(volume / 1e6)} mill`;
  } else if (volume >= 1e3) {
    return `${formatter.format(volume / 1e3)} tusen`;
  }
  return formatter.format(volume);
}
