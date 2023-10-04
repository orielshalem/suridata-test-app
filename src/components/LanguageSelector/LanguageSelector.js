import { useState } from 'react';
import './LanguageSelector.css'

const LanguageSelector = ({ handleLanguageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en')

    return <select
        value={selectedLanguage}
        onChange={({ target: { value } }) => {
            setSelectedLanguage(value)
            handleLanguageChange(value)
        }}
        className="language-select"
    >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
    </select>
}

export default LanguageSelector;