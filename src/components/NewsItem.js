
import React, { Component } from "react";

export class NewsItem extends Component {
  render() {

    let {title, description,imageUrl,newsUrl,date} = this.props ;

    return (
      <div className="my-3">
        <div className="card" >
          <img src={(imageUrl)?imageUrl:"https://static.toiimg.com/thumb/msid-93188947,width-1070,height-580,imgsize-304424,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text" ><small className="text-muted">Published on {new Date(date).toUTCString()}</small> </p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
