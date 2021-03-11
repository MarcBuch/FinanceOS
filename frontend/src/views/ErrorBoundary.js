import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({ error: error.message });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    } else {
      return (
        <div id="error">
          <h2>{this.state.error}</h2>
        </div>
      );
    }
  }
}
