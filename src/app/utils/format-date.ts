import * as dayjs from 'dayjs'; // load on demand
import localeES from 'dayjs/locale/es';
dayjs.locale(localeES);


export function formatDate(value: any, type: string = 'normal') {
  const date = dayjs(value);
  let formatData = null;
  switch (type) {
    case 'normal':
      formatData = date.format('DD/MM/YYYY');
      break;
    case 'literal':
      const format = date.format(`D MMMM YYYY`);
      const chunk = format.split(' ');
      formatData = `${chunk[0]} de ${chunk[1].toLowerCase()} del ${chunk[2]}`;
      break;
    case 'partial':
      formatData = date.format('D MMM.');
      break;
    default:
      formatData = undefined;
      break;
  }

  return formatData;
}
