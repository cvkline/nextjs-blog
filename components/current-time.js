import { useEffect, useState } from 'react';
import {codeFont, headingTiny} from '../styles/utils.module.css';

const formatter = new Intl.DateTimeFormat('de-DE', {dateStyle: 'long', timeStyle: 'medium'});

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
    <>
      <h3 className={headingTiny}>Aktuelles Datum und Uhrzeit</h3>
      <span className={codeFont}>{value}</span>
    </>
  )
}