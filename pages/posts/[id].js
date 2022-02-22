import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import FormattedDate from '../../components/formatted-date';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return { props: { postData } };
}

export async function getStaticPaths() {
  return { paths: getAllPostIds(), fallback: false };
}

export default function Post(props) {
  return (
    <Layout>
      <Head>
        <title>{props.postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
      <div className={utilStyles.lightText}>
        <FormattedDate locale="de" dateString={props.postData.date} />
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: props.postData.contentHTML }} />
    </Layout>
  );
}
