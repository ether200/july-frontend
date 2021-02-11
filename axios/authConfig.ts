const authConfig = (token: string) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {};
  }
};

export default authConfig;
