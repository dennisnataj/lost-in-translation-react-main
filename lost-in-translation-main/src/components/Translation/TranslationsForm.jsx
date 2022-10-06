import { useState } from "react";
import { useForm } from "react-hook-form";
import { translationAdd } from "../../api/translations";
import { STORAGE_LETTER_IMAGE_ARRAY } from "../../const/storageImageLetters";
import { useUser } from "../../context/UserContext";

export const translatedArray = [];

const TranslationsForm = () => {
  //Hook
  const { register, handleSubmit } = useForm();

  //Local state
  const { user, setUser } = useUser()
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    translatedArray.length = 0
    let splitString = data.translationText.toLowerCase();
    //These loops will translate users string to sign language
    for (let i = 0; i < splitString.length; i++) {
      for (let j = 0; j < STORAGE_LETTER_IMAGE_ARRAY.length; j++) {
        if (splitString[i] === STORAGE_LETTER_IMAGE_ARRAY[j].letter) {
          translatedArray.push(STORAGE_LETTER_IMAGE_ARRAY[j])
        }
      }
    }
    if (splitString.length > 0)
    {
      const [error, result] = await translationAdd(user, splitString)
      if (error !== null) {
        setApiError(error);
      }
      if (result !== null) {
        //Adds users string values into global user state
        setUser({
          ...user,
          translations: [...user.translations, splitString]
        });
      }
    }
  };

  return (
    <div className="container">
      <h1 className="translation">Translation</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="translation-text" className="translationText">
          Translation Text
        </label>
        <input
          type="text"
          className="translationInput"
          {...register("translationText")}
          placeholder="Translate here..."
        />

        <button type="submit" className="btnTranslate">
          Translate
        </button>
        {apiError && <p>{apiError}</p>}
      </form>
    </div>
  );
};
export default TranslationsForm;
