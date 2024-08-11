declare module "../hooks/useAuth" {

    export interface User {
        username: string,
        email: string,
        password: strign
    }

    export interface useAuthReturn {
        isAuth: boolean,
        handleLogin: (userData: { email: string; password: string }) => Promise<void>;
    }

    const useAuth = () => useAuthReturn;
    export default useAuth;

};