import { Dispatch, SetStateAction } from "react";
import { AddressI } from "../../../intefaces";

type Props = {
  addressData: Array<AddressI>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Address: React.FC<Props> = ({ addressData, setIsModalOpen }) => {
  const addressExist = addressData.length;

  return (
    <div className="address">
      <div className="address__center">
        {addressExist ? (
          <div className="address__center__info">
            <h2>YOUR ADDRESS</h2>
            <p>Title: {addressData[0]?.title}</p>
            <p>Address: {addressData[0]?.address}</p>
            <p>City: {addressData[0]?.city}</p>
            <p>State: {addressData[0]?.state}</p>
            <p>Postal Code: {addressData[0]?.postalCode}</p>
            <p>Phone: {addressData[0]?.phone}</p>
            <button
              className="btn btn--primary btn--25p"
              onClick={() => setIsModalOpen((state) => !state)}
            >
              <span className="btn__text">Edit</span>
            </button>
          </div>
        ) : (
          <div className="address__center__create">
            <h2>PLEASE ADD AN ADDRESS</h2>
            <button
              className="btn"
              onClick={() => setIsModalOpen((state) => !state)}
            >
              <span className="btn__text">Create Address</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
