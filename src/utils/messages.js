import momentDateFormatter from 'moment-mini';
momentDateFormatter.locale('ru');

export const createShareMessage = ({ title, date }) =>
  `${title.trim()}\n\n${momentDateFormatter(date).format('MM/DD, h:mm a')}`;
