import SideBar from "./SideBar"
import { Layout } from "@douyinfe/semi-ui"
import { Suspense } from "react";
import Loading from "../Loading";
import { Outlet } from "react-router-dom";


function DashBoard() {
    const { Content } = Layout;
    return (
        <>
            <Layout>
                <SideBar />
                <Content>
                    <Suspense fallback={<Loading></Loading>}>
                        <Outlet />
                    </Suspense>
                </Content>
            </Layout>
        </>
    )
}
export default DashBoard