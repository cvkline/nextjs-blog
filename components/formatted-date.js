const FORMAT = {
  weekday: 'long',
  month: 'long',
  year: 'numeric',
  day: 'numeric'
};

export default function FormattedDate(props) {
  const fmtr = new Intl.DateTimeFormat(props.locale, FORMAT);
  const date = new Date(props.dateString + 'T00:00:00');
  return <time dateTime={props.dateString}>{fmtr.format(date)}</time>;
}