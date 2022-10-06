import { Link } from "react-router-dom"
import { translationClearHistory } from "../../api/translations"
import { STORAGE_KEY_USER } from "../../const/storageKey"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave } from "../../utils/storage"

const ProfileActions = () => {
    const { user, setUser } = useUser()

    //If user wants to log out, this method will send event to parent.
    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            //Delete user from session
            storageDelete(STORAGE_KEY_USER)
            //Set user to null
            setUser(null)
        }
    }

    //Clears translation history
    const handleClearHistoryClick = async () => {
        if (!window.confirm('Are you sure that you want to clear your history?')) {
            return
        }

        const [clearError] = await translationClearHistory(user.id)

        if (clearError !== null) {
            return
        }

        //Empties the translations array
        const updatedUser = {
            ...user,
            translations: []
        }

        storageSave(updatedUser)
        setUser(updatedUser)
    }

    return (
        <ul className="ul-list">
            <li><button className="btnBackToTranslator"><Link to="/translation">Back to translator</Link></button></li>
            <li><button onClick={handleClearHistoryClick} className="btnClearTranslations">Clear translations</button></li>
            <li><button onClick={handleLogoutClick} className="btnLogout">Logout</button></li>
        </ul>
    )
}
export default ProfileActions