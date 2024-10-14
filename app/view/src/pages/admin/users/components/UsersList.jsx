import React, { useEffect, useState } from "react";
import { apiGetUsers } from "../../../../service/api_calls";
import Button from "../../../../components/Button";

function UsersList({ selectedUser, setSelectedUser }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        apiGetUsers().then((data) => setUsers(data));
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center">
                {users.map((user) => (
                    <Button key={user.id} onClick={() => setSelectedUser(user)}>
                        {user.email}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default UsersList;
