import React, { useState } from "react";
import axios from "axios";

import { useMutation } from "@tanstack/react-query";
const AddNewUser = (newUser) => {
  return axios.post("http://localhost:4000/users", newUser);
};

const AddUser = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  //call useMutation
  const { mutate, error, isError, isPending, isSuccess } = useMutation({
    mutationFn: AddNewUser,
  });

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const newUserDetails = {
      id: Math.floor(Math.random() * 100 + 1),
      name,
      location,
    };
    //mutate the data
    mutate(newUserDetails);
    //clear inputs
    setLocation("");
    setName("");
  };
  return (
    <>
      <section>
        <h3>Add New User</h3>
        <div>
          {isPending ? (
            "Adding new user ..."
          ) : (
            <>{isError && <div>An Error occured : {error.message}</div>}</>
          )}
        </div>
        <div>{isSuccess && <p>User Added</p>}</div>
        <form onSubmit={handleFormSubmission}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name of user"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location of user "
          />
          <button type="submit">Add User</button>
        </form>
      </section>
    </>
  );
};

export default AddUser;
