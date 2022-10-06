import { useUser } from "../../context/UserContext";
import ProfileTranslationHistoryItem from "./ProfileTranslationHistoryItem"

const ProfileTranslationHistory = () => {
    const { user } = useUser()
    //If user has a translation history then display it, otherwise don't
    let translationList;
    if(user.translations.length > 0)
    {
         translationList = user.translations.map((translation, index) => <ProfileTranslationHistoryItem key={index + '-' + translation} translation={translation} />)

        //If the records in translation array is > 10 then only last 10 records will be returned
        if(translationList.length > 10)
        {
            const lastTen = 10;
            const lastTenRecords = translationList.filter((val, index, arr) => index > arr.length - lastTen - 1);
            translationList = lastTenRecords;
        }
    }
    else {
        translationList = "Empty"
    }

    return (
        <section>
            <h4>Your translation history</h4>
            <ol className="translationList">
                <div className="translationListDiv">
                {translationList}
                </div>
            </ol>
        </section>
    )
}
export default ProfileTranslationHistory