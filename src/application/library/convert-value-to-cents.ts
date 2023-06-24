export function convertValuetoCents(value: number) {
  const correctingDecimalPlacesandConvertingtoNumber = Number(
    (value * 100).toFixed(2)
  );

  return correctingDecimalPlacesandConvertingtoNumber;
}
