import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//fetch function
const fetchedUsers = () => {
  return axios.get("http://localhost:4000/users");
};

const RQFetch = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchedUsers,
  });
  if (isLoading) {
    return <h3>Loading data ... </h3>;
  }

  if (isError) {
    return <h3>`Error loading data ${error.message}`</h3>;
  }
  return (
    <>
      <section className="userContainer">
        <h3>Display Users</h3>
        <ul>
          {data.data.map((user) => {
            return (
              <li key={user.id}>
                <h4>{user.name}</h4>
                <p>{user.location}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default RQFetch;
