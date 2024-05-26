import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Card from "../../src/components/Card";

describe("Card", () => {
  it("renders the Card component", () => {
    render(<Card />);
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Card
        image="https://www.bluecross.org.uk/sites/default/files/assets/images/124044lpr.jpg"
        name="cat"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
