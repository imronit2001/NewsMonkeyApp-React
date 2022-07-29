import React, { Component } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [
    {
      source: {
        id: null,
        name: "Xataka.com",
      },
      author: "Javier Pastor",
      title:
        "He usado una LG C2 OLED de última generación como monitor: esta ha sido mi experiencia",
      description:
        "Soy muy especialito con el tema del monitor que uso para trabajar. Me paso fácilmente 10 horas mirando una pantalla, así que llevo tiempo teniendo claro que esta es una de las inversiones más importantes que alguien puede hacer en su equipo.\n<!-- BREAK 1 -->\n…",
      url: "https://www.xataka.com/perifericos/he-usado-lg-c2-oled-ultima-generacion-como-monitor-esta-ha-sido-mi-experiencia",
      urlToImage: "https://i.blogs.es/94010c/lg-c2-1/840_560.jpeg",
      publishedAt: "2022-07-10T08:01:04Z",
      content:
        "Soy muy especialito con el tema del monitor que uso para trabajar. Me paso fácilmente 10 horas mirando una pantalla, así que llevo tiempo teniendo claro que esta es una de las inversiones más importa… [+13749 chars]",
    },
    {
      source: {
        id: null,
        name: "Xataka.com",
      },
      author: "Eva Rodríguez de Luis",
      title:
        "La lista de deseos de los editores de Xataka para el Amazon Prime Day 2022",
      description:
        "En apenas unas horas tendrá lugar el Prime Day 2022, el festival de ofertas de Amazon y uno de los más importantes del año con permiso del Black Friday. No obstante, todavía hay tiempo para pensar si necesitas algo de forma imperiosa o si simplemente estás ab…",
      url: "https://www.xataka.com/seleccion/lista-deseos-editores-xataka-para-amazon-prime-day-2022",
      urlToImage:
        "https://i.blogs.es/24f7c8/gadgets-whislist-prime-day-2020/840_560.jpg",
      publishedAt: "2022-07-10T10:01:08Z",
      content:
        "En apenas unas horas tendrá lugar el Prime Day 2022, el festival de ofertas de Amazon y uno de los más importantes del año con permiso del Black Friday. No obstante, todavía hay tiempo para pensar si… [+14129 chars]",
    },
    {
      source: {
        id: null,
        name: "Xataka.com",
      },
      author: "Javier Lacort",
      title:
        "Fabricantes, queremos que vuelva la espectacular tecnología transparente de los años 90",
      description:
        "Nothing trajo con sus auriculares y su primer teléfono, a punto de empezar sus ventas, una estética marcada por el diseño físico transparente. Nothing se consolidará como una marca de éxito o se quedará por el camino, pero en su lanzamiento se le ha de recono…",
      url: "https://www.xataka.com/retro/fabricantes-queremos-que-vuelva-espectacular-tecnologia-transparente-anos-90",
      urlToImage: "https://i.blogs.es/55a5bd/dest/840_560.jpeg",
      publishedAt: "2022-07-10T09:01:07Z",
      content:
        "Nothing trajo con sus auriculares y su primer teléfono, a punto de empezar sus ventas, una estética marcada por el diseño físico transparente. Nothing se consolidará como una marca de éxito o se qued… [+5568 chars]",
    },
    {
      source: {
        id: null,
        name: "Xataka.com",
      },
      author: "Yúbal Fernández",
      title:
        "Guía router: todo lo que debes saber para colocarlo, configurarlo y usar sus principales funciones",
      description:
        "Te traemos una guía de inicio para que conozcas a fondo tu router, de manera que puedas sacarle el máximo provecho posible. La idea es recopilar aquí la información que te hemos ido dando sobre el router en Xataka Basics, de forma que tengas una única guía a …",
      url: "https://www.xataka.com/basics/guia-router-todo-que-debes-saber-para-colocarlo-configurarlo-usar-sus-principales-funciones",
      urlToImage: "https://i.blogs.es/e71497/router/840_560.jpg",
      publishedAt: "2022-07-10T12:01:11Z",
      content:
        "Te traemos una guía de inicio para que conozcas a fondo tu router, de manera que puedas sacarle el máximo provecho posible. La idea es recopilar aquí la información que te hemos ido dando sobre el ro… [+18844 chars]",
    },
  ];
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: this.totalResults,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.page - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({
      page: this.state + 1,
    });
    this.updateNews();
  };

  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="text-center mt-5 pt-3">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4">
                    <NewsItem
                      key={element.url}
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}
