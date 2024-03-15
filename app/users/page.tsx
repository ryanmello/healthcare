import { getUsers } from "../actions/get-users";

const Users = async () => {
  const users = await getUsers();
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  );
};

export default Users;
