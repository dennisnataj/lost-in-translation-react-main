import TranslationOutput from "../components/Translation/TranslationOutput";
import TranslationsForm from "../components/Translation/TranslationsForm";
import withAuth from "../hoc/withAuth";

const Translation = () => {

  return (
    <>
      <div className="container">
        <section id="translation-text" className="translationForm">
          <TranslationsForm />
        </section>
        <section id="translation-letters" className="translationOutput">
          <TranslationOutput/>
        </section>
      </div>
    </>
  );
};
export default withAuth(Translation);
