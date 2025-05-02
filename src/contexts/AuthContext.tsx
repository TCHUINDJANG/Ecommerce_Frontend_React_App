import React , {createContext , useContext , useEffect , useState} from "react";
import { fetchUserProfile , login as apiLogin , register as apiRegister } from "../api/authAPI";
import { User } from "../api/types";


interface AuthContextType {
    user: User | null;
    loading: boolean;
    login:(username:string , password:string) => Promise<void>;
    register:(username:string , email:string, passowrd:string , first_name:string , last_name:string) => Promise<User>;
    logout: () => void;
    // isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
    const [user , setUser] = useState<User | null>(null);
    const [loading , setLoading] = useState<boolean>(true);


    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if(token){
                    const userData = await fetchUserProfile();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to load user' , error);
                localStorage.removeItem('token');
            }finally {
                setLoading(false);
            }
        };

        loadUser();
    } , []);


    const login = async (username:string , password:string) => {
        const { user: userData , token} = await apiLogin({username , password});
        localStorage.setItem('token' , token);
        setUser(userData);
    };



    const register = async (username:string , email:string , password:string , first_name:string ,last_name:string) => {
        const userData = await apiRegister({ username , email , password , first_name , last_name });
        return userData;

    };


    const logout = () => {
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{user , loading , login, register , logout}}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};