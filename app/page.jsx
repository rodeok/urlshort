"use client"
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://flaskdb-mt6w.onrender.com/api/shorten', { longUrl });
      // const response = await axios.post('http://localhost:5000/api/shorten', { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">URL Shortener💢 </h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
        <input
        required
          type="url"
          autoComplete='on'
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className={`border border-gray-400 outline:none rounded-l-md px-4 py-2 w-full md:w-80 md:rounded-r-none placeholder-black ${
            longUrl ? 'text-black' : ''
          }`}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-r-md mt-2 md:mt-0 md:rounded-l-none"
        >
          Shorten
        </button>
      </form>
      {shortUrl && (
        <p className="mt-4 text-center">
          Short URL:{' '}
          <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
           {shortUrl}
          </Link>
        </p>
      )}
      <h3 className="text-white mt-4 text-center">Made by Favlinksoftware<p>Developed with Nextjs and Flask</p></h3>
    </div>
  );
}