import { useEffect, useState } from "react";
import { getStorageItem } from "../functions/functions";

const url = 'http://localhost:5000/api/Assignments/'
const getCommonHeader = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
});

export const useGetAllAssignments = () => {
  const [assignments, setAssignments] = useState([])
  
  useEffect(() => {
    const token = getStorageItem('authToken')
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`${url}`, getCommonHeader(token))
        const data = response.json();
        setAssignments(data || [])
      } catch {
        console.error("Error fetching assignments")
      }
    }
    if (token) fetchAssignment();
  }, [])
  return assignments;
}


export const useAddAssignment = (name, classId) => {
  const [assignment, setAssignment] = useState({})

  useEffect(() => {
    const token = getStorageItem('authToken');
    const fetchAddAssignment = async () => {
      try {
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({ name, classId })
        })
        const data = await response.json();
        setAssignment(data || {})
      } catch {
        console.error("Error adding assignment")
      }
    }
    if (token, name, classId) fetchAddAssignment();
  }, [name, classId])
  return assignment;
}


export const useGetAssingmentById = (id) => {
  const [assignment, setAssignment] = useState({})

  useEffect(() => {
    const token = getStorageItem('authToken');
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`${url}${id}`, getCommonHeader(token))
        const data = await response.json();
        setAssignment(data || {})
      } catch {
        console.error("Error fetching assignment")
      }
    }
    if (token && id) fetchAssignment();
  }, [id])
  return assignment;
}


export const useUpdateAssignment = (id, name, classId) => {
  useEffect(() => {
    const token = getStorageItem('authToken');
    const fetchUpdateAssignment = async () => {
      try {
        const response = await fetch(`${url}${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({ name, classId })
        })
        if (response.status !== 204) throw new Error;
      } catch {
        console.error("Error updating assignment")
      }
    }
    if (token && id && name && classId) fetchUpdateAssignment();
  }, [id, name, classId])
}

export const useDeleteAssignment = (id) => {
  useEffect(() => {
    const token = getStorageItem('authToken');
    const fetchDeleteAssignment = async () => {
      try {
        const response = await fetch(`${url}${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (response.status !== 204) throw new Error;
      } catch {
        console.error("Error deleting assignment")
      }
    }
    if (token && id) fetchDeleteAssignment();
  }, [id])
}



//// Fetches not specifially tied to a single endpoint

