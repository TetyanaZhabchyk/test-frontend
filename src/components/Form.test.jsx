import * as React from "react";
import Form from "./Form";
// **** Nécessaire à la librairie de test *****
import { render, screen, waitFor } from "@testing-library/react";
// **** Nécessaire au action utilisateur
import userEvent from "@testing-library/user-event";

describe("Form selector", () => {
  it("should display has a button", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // Cherche le bouton
    await waitFor(() => {
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });
  });
  it("should display has all fields", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    await (() => {
      // on cherche le <input type="text"> et le textarea
      expect(screen.getAllByRole("textbox")).toHaveLength(2);
      // on cherche le <input type="text"> et le textarea
      expect(screen.getAllByRole("datebox")).toHaveLength(1);
      // on cherche les options
      expect(screen.getAllByRole("option")).toHaveLength(6);
    });
  });

  it("should submit form", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.type(screen.getByLabelText("Titre"), "mon titre");
      userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Catégorie" }),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "2024-01-01");
      userEvent.type(screen.getByLabelText("Description"), "mon titre");
    });

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByRole("button"));
    });

    // il y a plus les messages d'erreurs
    await (() => {
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

  it("should display error when title is not filled", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Catégorie" }),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "1900-01-01");
      userEvent.type(screen.getByLabelText("Description"), "mon titre");
    });

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByRole("button"));
    });

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur
    await (() => {
      expect(
        screen.queryByText("Vous devez renseigner un titre")
      ).toBeInTheDocument();
    });
  });

  it("should display error when description is not filled", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.type(screen.getByLabelText("Titre"), "mon titre");
      userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Catégorie" }),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "1900-01-01");
    });

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByRole("button"));
    });

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur
    await (() => {
      expect(
        screen.queryByText("Vous devez renseigner une description")
      ).toBeInTheDocument();
    });
  });

  it("should display error on submit without all values", async () => {
    // ***** On demande à executer la balise Form
    render(<Form />);

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByRole("button"));
    });

    // il y a tous les messages d'erreurs
    await (() => {
      expect(
        screen.queryByText("Vous devez renseigner un titre")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Vous devez choisir une categorie")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Vous devez renseigner une date")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Vous devez renseigner une description")
      ).toBeInTheDocument();
    });

    // l'utilisateur saisie les valeurs
    await (() => {
      userEvent.type(screen.getByLabelText("Titre"), "mon titre");
      userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Catégorie" }),
        "Ambassadeurs"
      );
      userEvent.type(screen.getByLabelText("Date"), "1900-01-01");
      userEvent.type(screen.getByLabelText("Description"), "mon titre");
    });

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByRole("button"));
    });

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur
    await (() => {
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
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Vous devez renseigner une description")
      ).not.toBeInTheDocument();
    });

    // l'utilisateur corrige la date
    await (() => {
      userEvent.type(screen.getByLabelText("Date"), "2024-01-01");
    });

    // l'utilisateur clique sur le button envoyer
    await (() => {
      userEvent.click(screen.getByRole("button"));
    });

    // il y a plus les messages d'erreurs sauf sur la date pas dans le futur
    await (() => {
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
  //it("should display error on submit without all values", async () => {
  // ***** On demande à executer la balise Form
  //render(<Form />);
});
