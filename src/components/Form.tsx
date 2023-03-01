//import React, { createRef } from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  const [titre, setTitre] = useState("");
  //const inputTitre = createRef();

  const [cat, setCat] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    console.log("titre: " + titre);
    console.log("date: " + date);
    console.log("desc: " + desc);
    console.log("cat: " + cat);
    // evite la propagation de l'evenement submit
    event.preventDefault();
  };

  const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitre(event.currentTarget.value);
  };
  const handleCatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCat(event.currentTarget.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (dateIsValid(event.currentTarget)) {
      setDate(event.currentTarget.value);
    }
  };
  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.currentTarget.value);
  };

  const dateIsValid = (input: HTMLInputElement) => {
    // on récupère le parent de la date : la div
    let parent = input.parentElement;
    if (new Date(input.value) <= new Date()) {
      if (parent) {
        // ajout le dataset error à la div
        parent.setAttribute("data-error-visible", "true");
        // message d'erreur
        parent.setAttribute(
          "data-error",
          "Vous devez renseigner une date dans le futur"
        );
      }
      return false;
    } else {
      if (parent) {
        // on supprime les attributs pour enlever message d'erreur
        parent.removeAttribute("data-error-visible");
        parent.removeAttribute("data-error");
      }
      return true;
    }
  };

  // noValidate supprimer la validation html5 standard
  return (
    <main>
      <form onSubmit={handleSubmit} noValidate={true}>
        <h1>Ajouter une news</h1>
        <label htmlFor="titre">Titre</label>
        <input
          type="text"
          id="titre"
          //ref={inputTitre}
          onChange={handleTitreChange}
          required
          className="formData"
        ></input>
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
        </div>
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          onChange={handleDescChange}
          required
          className="formData"
        ></textarea>
        <button type="submit">Valider</button>
        <a href="/">Retourner à l'accueil</a>
      </form>
    </main>
  );
}

export default Form;
