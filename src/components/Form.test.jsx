import * as React from "react";
import Form from "./Form";
// Nécessaire à la librairie de test *****
import { render, screen } from "@testing-library/react";
// **** Nécessaire au action utilisateur
import userEvent from "@testing-library/user-event";

describe("Form selector", () => {
  it("should display has all fields", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    expect(screen.getByLabelText("Titre")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    // on cherche les options, 6 choix dans la combobox
    expect(screen.getByLabelText("Catégorie")).toBeInTheDocument();
  });

  //envoie de tout les données dans consol, sans les msds d'erreur
  it("should submit form", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.type(screen.getByLabelText("Titre"), "mon titre");
      userEvent.selectOptions(
        screen.getByLabelText("Catégorie"),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "2024-01-01");
      userEvent.type(screen.getByLabelText("Description"), "mon titre");
    });

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByLabelText("button"));
    });

    // il y a plus les messages d'erreurs

    expect(
      screen.queryByText("Vous devez renseigner un titre")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez choisir une categorie")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une date")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une date dans le futur")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une description")
    ).not.toBeInTheDocument();
  });

  it("should display error when title is not filled", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.selectOptions(
        screen.getByLabelText("Catégorie"),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "1900-01-01");
      userEvent.type(screen.getByLabelText("Description"), "mon titre");
    });

    expect(screen.getByRole("button")).toBeInTheDocument();

    // l'utilisateur clique sur le button envoyer
    await userEvent.click(screen.getByRole("button"));

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur
    expect(
      screen.getByText("Vous devez renseigner un titre")
    ).toBeInTheDocument();
  });

  it("should display error when 'description' is not filled", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.type(screen.getByLabelText("Titre"), "mon titre");
      userEvent.selectOptions(
        screen.getByLabelText("combobox", { name: "Catégorie" }),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "1900-01-01");
    });

    // l'utilisateur clique sur le button envoyer
    await userEvent.click(screen.getByRole("button"));

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur
    expect(
      screen.getByText("Vous devez renseigner une description")
    ).toBeInTheDocument();
  });

  //s'il les chaps sont vide
  it("should display error on submit without all values", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur clique sur le button envoyer
    await userEvent.click(screen.getByRole("button"));

    // il y a tous les messages d'erreurs

    expect(
      screen.getByText("Vous devez renseigner un titre")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Vous devez choisir une categorie")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Vous devez renseigner une date")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Vous devez renseigner une description")
    ).toBeInTheDocument();

    // l'utilisateur saisie les valeurs
    userEvent.type(screen.getByLabelText("Titre"), "mon titre");
    userEvent.selectOptions(screen.getByLabelText("Catégorie"), "Ambassadeurs");
    userEvent.type(screen.getByLabelText("Date"), "1900-01-01");
    userEvent.type(screen.getByLabelText("Description"), "mon titre");

    // l'utilisateur clique sur le button envoyer

    await userEvent.click(screen.getByRole("button"));

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur

    expect(
      screen.queryByText("Vous devez renseigner un titre")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez choisir une categorie")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une date")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Vous devez renseigner une date dans le futur")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une description")
    ).not.toBeInTheDocument();

    // l'utilisateur corrige la date
    userEvent.type(screen.getByLabelText("Date"), "2024-01-01");

    // l'utilisateur clique sur le button envoyer
    await userEvent.click(screen.getByRole("button"));
    expect(
      screen.queryByText("Vous devez renseigner un titre")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez choisir une categorie")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une date")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une date dans le futur")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vous devez renseigner une description")
    ).not.toBeInTheDocument();
  });
});
