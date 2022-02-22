import { useEffect, useState } from 'react';
import {codeFont, headingTiny} from '../styles/utils.module.css';

const dtfOpts = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

const formatter = new Intl.DateTimeFormat('de-DE', dtfOpts);

export default function CurrentTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    let timerId;

    function unMount() {
      if (timerId) clearTimeout(timerId);
    }  

    function timerLoop() {
      timerId = null;
      setTime(new Date());
      timerId = setTimeout(timerLoop, 1000);
    }
  
    timerLoop();
    return unMount;
  }, []);

  const value = time ? formatter.format(time) : '???';

  return (
    <div style={{background: 'yellow'}}>
      <h2 className={headingTiny}>Aktuelles Datum und Uhrzeit</h2>
      <span className={codeFont}>{value}</span>
    </div>
  )
}
