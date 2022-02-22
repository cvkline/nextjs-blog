import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Charles Vincent Kline';
export const siteTitle = 'Next.js Sample Website';

const Img = props => (
  <Image
    priority
    src="/images/profile.jpg"
    className={utilStyles.borderCircle}
    height={props.size}
    width={props.size}
    alt={name}
  />
);

const Layout = ({ children, home }) => (
  <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <Img size={144} />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a><Img size={108}/></a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
    <main>{children}</main>
    {!home && (
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    )}
  </div>
);

export default Layout;