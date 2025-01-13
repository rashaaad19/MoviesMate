import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CategorySelectItem from "../src/UI/CategorySelectItem";
import { configureStore } from "@reduxjs/toolkit";
import DiscoverSlice from "../src/store/DiscoverSlice";
import { Provider } from "react-redux";

//Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      discover: DiscoverSlice.reducer, 
    },
    preloadedState: {
      sortBy: "popularity.dsc",
      year: "all",
      genre: "all",
      language: "all",
      page: 1,
      query: "",
    },
  });
};


//Mock options
const testCases = [
  {
    name: "year",
    options: [
      {
        name: "2020-Now",
        release_date: {
          gte: null,
          lte: null,
        },
      },
    ],
  },
  {
    name: "genre",
    options: [{ id: 111111, name: "All" }],
  },
  { name: "language", options: [{ id: 1, ISO_code: "en", name: "English" }] },
  {
    name: "sort by",
    options: [
      {
        name: "Popularity",
        code: "popularity.desc",
      },
    ],
  },
];




describe("Category Select Item Component", () => {
  testCases.forEach((testCase) => {
    test(`renders ${testCase.name} options correctly`, () => {
      // Create a test store with initial state
      const store = createTestStore({
        sortBy: "popularity.desc",
        year: { gte: null, lte: null },
        language: "en",
        genre: "All",
      });

      // Wrap the component in a <Provider>
      render(
        <Provider store={store}>
          <CategorySelectItem
            options={testCase.options}
            name={testCase.name}
            htmlFor={testCase.name}
            id={testCase.name}
          />
        </Provider>
      );
      // Assert
      expect(screen.getByLabelText(testCase.name)).toBeInTheDocument();
      testCase.options.forEach((option) => {
        expect(screen.getByText(option.name)).toBeInTheDocument();
      });
    });
  });
});
