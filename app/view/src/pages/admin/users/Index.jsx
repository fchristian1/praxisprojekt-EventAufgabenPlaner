import React from "react";
import UsersList from "./components/UsersList";
import UserEdit from "./components/UserEdit";

function PageUsers() {
    const [selectedUser, setSelectedUser] = React.useState(null);
    return (
        <div className="flex flex-col">
            <div className="uppercase text-lg">Users</div>
            <div className="flex flex-col sm:flex-row media gap-2">
                <div className="w-full sm:w-1/2 rounded-md border border-black p-1">
                    <UsersList
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    ></UsersList>
                </div>
                <div className="w-full sm:w-1/2 rounded-md border border-black p-1">
                    <UserEdit
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    ></UserEdit>
                </div>
            </div>
        </div>
    );
}

export default PageUsers;
