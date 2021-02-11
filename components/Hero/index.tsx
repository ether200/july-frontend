import { useRouter } from "next/router";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="hero">
      <Image
        alt="Hero"
        src="https://my-game-ecommerce.s3.sa-east-1.amazonaws.com/anastasiia_krutota_v1_QCJ_Qo_D03k_unsplash_4c78c09d6d.jpg"
        layout="fill"
        objectFit="cover"
      />
      <div className="hero__content">
        <h1>Hardcover books</h1>
        <button onClick={() => router.push("/books")}>See all books</button>
      </div>
    </div>
  );
};

export default Hero;
