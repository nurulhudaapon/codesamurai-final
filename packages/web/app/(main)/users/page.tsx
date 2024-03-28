import { cubeClient, dbClient } from "@/client";

async function UserTable() {
  const users = await dbClient.user.getAll();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Users
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.first_name} {user.last_name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.role_id || "Unassigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const  Index = async () =>{
  const response = await cubeClient.getResourceCount();

  return (
    <div className="w-full">
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <UserTable />
    </div>
  );
}
export default Index;
