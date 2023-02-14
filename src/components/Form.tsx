import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  const [titre, setTitre] = useState("");
  const [cat, setCat] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    console.log("titre: " + titre);
    console.log("date: " + date);
    console.log("desc: " + desc);
    console.log("cat: " + cat);
  };

  //onChange
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Ajouter une news</h1>
        <label htmlFor="titre">Titre</label>
        <input type="text" id="titre"></input>
        <label htmlFor="cat">Catégorie</label>
        <input type="text" id="cat"></input>
        <label htmlFor="date">Date</label>
        <input type="date" id="date"></input>
        <label htmlFor="desc">Description</label>
        <input type="text" id="desc"></input>
        <button type="submit">Valider</button>
        <a href="/">Retourner à l'accueil</a>
      </form>
    </main>
  );
}

export default Form;
