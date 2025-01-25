import { useEffect, useState } from "react";
import Newsitem from "./Newsitem";

export const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setArticles(data.articles);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]); // Add category to dependency array

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">{category.toUpperCase()} News</span></h2>
      <div className="container">
        <div className="row">
          {articles && articles.length > 0 ? (
            articles.map((news, index) => (
              <div key={index} className="col-md-4 mb-3">
                <Newsitem 
                  title={news.title} 
                  description={news.description} 
                  src={news.urlToImage} 
                  url={news.url}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No news articles available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsBoard;