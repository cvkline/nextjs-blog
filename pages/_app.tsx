import { AppProps } from 'next/app'
import '../styles/global.css';

const locale = 'de';

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} locale={locale} />;

export default App;
