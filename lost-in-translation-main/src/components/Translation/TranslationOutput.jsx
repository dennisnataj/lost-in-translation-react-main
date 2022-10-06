import { translatedArray } from "./TranslationsForm";

const TranslationOutput = () => {

    //Maps through array of sign-language images 
    const availableLetters = translatedArray.map((translatedLetter, index) => {
        return (
            <img key={index} src={translatedLetter.image} alt={translatedLetter.letter} width="60" />
        )
    })

    return (      
        <section>
            <h1>Translated text</h1>
            {availableLetters}
        </section>       
    )
}
export default TranslationOutput