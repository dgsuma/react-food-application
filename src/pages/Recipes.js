import React, { Component } from "react";
import RecipeList from "../components/RecipeList";
import Search from "../components/Search";
import { recipeData } from "../data/tempList";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }

  state = {
    // 3 dummy datas from tempList and put in 'recipes' array
    recipes: recipeData,
    search: "",
    //  use below url to get actual data
    url: `https://www.food2fork.com/api/search?key=${
      process.env.REACT_APP_API_KEY
    }`
  };

  // uses fetch() API AJAX request to get actual data in json format
  // and store them in 'recipes' array.
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({
        recipes: jsonData.recipes
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    // ReactFragment created <></> below
    return (
      <>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <RecipeList recipes={this.state.recipes} />
      </>
    );
  }
}
