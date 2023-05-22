import { ConversationThumbType } from '../data/d';

export type DateFilter =
  | 'Today'
  | 'Recent'
  | 'Past 7 Days'
  | 'Past 30 Days'
  | string;

export function filterConvsByDate(conversations: ConversationThumbType[]): {
  [key in DateFilter]: ConversationThumbType[];
} {
  const today = new Date();
  //   console.log(today);
  const result: { [key in DateFilter]: ConversationThumbType[] } = {
    Today: [],
    Recent: [],
    'Past 7 Days': [],
    'Past 30 Days': [],
  };

  conversations.forEach((conv) => {
    const objDate = new Date(conv.modifiedAt);
    // console.log('date: ', objDate);

    if (isSameDay(today, objDate)) {
      result['Today'].push(conv);
    } else if (isPastDays(objDate, 3)) {
      result['Recent'].push(conv);
    } else if (isPastDays(objDate, 7)) {
      result['Past 7 Days'].push(conv);
    } else if (isPastDays(objDate, 30)) {
      result['Past 30 Days'].push(conv);
    } else {
      const monthKey = getMonthKey(objDate);
      if (!result[monthKey]) {
        result[monthKey] = [];
      }
      result[monthKey].push(conv);
    }
  });

  return result;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isYesterday(date1: Date, date2: Date): boolean {
  const yesterday = new Date(date1);
  yesterday.setDate(date1.getDate() - 3);
  return isSameDay(yesterday, date2);
}

function isPastDays(date: Date, numDays: number): boolean {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - numDays);
  return date >= pastDate;
}

function getMonthKey(date: Date): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthIndex = date.getMonth();
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear() !== currentYear ? date.getFullYear() : '';
  return `${monthNames[monthIndex]} ${year}`;
}
