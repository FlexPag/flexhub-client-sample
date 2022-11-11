export type DateFormat = 'dd/mm/yyyy' | 'yyyy-mm-dd';

export function formatDate(date: Date, format: DateFormat) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'dd/mm/yyyy') {
    return `${day}/${month}/${year}`;
  }

  if (format === 'yyyy-mm-dd') {
    return `${year}-${month}-${day}`;
  }

  throw new Error(`Format ${format} not supported`);
}
