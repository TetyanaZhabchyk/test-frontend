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

    // objet temporaire pour les messages d'erreur
    const msgError = {
      date: "",
      title: "",
      cat: "",
      desc: "",
    };
    // test titre
    if (titre === "") {
      msgError.title = "Vous devez renseigner un titre";
    }
    // test cat
    if (cat === "") {
      msgError.cat = "Vous devez choisir une categorie";
    }
    // test date
    if (date === "") {
      msgError.date = "Vous devez renseigner une date";
    } else if (new Date(date) <= new Date()) {
      msgError.date = "Vous devez renseigner une date dans le futur";
    }
    // test desc
    if (desc === "") {
      msgError.desc = "Vous devez renseigner une description";
    }

    // on me met à jour qu'une seule fois le errors
    setErrors(msgError);
    // evite la propagation de l'evenement submit
    event.preventDefault();
  };

  const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    titleIsValid(event.currentTarget);
    setTitre(event.currentTarget.value);
  };
  const handleCatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    catIsValid(event.currentTarget);
    setCat(event.currentTarget.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // evennement change sur la date on teste si elle est valide
    dateIsValid(event.currentTarget);
    // si elle est valide en garde sa valeur
    setDate(event.currentTarget.value);
  };
  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    descIsValid(event.currentTarget);
    setDesc(event.currentTarget.value);
  };

  const titleIsValid = (input: HTMLInputElement) => {
    if (input.value === "") {
      setErrors({
        ...errors,
        title: "Vous devez renseigner un titre",
      });
    } else {
      setErrors({
        ...errors,
        title: "",
      });
    }
  };

  const catIsValid = (input: HTMLSelectElement) => {
    if (input.value === "") {
      setErrors({
        ...errors,
        cat: "Vous devez choisir une categorie",
      });
    } else {
      setErrors({
        ...errors,
        cat: "",
      });
    }
  };

  const dateIsValid = (input: HTMLInputElement) => {
    if (input.value === "") {
      setErrors({
        ...errors,
        date: "Vous devez renseigner une date",
      });
    } else if (new Date(input.value) <= new Date()) {
      setErrors({
        ...errors,
        date: "Vous devez renseigner une date dans le futur",
      });
    } else {
      setErrors({
        ...errors,
        date: "",
      });
    }
  };

  const descIsValid = (input: HTMLTextAreaElement) => {
    if (input.value === "") {
      setErrors({
        ...errors,
        desc: "Vous devez renseigner une description",
      });
    } else {
      setErrors({
        ...errors,
        desc: "",
      });
    }
  };

  // noValidate supprimer la validation html5 standard
  return (
    <main>
      <form onSubmit={handleSubmit} noValidate={true}>
        <h1>Ajouter une news</h1>
        <div className={`formData${errors.date !== "" ? " error" : ""}`}>
          <label htmlFor="titre">Titre</label>
          <input
            type="text"
            id="titre"
            onChange={handleTitreChange}
            required
            className="text-control"
          ></input>
          <br />
          {errors.title && <div className="errorMsg">{errors.title}</div>}
        </div>
        <div className={`formData${errors.date !== "" ? " error" : ""}`}>
          <label htmlFor="cat">Catégorie</label>
          <select
            name="cat"
            id="cat"
            onChange={handleCatChange}
            required
            className="text-control"
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
        <div className={`formData${errors.date !== "" ? " error" : ""}`}>
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
        <div className={`formData${errors.date !== "" ? " error" : ""}`}>
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            onChange={handleDescChange}
            required
            className="text-control"
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
