import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <React.Fragment>
        <div className="my-3">
          <div className="card">
            <span
              class="position-absolute top-0 badge rounded-pill bg-danger"
              style={{ left: "0%", zIndex: "1" }}
            >
              {source}
            </span>
            <img
              src={
                !imageUrl
                  ? "https://media.gettyimages.com/photos/dhoni-mentor-of-india-looks-on-ahead-of-the-icc-mens-t20-world-cup-picture-id1348504658?s=2048x2048"
                  : imageUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-muted">
                  By {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a
                rel="noreferrer"
                href={newsUrl}
                target="_blank"
                className="btn btn-sm btn-dark"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewsItem;
