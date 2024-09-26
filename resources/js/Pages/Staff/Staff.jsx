import AuthSidebar from "../../Components/Layouts/AuthSidebar";

function Staff() {
    return (
        <>
            <h1>Staff list</h1>
        </>
    );
}

Staff.layout = (page) => <AuthSidebar children={page} />;

export default Staff;
