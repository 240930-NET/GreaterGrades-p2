import { useEffect, useState } from "react";
import { getStorageItem } from "../functions/functions";

const url = 'http://localhost:5000/api/Institutions/'
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});


export const useGetAllInstitutions = () => {
    const [institutions, setInstitutions] = useState([])

    useEffect(() => {
        const token = getStorageItem('authToken')
        const fetchInstitutions = async () => {
            try {
                const response = await fetch(`${url}`, getCommonHeader(token));
                const data = await response.json();
                setInstitutions(data || []);
            } catch {
                console.error("Error fetching institutions")
            }
        }
        if (token) fetchInstitutions();
    }, [])
    return institutions;
}


export const useAddInstitution = (name) => {
    const [institution, setInstitution] = useState({})

    useEffect(() => {
        const token = getStorageItem('authToken')
        const fetchAddInstitution = async () => {
            try {
                const response = await fetch(`${url}`, {
                    method: 'POSt',
                    headers: {
                        'Authorization': `Bearer ${token}`,
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
        if (token && name) fetchAddInstitution();
    }, [name]);
    return institution;
}


export const useGetInstitutionById = (id) => {
    const [institution, setInstitution] = useState({})
    useEffect(() => {
        const token = getStorageItem('authToken')
        const fetchInstitution = async () => {
            try {
                const response = await fetch(`${url}${id}`, getCommonHeader(token));
                const data = await response.json();
                setInstitution(data || {});
            } catch {
                console.error("Error fetching institution")
            }
        }
        if (token && id) fetchInstitution();
    }, [id])
    return institution;
}


export const useUpdateInstitution = (id, name) => {
    useEffect(() => {
        const token = getStorageItem('authToken')
        const fetchUpdateInstitution = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error updating institution")
            }
        }
        if (token && id && name) fetchUpdateInstitution();
    }, [id, name])
}


export const useDeleteInstitution = (id) => {
    useEffect(() => {
        const token = getStorageItem('authToken')
        const fetchDeleteInstitution = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error deleting institution")
            }
        }
        if (token && id) fetchDeleteInstitution();
    }, [id])
}