import { useEffect, useState, useContext } from "react";
import { UserContext } from '../functions/UserContext';

const url = 'http://localhost:5000/api/Institutions/'
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});


export const useGetAllInstitutions = () => {
    const [institutions, setInstitutions] = useState([])
    const { authToken } = useContext(UserContext);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await fetch(`${url}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                setInstitutions(data || []);
            } catch (error) {
                console.error("Error fetching institutions:", error);
                setInstitutions([]);
            }
        }
        fetchInstitutions();
    }, []);

    return institutions;
}


export const useAddInstitution = (name) => {
    const [institution, setInstitution] = useState({})
    const { authToken } = useContext(UserContext);

    useEffect(() => {
        const fetchAddInstitution = async () => {
            try {
                const response = await fetch(`${url}`, {
                    method: 'POSt',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                })
                const data = await response.json();
                setInstitution(data || {})
            } catch {
                console.error('Error adding institution')
            }
        }
        if (authToken && name) fetchAddInstitution();
    }, [authToken, name]);
    return institution;
}


export const useGetInstitutionById = (id) => {
    const [institution, setInstitution] = useState({})
    const { authToken } = useContext(UserContext);

    useEffect(() => {
        const fetchInstitution = async () => {
            try {
                const response = await fetch(`${url}${id}`, getCommonHeader(authToken));
                const data = await response.json();
                setInstitution(data || {});
            } catch {
                console.error("Error fetching institution")
            }
        }
        if (authToken && id) fetchInstitution();
    }, [authToken, id])
    return institution;
}


export const useUpdateInstitution = (id, name) => {
    const { authToken } = useContext(UserContext);

    useEffect(() => {
        const fetchUpdateInstitution = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error updating institution")
            }
        }
        if (authToken && id && name) fetchUpdateInstitution();
    }, [authToken, id, name])
}


export const useDeleteInstitution = (id) => {
    const { authToken } = useContext(UserContext);

    useEffect(() => {
        const fetchDeleteInstitution = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error deleting institution")
            }
        }
        if (authToken && id) fetchDeleteInstitution();
    }, [authToken, id])
}


export const getAllInstitutionsAPI = async () => {
    try {
        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching institutions:", error);
        return [];
    }
};