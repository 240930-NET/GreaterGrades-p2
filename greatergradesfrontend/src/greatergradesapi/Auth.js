import { useEffect, useState } from "react";
import { getStorageItem } from "../functions/functions";

const url = 'http://localhost:5000/api/Auth/';
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});


export const useRegister = (username, password, firstName, lastName, role, institutionId) =>{
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchRegister = async () => {
            try{
                const response = await fetch(`${url}register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, firstName, lastName, role, institutionId })
                });
                const data = await response.json();
                setUser(data || {})
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Failed to register user")
            }
        }
        if (token && username && password && firstName && lastName && role && institutionId) fetchRegister();
    }, [username, password, firstName, lastName, role, institutionId])
    return user;
}


export const useLogin = (username, password) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${url}login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                setToken(data?.token || '')
            } catch (error) {
                console.error("Error fetching Token: ", error.message)
            }
        }
        if (username && password) fetchToken();
    }, [username, password]);
    return token;
}


export const useGetAllUsers = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchUsers = async () => {
            try{
                const response = await fetch(`${url}`, getCommonHeader(token))
                const data = await response.json();
                setUsers(data || [])
            } catch{
                console.error("Error fetching users");
            }
        }
        if (token) fetchUsers();
    }, [])
    return (users)
}


export const useUpdateUser = (id, firstName, lastName) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchUpdateUser = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ firstName, lastName })
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error('Error updating user')
            }
        }
        if (token && firstName && lastName) fetchUpdateUser();
    }, [id, firstName, lastName])
}


export const useGetUserById = (id) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchUserById = async () => {
            try{
                const response = await fetch(`${url}id/${id}`, getCommonHeader(token))
                const data = await response.json();
                setUser(data || {});
            } catch (error){
                console.error("Error fetching user: " + error.message);
            }
        }
        if (token && id) fetchUserById();
    }, [id]);
    return (user);
}


export const useGetUserByUsername = (username) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchUserByUsername = async () => {
            try{
                const response = await fetch(`${url}username/${username}`, getCommonHeader(token))
                const data = await response.json();
                setUser(data || {});
            } catch{
                console.error("Error fetching user");
            }
        }
        if (token && username) fetchUserByUsername();
    }, [username]);
    return (user);
}