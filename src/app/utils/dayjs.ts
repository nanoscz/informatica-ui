import * as dayjs from 'dayjs'; // load on demand
import localeES from 'dayjs/locale/es';
dayjs.locale(localeES);


export function formatData(value: any, type: string) {
  const date = dayjs(value);
  let formatDate = null;
  switch (type) {
    case 'literal':
      const format = date.format(`D MMMM YYYY`);
      const chunk = format.split(' ');
      formatDate = `${chunk[0]} de ${chunk[1].toLowerCase()} del ${chunk[2]}`;
      break;
    case 'partial':
      formatDate = date.format('D MMM.');
      break;
    default:
      formatDate = undefined;
      break;
  }

  return formatDate;
}
