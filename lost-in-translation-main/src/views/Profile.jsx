import ProfileActions from "../components/Profile/ProfileActions";
import ProfileTranslationHistory from "../components/Profile/ProfileTranslationHistory";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";

const Profile = () => {
  const { user } = useUser();

  return (
    <>
      <div className="container">
        <h1 className="profile">Profile</h1>
        <ProfileActions />
        <ProfileTranslationHistory translations={user.translations} />
      </div>
    </>
  );
};
export default withAuth(Profile);
