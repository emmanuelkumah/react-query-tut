import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//fetch users from server
const fetchUsers = () => {
  return axios.get("http://localhost:4000/users");
};

//Delete User from server
const deleteUser = (id) => {
  return axios.delete(`http://localhost:4000/users/${id}`);
};

const RQFetch = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  //create instance of query client
  const queryClient = useQueryClient();

  //mutating data
  const { mutate } = useMutation({
    mutationFn: deleteUser,
  });

  if (isLoading) {
    return <h3>Loading data ... </h3>;
  }

  if (isError) {
    return <h3>`Error loading data ${error.message}`</h3>;
  }

  //handle user delete on button click
  const handleUserDelete = (userID) => {
    //delete user from the server
    mutate(userID);
    //invalidate query and refetch fresh data
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };
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
                <button onClick={() => handleUserDelete(user.id)}>
                  Delete User
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default RQFetch;
