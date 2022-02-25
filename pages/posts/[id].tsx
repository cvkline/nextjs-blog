import { GetStaticPropsResult, GetStaticPathsResult } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import FormattedDate from '../../components/formatted-date';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';

interface PostProps extends PostData {
  locale: string;
}

export async function getStaticProps({ params }): Promise<GetStaticPropsResult<PostData>> {
  const postData = await getPostData(params.id)
  return { props: { ...postData } };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return { paths: getAllPostIds(), fallback: false };
}

export default function Post(props: PostProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{props.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{props.title}</h1>
      <div className={utilStyles.lightText}>
        <FormattedDate locale={props.locale} dateString={props.date} />
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: props.contentHTML }} />
    </Layout>
  );
}
