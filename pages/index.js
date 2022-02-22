import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import CurrentTime from '../components/current-time';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {allPostsData}
  }
}

const Home = ({allPostsData}) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section><CurrentTime /></section>
    <section className={utilStyles.headingMd}>
      <p>(Meine "Selbstvorstellung" kommt bald.)</p>
      <p>
        (Dies ist eine Beispiel-Website. Sie werden eine solche in unserem{' '}
        <a href="https://nextjs.org/learn">Next.js Tutorial</a> erstellen.)
      </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default Home;