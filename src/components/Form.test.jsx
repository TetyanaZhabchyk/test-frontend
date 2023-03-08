import * as React from "react";
// add news
import Form from "./Form";
// **** Nécessaire à la librairie de test *****
import { render, screen, waitFor } from "@testing-library/react";
// **** Nécessaire au action utilisateur
import userEvent from "@testing-library/user-event";
// on récupère le json des news
import json from "../../public/data/news.json";

//1. should display all news:
//render le composant
//expect compter le nombre de news

//2. should display news in xxx category when user selects filter:
//render le composant
//utilisateur change le bouton select
//expect compter le nombre de news

//3. should display all news when user resets filter
//render le composant
//utilisateur change le bouton select sur une catégorie
//utilisateur remet le bouton select sur toutes les catégories
//expect compter le nombre de news

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(json),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Form selector", () => {
  it("should display all lines", async () => {
    // ***** On demande à executer la balise News
    render(<Form />);
    // *** Le test ici c'est de chercher le tag h2 (créer par les news) ***
    // *** Il doit y avoir 7 h2 car il y a 7 nouvelles dans le json ***
  });
});
