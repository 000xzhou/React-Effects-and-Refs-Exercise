import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Deck from "../../src/components/Deck";
import axios from "axios";

// Mock axios
vi.mock("axios");

const DECK_URL = "https://deckofcardsapi.com/api/deck";

// Mock data for a new deck and drawing a card
const mockDeckResponse = {
  data: {
    deck_id: "testdeckid",
    shuffled: true,
    remaining: 52,
  },
};

const mockCardResponse = {
  data: {
    success: true,
    deck_id: "testdeckid",
    cards: [
      {
        code: "6H",
        image: "https://deckofcardsapi.com/static/img/6H.png",
        images: {
          svg: "https://deckofcardsapi.com/static/img/6H.svg",
          png: "https://deckofcardsapi.com/static/img/6H.png",
        },
        value: "6",
        suit: "HEARTS",
      },
    ],
    remaining: 50,
  },
};

// Mock the axios.get method
axios.get.mockImplementation((url) => {
  if (url === `${DECK_URL}/new/shuffle/?deck_count=1`) {
    return Promise.resolve(mockDeckResponse);
  } else if (url === `${DECK_URL}/testdeckid/draw/?count=1`) {
    return Promise.resolve(mockCardResponse);
  }
  return Promise.reject(new Error("not found"));
});

describe("Deck", () => {
  it("renders the Deck component", async () => {
    await act(async () => {
      render(<Deck />);
    });
  });

  it("should match snapshot", async () => {
    let asFragment;
    await act(async () => {
      const rendered = render(<Deck />);
      asFragment = rendered.asFragment;
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should draw a card", async () => {
    let getByText, getByAltText;
    await act(async () => {
      const rendered = render(<Deck />);
      getByText = rendered.getByText;
      getByAltText = rendered.getByAltText;
    });

    // draw card
    const drawCardButton = getByText("Draw Card");
    await act(async () => {
      fireEvent.click(drawCardButton);
    });
    // waitFor to wait for the asynchronous update of the DOM.
    await waitFor(() => {
      const cardImage = getByAltText("HEARTS 6");
      expect(cardImage.src).toBe(
        "https://deckofcardsapi.com/static/img/6H.png"
      );
    });
  });
});
