import { ReflistTemplate } from "./ReflistTemplate";

describe("ReflistTemplate", () => {
  it("should render with no options", () => {
    expect(new ReflistTemplate().build().build()).toMatchSnapshot();
  });

  it("should render with a column count", () => {
    expect(
      new ReflistTemplate({ columns: 2 }).build().build()
    ).toMatchSnapshot();
  });

  it("should render with a column width", () => {
    expect(
      new ReflistTemplate({ colWidth: "30em" }).build().build()
    ).toMatchSnapshot();
  });

  it("should render with a list style", () => {
    expect(
      new ReflistTemplate({ listStyle: "upper-roman" }).build().build()
    ).toMatchSnapshot();
  });

  it("should render with a group", () => {
    expect(
      new ReflistTemplate({ group: "note" }).build().build()
    ).toMatchSnapshot();
  });

  it("should render with refs", () => {
    expect(
      new ReflistTemplate({
        refs: '<ref name="test">Example reference.</ref>',
      })
        .build()
        .build()
    ).toMatchSnapshot();
  });

  it("should render with every option combined", () => {
    expect(
      new ReflistTemplate({
        columns: 2,
        colWidth: "30em",
        listStyle: "upper-roman",
        group: "note",
        refs: '<ref name="test">Example reference.</ref>',
      })
        .build()
        .build()
    ).toMatchSnapshot();
  });
});
