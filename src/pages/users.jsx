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
    <div className="table-container">
      <h2>Users</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="table-message">Loading...</td></tr>
          ) : users.length === 0 ? (
            <tr><td colSpan={5} className="table-message">No users found</td></tr>
          ) : (
            users.map((user, idx) => (
              <tr key={user.id}>
                <td>{skip + idx + 1}</td>
                <td>
                  <img src={user.image} alt={`${user.firstName} avatar`} className="avatar" />
                </td>
                <td className="user-name">
                  <User size={16} className="user-icon" /> {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td className="action-buttons">
                  <button
                    onClick={() => showDetail(user.id)}
                    className="action-button detail-button"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={skip + limit >= total}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeDetail} className="modal-close">X</button>
            <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
            <img src={selectedUser.image} alt={`${selectedUser.firstName} avatar`} className="avatar-large" />
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