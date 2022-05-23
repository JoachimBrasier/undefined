import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

const locales = {
  en: enUS,
  fr,
};

const formatDate = (date, activeLocale) => {
  date = new Date(date);
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
