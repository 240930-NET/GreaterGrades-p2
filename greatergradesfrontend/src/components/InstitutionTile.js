import forestImage from "../images/forest.jfif";
import { deleteInstitution, useGetAllInstitutions } from "../greatergradesapi/Institutions";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../functions/UserContext";
import UpdateInstitutionPopup from "./UpdateInstitutionPopup";

const InstitutionTile = ({institution, toggleTrigger}) => {
    const { authToken } = useContext(UserContext);
    const [popupInstitutionId, setPopupInstitutionId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const institutions = useGetAllInstitutions(refreshTrigger);

    const institutionReal = institutions.find(inst => inst.institutionId === institution?.institutionId);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupInstitutionId && !event.target.closest('.popup')) {
                setPopupInstitutionId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupInstitutionId]);

    const handleRemoveInstitutionClick = async (id) => {
        await deleteInstitution(id, authToken);
        setRefreshTrigger(prev => prev + 1);
        toggleTrigger();
    };

    const handleUpdateInstitutionClick = (id) => {
        setPopupInstitutionId(prevId => prevId === id ? null : id);
    };

    const handlePopupClose = () => {
        setPopupInstitutionId(null);
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="dashboard-tile-link">
            <div className="dashboard-tile">
                <h3 className="tile-title">{institutionReal?.name}</h3>
                <img src={forestImage} alt="Institution placeholder" className="tile-image" />
                <div className="tile-footer">
                    <button 
                        className="delete-icon"
                        onClick={() => handleRemoveInstitutionClick(institutionReal?.institutionId)}
                    >
                        🗑️
                    </button>
                    <button 
                        className="delete-icon"
                        onClick={() => handleUpdateInstitutionClick(institutionReal?.institutionId)}
                    >
                        ✏️
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
    );
};

export default InstitutionTile;