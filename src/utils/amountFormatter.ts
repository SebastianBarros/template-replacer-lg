export type amountFormatterProps = (
  amount: number,
  numberFormatOptions?: {
    country?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) => string;

export const amountFormatter: amountFormatterProps = (
  amount,
  { country = 'es-AR', minimumFractionDigits = 4, maximumFractionDigits = 4 } = {}
) =>
  new Intl.NumberFormat(country, {
    style: "currency",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);

export type amountNumberFormatterProps = {
  amount: number;
  maximumFractionDigits?: number;
};
/**
 * Formats a number XXX,XXX,XXX.XX
 * @param amount Amount un number (. for decimal)
 * @param maximumFractionDigits Max decimal digits. Default 2
 * @returns Amount formatted as string
 */
export const amountNumberFormatter = ({
  amount,
  maximumFractionDigits = 4,
}: amountNumberFormatterProps): string => {
  const country = "es-AR";

  return new Intl.NumberFormat(country, {
    style: "decimal",
    maximumFractionDigits,
    localeMatcher: "lookup",
  }).format(amount);
};
