const Dropdown = ({ handleInputChange, value }) => {
    return (
        <select
            id="characterClass"
            name="characterClass"
            className="characterClassInput"
            onChange={handleInputChange}
            value={value}
            required
        >
            <option value="">Choose a class</option>
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
