const FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  year: 'numeric',
  day: 'numeric'
};

export interface FormattedDateProps {
  locale: string;
  dateString: string;
}

export default function FormattedDate(props: FormattedDateProps): JSX.Element {
  const fmtr = new Intl.DateTimeFormat(props.locale, FORMAT);
  const date = new Date(props.dateString + 'T00:00:00');
  return <time dateTime={props.dateString}>{fmtr.format(date)}</time>;
}
