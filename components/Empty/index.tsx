import React from "react";

type Props = {
  message: string;
};

const Empty: React.FC<Props> = ({ message }) => {
  return (
    <div className="empty">
      <div className="empty__center">
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default Empty;
