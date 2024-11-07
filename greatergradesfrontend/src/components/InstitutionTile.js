import forestImage from "../images/forest.jfif";
import { deleteInstitution, useGetAllInstitutions } from "../greatergradesapi/Institutions";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../functions/UserContext";
import UpdateInstitutionPopup from "./UpdateInstitutionPopup";

const InstitutionTile = () => {
    const { authToken } = useContext(UserContext);
    const [popupInstitutionId, setPopupInstitutionId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const institutions = useGetAllInstitutions(refreshTrigger);

    // Set up polling for institutions
    useEffect(() => {
        const intervalId = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleRemoveInstitutionClick = async (id) => {
        await deleteInstitution(id, authToken);
        setRefreshTrigger(prev => prev + 1);
    }

    const handleUpdateInstitutionClick = (id) => {
        setPopupInstitutionId(prevId => prevId === id ? null : id);
    }

    const handlePopupClose = () => {
        setPopupInstitutionId(null);
        setRefreshTrigger(prev => prev + 1);
    }

    return (
        <div className="tiles-container">
            {institutions.map((institution) => (
                <div key={institution.institutionId} className="dashboard-tile">
                    <h3 className="tile-title">{institution.name}</h3>
                    <img src={forestImage} alt="Course placeholder" className="tile-image" />
                    <div className="tile-footer">
                        <button onClick={() => handleRemoveInstitutionClick(institution.institutionId)}>
                            Remove
                        </button>
                        <button onClick={() => handleUpdateInstitutionClick(institution.institutionId)}>
                            Update
                        </button>
                    </div>
                    {popupInstitutionId === institution.institutionId && (
                        <UpdateInstitutionPopup 
                            onClose={handlePopupClose} 
                            institutionId={institution.institutionId} 
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default InstitutionTile;