import { format } from 'date-fns';

export const isPastDate = (date: Date) => {
  return date < new Date();
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatDateTime = (date: Date) => {
  return format(date, 'dd MMM yyyy, hh:mm a')
}
