import Head from "next/head";

const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
};

Seo.defaultProps = {
  title: "July | Hardcover Books",
  description: "Find the best hardcover books of the web from your device",
};

export default Seo;
