import { getAboutInfo } from "../axios/aboutApi";
import { AboutI } from "../intefaces";
import About from "../components/About";

type Props = {
  content: AboutI;
};

const AboutPage: React.FC<Props> = ({ content }) => {
  return <About text={content?.text} />;
};

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
