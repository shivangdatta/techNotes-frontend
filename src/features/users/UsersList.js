import React from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';

const UsersList = () => {
  // Correct the destructuring here
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error // Correct the typo from 'Error' to 'error'
  } = useGetUsersQuery(undefined , {
    pollingInterval : 60000,
    refetchOnFocus : true,
    refetchOnMountOrArgChange : true
  });

  let content;

  // Loading state
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  // Error state
  if (isError) {
    content = <p>{error?.data?.message || "An error occurred"}</p>;
  }

  // Success state
  if (isSuccess) {
    const { ids } = users; // Destructure 'ids' from 'users' correctly
    const tableContent = ids.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : <p>No users found.</p>;

    content = (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    );
  }

  return content || null; // Ensure content is always returned, even if null
};

export default UsersList;
