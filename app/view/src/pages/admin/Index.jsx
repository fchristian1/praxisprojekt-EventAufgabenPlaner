import React, { useState } from "react";
import Button from "../../components/Button";
import PageUsers from "./users/Index";

function PageAdmin() {
    const [menu, setMenu] = useState("dashboard");
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-center">
                <Button
                    className={"uppercase text-lg"}
                    active={menu === "dashboard" ? "true" : "false"}
                    onClick={() => setMenu("dashboard")}
                >
                    Dashboard
                </Button>
                <Button
                    className={"uppercase text-lg"}
                    active={menu === "users" ? "true" : "false"}
                    onClick={() => setMenu("users")}
                >
                    Users
                </Button>
            </div>
            <div className="flex flex-col">
                {menu === "dashboard" && (
                    <div className="uppercase text-lg">Dashboard</div>
                )}
                {menu === "users" && <PageUsers></PageUsers>}
            </div>
        </div>
    );
}

export default PageAdmin;
