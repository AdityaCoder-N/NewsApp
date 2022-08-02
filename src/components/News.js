import React, { Component } from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

 

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {

    super();

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    };  
  }

  async updateNews() {

    this.props.setProgress(30);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c3719de2034ca9ac81c0ec65a4dba4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });

    this.updateNews();
  };
  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });

    this.updateNews();
  };

  capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  fetchMoreData = async() => {
    this.setState({page:this.state.page+1});

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c3719de2034ca9ac81c0ec65a4dba4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);

    let parsedData = await data.json();
    
    console.log(parsedData);
    console.log(this.state.articles.length);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center my-5">NewsTurtle - Top {this.capitalize(this.props.category)} Headlines </h2>

        {this.state.loading && <Spinner />} 

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalArticles}
          loader={<Spinner/>}>

          <div className="container">      
            <div className="row">
              {
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={element.description ? element.description : ""}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>  
        </InfiniteScroll>

      </>
    );
  }
}

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

export default News;
