import { useState } from 'react';

const Table = ({ data, columns, total, limit, onPageChange, onSearch, showActions = false, onDetail, onEdit }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handlePageChange = (newPage) => {
    setPage(newPage);
    onPageChange((newPage - 1) * limit);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '20px', maxWidth: '300px' }}
      />
      <table>
        <thead>
          <tr>
            {columns.map((col) => <th key={col.key}>{col.label}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => <td key={col.key}>{item[col.key]}</td>)}
              <td>
                <button onClick={() => onDetail(item.id)} style={{ color: '#007bff', marginRight: '10px' }}>Detail</button>
                {showActions && (
                  <button onClick={() => onEdit(item)} style={{ color: 'green' }}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Prev</button>
        <span>Page {page} of {Math.ceil(total / limit)}</span>
        <button disabled={page >= Math.ceil(total / limit)} onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Table;