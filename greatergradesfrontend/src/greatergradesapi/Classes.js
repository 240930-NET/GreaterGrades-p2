import { useEffect, useState } from 'react';
import { getStorageItem } from "../functions/functions";

const url = 'http://localhost:5000/api/Classes/'
const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});


export const useGetAllClasses = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchClasses = async () => {
            try {
                const response = await fetch(`${url}`, getCommonHeader(token))
                const data = await response.json();
                setClasses(data || [])
            } catch {
                console.error("Failed to fetch classes")
            }
        }
        if (token) fetchClasses();
    }, [])
    return classes;
}


export const useAddClass = (subject, institutionId) => {
    const [course, setCourse] = useState({})

    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchAddClass = async () => {
            try {
                const response = await fetch(`${url}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subject, institutionId })
                })
                const data = await response.json();
                setCourse(data || {})
            } catch {
                console.error("Error adding class")
            }
        }
        if (token && subject && institutionId) fetchAddClass();
    }, [subject, institutionId])
    return course;
}


export const useGetClassById = (id) => {
    const [course, setCourse] = useState({});

    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchClass = async () => {
            try {
                const response = await fetch(`${url}${id}`, getCommonHeader(token))
                const data = await response.json();
                setCourse(data || {});
            } catch {
                console.error("Error fetching class");
            }
        }
        if (token && id) fetchClass();
    }, [id]);
    return course;
}


export const useUpdateClass = (id, subject) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchUpdateClass = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subject })
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error updating class");
            }
        }
        if (token && id && subject) fetchUpdateClass();
    })
}


export const useDeleteClass = (id) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchDeleteClass = async () => {
            try {
                const response = await fetch(`${url}${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error deleting class");
            }
        }
        if (token && id) fetchDeleteClass();
    })
}


export const useAddStudentToClass = (id, studentId) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchAddStudentToClass = async () => {
            try {
                const response = await fetch(`${url}${id}/students/${studentId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error adding student to class")
            }
        }
        if (token && id && studentId) fetchAddStudentToClass();
    }, [id, studentId])
}


export const useDeleteStudentFromClass = (id, studentId) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchDeleteStudentFromClass = async () => {
            try {
                const response = await fetch(`${url}${id}/students/${studentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error adding student to class")
            }
        }
        if (token && id && studentId) fetchDeleteStudentFromClass();
    }, [id, studentId])
}


export const useAddTeacherToClass = (id, teacherId) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchAddTeacherToClass = async () => {
            try {
                const response = await fetch(`${url}${id}/teachers/${teacherId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error adding teacher to class")
            }
        }
        if (token && id && teacherId) fetchAddTeacherToClass();
    }, [id, teacherId])
}


export const useDeleteTeacherFromClass = (id, teacherId) => {
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchDeleteTeacherFromClass = async () => {
            try {
                const response = await fetch(`${url}${id}/teachers/${teacherId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                if (response.status !== 204) throw new Error();
            } catch {
                console.error("Error adding teacher to class")
            }
        }
        if (token && id && teacherId) fetchDeleteTeacherFromClass();
    }, [id, teacherId])
}

//// Fetches not specifially tied to a single endpoint

export const useGetUsersClasses = (ids) => {
    const [classes, setClasses] = useState([]);
    
    useEffect(() => {
        const token = getStorageItem('authToken');
        const fetchCourses = async () => {
            try {
                const responses = await Promise.all(
                    ids.map(id => 
                        fetch(`${url}${id}`, getCommonHeader(token))
                    )
                )
                const data = await Promise.all(responses.map(res => {
                    if (!res.ok) throw new Error();
                    return res.json();
                }))
                setClasses(data);
            } catch {
                console.error("Error fetching classes")
            }
        }
        if (token && ids?.length > 0) fetchCourses();
    }, [ids])

    return classes;
}