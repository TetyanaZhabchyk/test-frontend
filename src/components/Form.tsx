import React from "react";
import "./Form.css";
import { useState, ChangeEvent, FormEvent } from "react";

function Form() {
  const [titre, setTitre] = useState("");
  //const [cat, setCat] = useState("");
  //const [date, setDate] = useState("");
  //const [desc, setDesc] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    console.log("titre: " + titre);
    //console.log("date: " + date);
    //console.log("desc: " + desc);
    //console.log("cat: " + cat);
    event.preventDefault();
  };

  const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitre(event.currentTarget.value);
  };

  //onChange
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Ajouter une news</h1>
        <label htmlFor="titre">Titre</label>
        <input type="text" id="titre" onChange={handleTitreChange}></input>
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
function preventDefault() {
  throw new Error("Function not implemented.");
}
