import React, { useEffect, useState } from 'react';

// libraries
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// others
import image from '@adminkit/core/dist/img/avatars/avatar.jpg';
import useDebounce from '../hooks/useDebounce';

const Users = () => {
  const connectedUsers = useSelector((state) => state.connectedUsers.value);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(search, 200);

  const { data: users, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchTerm, page],
    queryFn: () =>
      axios.get(`api/users?q=${search}&page=${page}`).then((res) => res.data),
  });

  return (
    <>
      <h1>Users</h1>

      <div className="card">
        <div className="card-body">
          <input
            className="form-control form-control-lg"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td className="text-center" colSpan="100%">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>
                          <div className="d-flex">
                            <img
                              src={image}
                              className="avatar img-fluid rounded-circle me-2"
                              alt={user.emailAddress}
                            />
                            <div>
                              <h5 className="fw-bold mb-1">
                                {user.emailAddress}
                              </h5>
                              <p className="mb-0">Developer Intern</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {connectedUsers.includes(user._id) ? (
                            <span className="badge bg-success">Online</span>
                          ) : (
                            <span className="badge bg-secondary">Offline</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
