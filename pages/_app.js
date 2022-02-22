import '../styles/global.css';

const locale = 'de';

const App = ({ Component, pageProps }) => <Component {...pageProps} locale={locale} />;

export default App;