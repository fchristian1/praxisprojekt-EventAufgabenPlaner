import React from "react";

function UserEdit({ selectedUser, setSelectedUser }) {
    let user = null;

    return (
        <div>
            <div className="uppercase text-lg">Useredit</div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between ">
                    <label htmlFor="">Email:</label>{" "}
                    <div>{selectedUser?.email}</div>
                </div>
                <div className="flex flex-row  justify-between">
                    <label htmlFor="">Erstelldatum:</label>
                    <div>{selectedUser?.dateCreated}</div>
                </div>
                <div className="flex flex-row  justify-between">
                    <label htmlFor="">Aktiv:</label>
                    <div>{selectedUser?.isActive}</div>
                </div>
                <div className="flex flex-row  justify-between">
                    <label htmlFor="">Admin:</label>
                    <div>{selectedUser?.isAdmin}</div>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;
