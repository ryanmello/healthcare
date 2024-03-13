import { getAllDatabaseUsers } from "../actions/get-all-db-users";

const Users = async () => {
  const users = await getAllDatabaseUsers();
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  );
};

export default Users;
