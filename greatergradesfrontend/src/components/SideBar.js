import { useState } from 'react';

const SideBar = ({ items, selectedItem, onSelectItem }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleItemClick = (item) => {
        onSelectItem(item.id);
        if (item.id === 'enrolled classes') {
            setDropdownOpen(!dropdownOpen);
        } else {
            setDropdownOpen(false);
        }
    };

    return (
        <div className="dashboard-sidebar">
            <ul>
                {items.map(item => (
                    <li 
                        key={item.id} 
                        className={`${item.id === selectedItem ? 'dashboard-sidebar-li-selected' : ''}`} 
                        onClick={() => handleItemClick(item)}
                    >
                        {item.label}
                        {item.id === 'enrolled classes' && dropdownOpen && (
                            <ul>
                                {item.assignmentLabels?.map(assignment => (
                                    <li key={assignment}>{assignment}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
