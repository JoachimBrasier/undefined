import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';

const locales = {
  fr,
  en: enGB,
};

const formatDate = (date, activeLocale) => {
  const difference = differenceInDays(new Date(), date);

  if (difference > 7) {
    return format(date, 'dd MMMM yyyy', { locale: locales[activeLocale] });
  } else {
    const distance = formatDistanceToNowStrict(date, {
      locale: locales[activeLocale],
      addSuffix: true,
      includeSeconds: true,
    });

    return distance.charAt(0).toUpperCase() + distance.slice(1);
  }
};

export default formatDate;
