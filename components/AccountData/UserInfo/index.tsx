import { UserI } from "../../../intefaces";

// Components
import EditUserForm from "./EditUserForm";

type Props = {
  userData: UserI;
  mutateUser: (data?: UserI, shouldRevalidate?: boolean) => Promise<UserI>;
};

const UserInfo: React.FC<Props> = ({ userData, mutateUser }) => {
  const dateFormatted = userData.createdAt.slice(0, 10);

  return (
    <div className="myAccount">
      <div className="myAccount__data">
        <h2>My Account</h2>
        <p>Username: {userData.username}</p>
        <p>Name: {userData.name}</p>
        <p>Last name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Registered on: {dateFormatted}</p>
      </div>
      <EditUserForm userData={userData} mutateUser={mutateUser} />
    </div>
  );
};

export default UserInfo;
