import AuthSidebar from "../../Components/Layouts/AuthSidebar";

function Dashboard() {
    return (
        <>
            <h1> This is dashboard</h1>
        </>
    );
}

Dashboard.layout = (page) => <AuthSidebar children={page} />;
export default Dashboard;
