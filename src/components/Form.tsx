import "./Form.css";
import { useState } from "react";

function Form() {
  const [titre, setTitre] = useState("");
  const [cat, setCat] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const [errors, setErrors] = useState({
    date: "",
    title: "",
    cat: "",
    desc: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    console.log("titre: " + titre);
    console.log("date: " + date);
    console.log("desc: " + desc);
    console.log("cat: " + cat);
    // evite la propagation de l'evenement submit
    event.preventDefault();
  };

  const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleIsValid(event.currentTarget)) {
      setTitre(event.currentTarget.value);
    }
  };
  const handleCatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (catIsValid(event.currentTarget)) {
      setCat(event.currentTarget.value);
    }
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // evennement change sur la date on teste si elle est valide
    if (dateIsValid(event.currentTarget)) {
      // si elle est valide en garde sa valeur
      setDate(event.currentTarget.value);
    }
  };
  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (descIsValid(event.currentTarget)) {
      setDesc(event.currentTarget.value);
    }
  };

  const titleIsValid = (input: HTMLInputElement) => {
    let parent = input.parentElement;
    if (input.value === "") {
      if (parent) {
        // ajout le dataset error à la div
        parent.setAttribute("data-error-visible", "true");
        setErrors({
          ...errors,
          title: "Vous devez renseigner un titre",
        });
      }
      return false;
    } else {
      if (parent) {
        // on supprime les attributs pour enlever message d'erreur
        parent.removeAttribute("data-error-visible");
        setErrors({
          ...errors,
          title: "",
        });
      }
      return true;
    }
  };

  const catIsValid = (input: HTMLSelectElement) => {
    let parent = input.parentElement;
    if (input.value === "") {
      if (parent) {
        // ajout le dataset error à la div
        parent.setAttribute("data-error-visible", "true");
        setErrors({
          ...errors,
          cat: "Vous devez choisir une categorie",
        });
      }
      return false;
    } else {
      if (parent) {
        // on supprime les attributs pour enlever message d'erreur
        parent.removeAttribute("data-error-visible");
        setErrors({
          ...errors,
          cat: "",
        });
      }
      return true;
    }
  };

  const dateIsValid = (input: HTMLInputElement) => {
    // on récupère le parent de la date : la div
    let parent = input.parentElement;
    if (new Date(input.value) <= new Date()) {
      if (parent) {
        // ajout le dataset error à la div
        parent.setAttribute("data-error-visible", "true");
        setErrors({
          ...errors,
          date: "Vous devez renseigner une date dans le futur",
        });
      }
      return false;
    } else {
      if (parent) {
        // on supprime les attributs pour enlever message d'erreur
        parent.removeAttribute("data-error-visible");
        setErrors({
          ...errors,
          date: "",
        });
      }
      return true;
    }
  };

  const descIsValid = (input: HTMLTextAreaElement) => {
    // on récupère le parent de la date : la div
    let parent = input.parentElement;
    if (input.value === "") {
      if (parent) {
        // ajout le dataset error à la div
        parent.setAttribute("data-error-visible", "true");
        setErrors({
          ...errors,
          desc: "Vous devez renseigner une description",
        });
      }
      return false;
    } else {
      if (parent) {
        // on supprime les attributs pour enlever message d'erreur
        parent.removeAttribute("data-error-visible");
        setErrors({
          ...errors,
          desc: "",
        });
      }
      return true;
    }
  };

  // noValidate supprimer la validation html5 standard
  return (
    <main>
      <form onSubmit={handleSubmit} noValidate={true}>
        <h1>Ajouter une news</h1>
        <div className="formData">
          <label htmlFor="titre">Titre</label>
          <input
            type="text"
            id="titre"
            //ref={inputTitre}
            onChange={handleTitreChange}
            required
            className="formData"
          ></input>
          <br />
          {errors.title && <div className="errorMsg">{errors.title}</div>}
        </div>
        <div className="formData">
          <label htmlFor="cat">Catégorie</label>
          <select
            name="cat"
            id="cat"
            onChange={handleCatChange}
            required
            className="formData"
          >
            <option value="">--Option--</option>
            <option value="Évènement">Évènement</option>
            <option value="Utilisateurs">Utilisateurs</option>
            <option value="Au bureau">Au bureau</option>
            <option value="Acteurs culturels">Acteurs culturels</option>
            <option value="Ambassadeurs">Ambassadeurs</option>
          </select>
          <br />
          {errors.cat && <div className="errorMsg">{errors.cat}</div>}
        </div>
        <div className="formData">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={handleDateChange}
            required
            className="text-control"
          ></input>
          <br />
          {errors.date && <div className="errorMsg">{errors.date}</div>}
        </div>
        <div className="formData">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            onChange={handleDescChange}
            required
            className="formData"
          ></textarea>
          <br />
          {errors.desc && <div className="errorMsg">{errors.desc}</div>}
        </div>
        <button type="submit">Valider</button>
        <a href="/">Retourner à l'accueil</a>
      </form>
    </main>
  );
}

export default Form;
