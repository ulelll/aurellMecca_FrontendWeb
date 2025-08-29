import { useEffect, useState } from 'react';
import { getUsers, getUserById } from '../api/users';
import Table from '../components/table';
import Modal from '../components/modal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');
  const limit = 10;
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const data = await getUsers({ limit, skip, search });
    setUsers(data.users);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchUsers();
  }, [skip, search]);

  const handleDetail = async (id) => {
    const user = await getUserById(id);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Users</h1>
      <Table
        data={users}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'firstName', label: 'First Name' },
          { key: 'lastName', label: 'Last Name' },
          { key: 'email', label: 'Email' },
        ]}
        total={total}
        limit={limit}
        onPageChange={setSkip}
        onSearch={setSearch}
        onDetail={handleDetail}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="User Details">
        {selectedUser && (
          <div>
            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;