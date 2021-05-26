import { getAboutInfo } from "../axios/aboutApi";
import { AboutI } from "../intefaces";

// Components
import About from "../components/About";
import Seo from "../components/SEO";

type Props = {
  content: AboutI;
};

const AboutPage: React.FC<Props> = ({ content }) => {
  return (
    <>
      <Seo title="July | About" />
      <About text={content?.text} />
    </>
  );
};

// Get about content from api on build time
export const getStaticProps = async () => {
  const content = await getAboutInfo();
  return {
    props: {
      content,
    },
    revalidate: 1800,
  };
};

export default AboutPage;
