import forestImage from "../images/forest.jfif";
import { deleteInstitution, useGetAllInstitutions } from "../greatergradesapi/Institutions";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../functions/UserContext";
import UpdateInstitutionPopup from "./UpdateInstitutionPopup";

const InstitutionTile = ({institution, toggleTrigger}) => {
    console.log(toggleTrigger)
    const { authToken } = useContext(UserContext);
    const [popupInstitutionId, setPopupInstitutionId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const institutions = useGetAllInstitutions(refreshTrigger);

    const institutionReal = institutions.find(inst => inst.institutionId === institution?.institutionId);

    // Set up polling for institutions
    useEffect(() => {
    }, [refreshTrigger]);

    const handleRemoveInstitutionClick = async (id) => {
        await deleteInstitution(id, authToken);
        setRefreshTrigger(prev => prev + 1);
        toggleTrigger();
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
            <div key={institutionReal?.institutionId} className="dashboard-tile">
                <h3 className="tile-title">{institutionReal?.name}</h3>
                <img src={forestImage} alt="Course placeholder" className="tile-image" />
                <div className="tile-footer">
                    <button className="remove-button" onClick={() => handleRemoveInstitutionClick(institutionReal?.institutionId)}>
                        Remove
                    </button>
                    <button className="update-button" onClick={() => handleUpdateInstitutionClick(institutionReal?.institutionId)}>
                        Update
                    </button>
                </div>
                {popupInstitutionId === institutionReal?.institutionId && (
                    <UpdateInstitutionPopup 
                        onClose={handlePopupClose} 
                        institutionId={institutionReal?.institutionId} 
                    />
                )}
            </div>
        </div>
    )
}

export default InstitutionTile;