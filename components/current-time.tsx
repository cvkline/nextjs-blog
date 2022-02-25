import { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';

const FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

export interface CurrentTimeProps {
  locale: string;
}

export default function CurrentTime({ locale }: CurrentTimeProps): JSX.Element {
  const [time, setTime] = useState(null);
  const formatter = new Intl.DateTimeFormat(locale, FORMAT);

  useEffect(() => {
    let timerId;

    function unMount() {
      if (timerId) global.clearTimeout(timerId);
    }  

    function timerLoop() {
      timerId = undefined;
      setTime(new Date());
      timerId = global.setTimeout(timerLoop, 1000);
    }
  
    timerLoop();
    return unMount;
  }, []);

  const value = time ? formatter.format(time) : '???';

  return (
    <div style={{background: 'yellow'}}>
      <h2 className={utilStyles.headingTiny}>Aktuelles Datum und Uhrzeit (Beispiel für clientseitige Hydratation)</h2>
      <span className={utilStyles.codeFont}>{value}</span>
    </div>
  )
}
