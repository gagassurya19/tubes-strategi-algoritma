export function formatToCurrency(num) {
  return new Intl.NumberFormat("id-ID").format(num);
}
