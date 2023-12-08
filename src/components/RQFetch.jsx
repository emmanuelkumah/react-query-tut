import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

//fetch function
const fetchedUsers = () => {
  return axios.get("http://localhost:4000/users");
};
const RQFetch = () => {
  const { isLoading, isError, data } = useQuery("users", fetchedUsers);
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <section className="userContainer">
      <h3>Display Users</h3>
      <ul className="users">
        {data.data.map((user) => (
          <li key={user.id}>
            <h4>{user.name}</h4>
            <p>{user.location}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RQFetch;
