import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const users = [
    {
      id:'u1',
      name:"Test user1",
      image:'http://pjuskiewicz.com/images/26130-NX251S.jpg',
      places:3
    }
  ];

  return <UsersList items={users} />;
};

export default Users;
