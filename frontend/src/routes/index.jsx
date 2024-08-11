// src/routes/Router.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from "../pages/SignUp";
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../context/Auth/AuthContext';
import DashboardClient from "../pages/Dashboard-client/Dashboard-client";
import Dashboard from "../pages/Dashboard-admin/Dashboard";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import Status from "../pages/Status/Status";
import Layout from "../layouts/Layout";
import DepositLayout from "../layouts/DepositLayout";
import WithdrawLayout from "../layouts/WithdrawLayout";
import StatusLayout from "../layouts/StatusLayout";
import useDeposit from '../hooks/Deposit';
import { SearchTermProvider } from '../context/SearchTermContext';
import { SearchTermStatusProvider } from '../context/SearchTermStatusContext';
import { SearchWithdrawProvider } from '../context/SearchWithdrawContext';


export function Router() {


    return (
        <>
            <Routes>
                <Route path='/login' element={<SignIn />} />
                <Route path='/register' element={<SignUp />} />
                <Route element={<AuthProvider><PrivateRoute /></AuthProvider>}>
                    <Route path='/dashboard' element={<Layout title="Dashboard"><Dashboard /></Layout>} />
                    <Route path='/dashboard-client' element={<Layout title="Dashboard Client"><DashboardClient /></Layout>} />
                    <Route path='/deposit' element={
                        <Layout title="Deposit">
                            <SearchTermProvider>
                                <DepositLayout>
                                    <Deposit />
                                </DepositLayout>
                            </SearchTermProvider>
                        </Layout>
                    } />
                    <Route path='/withdraw' element={
                        <Layout title="Withdraw">
                            <SearchWithdrawProvider>
                                <WithdrawLayout>
                                    <Withdraw />
                                </WithdrawLayout>
                            </SearchWithdrawProvider>
                        </Layout>
                    } />
                    <Route path='/status' element={
                        <Layout title="Status">
                            <SearchTermStatusProvider>
                                <StatusLayout>
                                    <Status />
                                </StatusLayout>
                            </SearchTermStatusProvider>
                        </Layout>
                    } />
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}
