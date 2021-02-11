import useSWR from "swr";
import { useState } from "react";
import { UserI, AddressI } from "../intefaces";
import { getTokenServerSide, getTokenClientSide } from "../utils";
import { GetServerSideProps } from "next";
import { fetchWithToken } from "../axios/userApi";
import { getMe } from "../axios/userApi";
import { getAddress } from "../axios/addressApi";
import AddressForm from "../components/AccountData/AddressForm";
import Modal from "../components/Modal";
import Address from "../components/AccountData/Address";
import UserInfo from "../components/AccountData/UserInfo";

type Props = {
  user: UserI;
  address: Array<AddressI>;
};

const MyAccount: React.FC<Props> = ({ user, address }) => {
  const jwt = getTokenClientSide();

  const { data: userData, mutate: mutateUser } = useSWR<UserI>(
    ["/users/me", jwt],
    fetchWithToken,
    {
      initialData: user,
    }
  );

  const { data: addressData, mutate: mutateAddress } = useSWR<AddressI[]>(
    [`/addresses?user=${user.id}`, jwt],
    fetchWithToken,
    {
      initialData: address,
    }
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <UserInfo userData={userData} mutateUser={mutateUser} />
      <Address addressData={addressData} setIsModalOpen={setIsModalOpen} />

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <AddressForm
          userId={user.id}
          address={addressData}
          mutateAddress={mutateAddress}
        />
      </Modal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getTokenServerSide(context);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const userInfo = await getMe(token);
  const addressInfo = await getAddress(token, userInfo.id);
  return {
    props: {
      user: userInfo,
      address: addressInfo,
    },
  };
};

export default MyAccount;
