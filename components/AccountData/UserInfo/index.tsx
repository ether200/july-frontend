import { UserI } from "../../../intefaces";
import EditUserForm from "./EditUserForm";

type Props = {
  userData: UserI;
  mutateUser: (data?: UserI, shouldRevalidate?: boolean) => Promise<UserI>;
};

const UserInfo: React.FC<Props> = ({ userData, mutateUser }) => {
  return (
    <div className="myAccount">
      <div className="myAccount__data">
        <h2>My Account</h2>
        <p>Username: {userData.username}</p>
        <p>Name: {userData.name}</p>
        <p>Last name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Registered on: {userData.createdAt}</p>
      </div>
      <EditUserForm userData={userData} mutateUser={mutateUser} />
    </div>
  );
};

export default UserInfo;
