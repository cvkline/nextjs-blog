import { GetStaticPropsResult } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import CurrentTime from '../components/current-time';
import FormattedDate from '../components/formatted-date';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, PostData } from '../lib/posts';

interface HomeProps {
  allPostsData: Array<PostData>;
}

interface LocalizedHomeProps extends HomeProps {
  locale: string;
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const allPostsData = await getSortedPostsData()
  return { props: { allPostsData } }
}

export default function Home({allPostsData, locale}: LocalizedHomeProps): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section><CurrentTime locale={locale} /></section>
      <section className={utilStyles.headingMd}>
        <p>Na ja, meine "Selbstvorstellung" kommt bald.</p>
        <p>
          (Dies ist eine Beispiel-Website. Man kann ein ähnliches im{' '}
          <a href="https://nextjs.org/learn">Next.js-Tutorial</a> erstellen.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <FormattedDate locale={locale} dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
