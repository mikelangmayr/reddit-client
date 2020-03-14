import { useState } from 'react';
import Head from 'next/head'

import PaginatedList from './paginatedList';

const Home = () => {
  const [redditFeed, setRedditFeed] = useState([]);

  const fetchRedditFeed = async (redditUrl) => {
    try {
      const redditFeedResponse = await fetch(redditUrl);
      const redditFeed = await redditFeedResponse.json();
      console.log('child: ', redditFeed.data.children[0])
      
      setRedditFeed(redditFeed.data.children);
    } catch(err) {
      console.log('Could not reach reddit server: ', err);
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Reddit client</title>
      </Head>

      <div>Reddit client: Please choose a Reddit feed</div>

      <button className="btn btn-info button" onClick={async () => {await fetchRedditFeed('https://www.reddit.com/r/all/hot.json')}}>Fetch hot feed</button>
      <button className="btn btn-success button" onClick={async () => {await fetchRedditFeed('https://www.reddit.com/r/all/new.json')}}>Fetch new feed</button>
      <button className="btn btn-warning button" onClick={async () => {await fetchRedditFeed('https://www.reddit.com/r/all/top.json')}}>Fetch top feed</button>
      <PaginatedList list={redditFeed} />
      
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
        }

        .button {
          margin: 10px 5px;
        }
    `}</style>
    </div>
)}

export default Home
