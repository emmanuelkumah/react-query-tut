import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

//fetch function
const fetchedUsers = () => {
  return axios.get("http://localhost:4000/users");
};
//add user function
const addUser = (user) => {
  return axios.post("http://localhost:4000/users", user);
};
const RQFetch = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  //Querying data

  const { isLoading, error, isError, isFetching, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchedUsers,
    // refetchOnWindowFocus: true, //fetch data when window focus
    // enabled: true, // disable fetching data automatically
    // refetchOnMount: true // refetch data when component mounts
  });

  //Mutating data
  const { mutate } = useMutation({ mutationFn: addUser });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <p>Error loading data :${error.message}</p>;
  }
  if (isFetching) {
    return <p>Refetching data in the background...</p>;
  }
  // handle form submission
  const handleFormSubmission = (e) => {
    e.preventDefault();
    const data = { name, location };
    mutate(data);

    setName("");
    setLocation("");
  };
  return (
    <>
      <section className="userContainer">
        <h3>Display Users</h3>
        {/* Fetch data on button click */}
        <button onClick={refetch}>Fetch Data</button>
        <ul className="users">
          {data?.data.map((user) => (
            <li key={user.id}>
              <h4>{user.name}</h4>
              <p>{user.location}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Add New user</h3>
        <form onSubmit={handleFormSubmission}>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="location"
            placeholder="Enter the location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
};

export default RQFetch;
