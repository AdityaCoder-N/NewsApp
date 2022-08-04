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

    // NewsApi -
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c3719de2034ca9ac81c0ec65a4dba4&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // // mediaStack news api-
    // const url = `http://api.mediastack.com/v1/news?access_key=449bc7fa208e4e1b58b1194ed20490c7&countries=in&categories=${this.props.category}&languages=en&offset=13`


    let data = await fetch(url);
    
    let parsedData = await data.json();
    
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });

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

    // const url = `http://api.mediastack.com/v1/news?access_key=449bc7fa208e4e1b58b1194ed20490c7&countries=in&categories=${this.props.category}&languages=en&offset=0`
    
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
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
                        date={element.published_at}
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
  category: "news",
};

export default News;
