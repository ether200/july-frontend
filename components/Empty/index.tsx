import React from "react";

type Props = {
  message: string;
};

const Empty: React.FC<Props> = ({ message }) => {
  return (
    <div className="empty">
      <h2>{message}</h2>
    </div>
  );
};

export default Empty;
