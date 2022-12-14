const Dropdown = ({ handleInputChange, value, homePage }) => {
    //if homepage prop exists and is true, show the option for All classes
    return (
        <select
            id="characterClass"
            name="characterClass"
            className="characterClassInput"
            onChange={handleInputChange}
            value={value}
            required
        >
            <option value={null} disabled>
                Choose a class
            </option>
            {homePage && <option value="">All Classes</option>}
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Artificer">Artificer</option>
        </select>
    );
};

export default Dropdown;
