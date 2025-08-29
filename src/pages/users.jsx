import { useState, useEffect } from 'react';
import { fetchUsers, fetchUserDetail } from '../api/users';
import { User } from 'lucide-react';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers({ limit, skip, search });
      setUsers(res.users);
      setTotal(res.total);
    } catch (err) {
      toast.error('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [skip, search]);

  const handlePrev = () => setSkip(prev => Math.max(prev - limit, 0));
  const handleNext = () => setSkip(prev => Math.min(prev + limit, total - limit));

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSkip(0); 
  };

  const showDetail = async (id) => {
    try {
      const detail = await fetchUserDetail(id);
      setSelectedUser(detail);
    } catch (err) {
      toast.error('Failed to load user detail');
    }
  };

  const closeDetail = () => setSelectedUser(null);

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl mb-4">Users</h1>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full max-w-sm"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Avatar</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="text-center p-4">Loading...</td></tr>
          ) : users.length === 0 ? (
            <tr><td colSpan={5} className="text-center p-4">No users found</td></tr>
          ) : (
            users.map((user, idx) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{skip + idx + 1}</td>
                <td className="p-2">
                  <img src={user.image} alt={user.firstName} className="w-10 h-10 rounded-full"/>
                </td>
                <td className="p-2 flex items-center gap-1"><User size={16}/> {user.firstName} {user.lastName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <button
                    onClick={() => showDetail(user.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className={`px-3 py-1 rounded border ${skip === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white border-blue-600 text-blue-600'}`}
        >
          Prev
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={skip + limit >= total}
          className={`px-3 py-1 rounded border ${(skip + limit >= total) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white border-blue-600 text-blue-600'}`}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button onClick={closeDetail} className="absolute top-2 right-2 text-gray-500">X</button>
            <h2 className="text-xl mb-2">{selectedUser.firstName} {selectedUser.lastName}</h2>
            <img src={selectedUser.image} alt={selectedUser.firstName} className="w-24 h-24 rounded-full mb-4"/>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Birth Date:</strong> {selectedUser.birthDate}</p>
            <p><strong>Company:</strong> {selectedUser.company?.name}</p>
            <p><strong>Address:</strong> {selectedUser.address?.address}, {selectedUser.address?.city}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
