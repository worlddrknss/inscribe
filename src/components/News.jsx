import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";

const categories = [
  "General",
  "World",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
  "Nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory.toLowerCase()}&lang=en&apikey=5ab39b6b2b87610b3cb4bfce51d6c908`;
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });
      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
    };
    fetchNews();
  }, [selectedCategory]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">Inscribe</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User" />
            <p>WorldDrknss Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  className="nav-link"
                  key={category}
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="news-section">
          <div className="headline">
            {headline && (
              <>
                <img src={headline.image || noImg} alt={headline.title} />
                <h2 className="headline-title">
                  {headline.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h2>
              </>
            )}
          </div>
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};

export default News;
