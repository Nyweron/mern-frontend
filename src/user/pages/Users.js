import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const users = [
    {
      id:'u1',
      name:"Test user1",
      image:'www url picture1 jpg',
      places:3
    },
    {
      id:'u2',
      name:"Test user2",
      image:'www url picture2 jpg',
      places:4
    }
  ];

  return <UsersList items={users} />;
};

export default Users;
