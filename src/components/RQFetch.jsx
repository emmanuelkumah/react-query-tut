import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//fetch function
const fetchedUsers = () => {
  return axios.get("http://localhost:4000/users");
};
const RQFetch = () => {
  const { isLoading, error, isError, isFetching, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchedUsers,
    // refetchOnWindowFocus: true, //fetch data when window focus
    enabled: false, // disable fetching data automatically
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <p>Error loading data :${error.message}</p>;
  }
  if (isFetching) {
    return <p>Refetching data in the background...</p>;
  }

  return (
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
  );
};

export default RQFetch;
