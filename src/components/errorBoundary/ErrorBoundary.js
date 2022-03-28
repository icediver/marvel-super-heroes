import { Component } from "react";
import ErrorMesage from "../erorrMesage/ErrorMesage";

class ErrorBoundary extends Component {
  state = {
    error: false
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.state({
      error: true
    })
  }
  render() {
    if(this.state.error) {
      return <ErrorMesage/>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;