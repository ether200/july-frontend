import Image from "next/image";

type Props = {
  text: string;
};

const About: React.FC<Props> = ({ text }) => {
  return (
    <div className="about">
      <div className="about__image">
        <Image
          alt="Hero"
          src="https://my-game-ecommerce.s3.sa-east-1.amazonaws.com/artem_beliaikin_Ihfp_P_7621_U_unsplash_9aa439329f.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="about__content">
        <div className="about__content__wrapper">
          <h2>WHO WE ARE</h2>
          <div
            className="about__content__wrapper__text"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
