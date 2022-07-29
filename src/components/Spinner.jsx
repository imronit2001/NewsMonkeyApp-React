import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="https://assets-blog.lottiefiles.dev/2021/03/CoMw0bhvYXrDGN6ZDTOWmFAfoIWWR8VxEIAzq9r8.gif"
          alt="loading"
          width={200}
        />
      </div>
    );
  }
}
