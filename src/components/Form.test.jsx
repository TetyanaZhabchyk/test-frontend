//1.should submit form (tous les champs sont valides)
//2.should display error when title is not filled
//3.should display error when description is not filled
//4. should display error when no category is selected
//5. should display error when date is not filled

import * as React from "react";
// add news
import Form from "./Form";
// **** Nécessaire à la librairie de test *****
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// **** Nécessaire au action utilisateur
import userEvent from "@testing-library/user-event";

describe("Form selector", () => {
  it("should display error when categorie is not filled", async () => {
    // On demande à executer la balise Form
    render(<Form />);
    // l'utilisateur saisie les valeurs
    await userEvent.type(screen.getByLabelText("Titre"), "mon titre");
    await userEvent.type(screen.getByLabelText("Date"), "2024-01-01");
    await userEvent.type(screen.getByLabelText("Description"), "mon titre");
    // l'utilisateur clique sur le button envoyer
    await userEvent.click(screen.getByRole("button"));
    // il y a plus le message d'erreurs de la categorie
    expect(
      await screen.getByText("Vous devez choisir une categorie")
    ).toBeInTheDocument();
  });
});
