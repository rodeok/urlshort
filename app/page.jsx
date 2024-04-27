"use client"
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLink, FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import copy from 'copy-to-clipboard';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://flaskdb-mt6w.onrender.com/api/shorten', { longUrl });
      // const response = await axios.post('http://localhost:5000/api/shorten', { longUrl });

      setShortUrl(response.data.shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to shorten URL. Please try again.');
    }
  };

  const handleCopy = () => {
    copy(shortUrl);
    toast.success('Short URL copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-indigo-500 to-purple-500">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">URL Shortener</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          <div className="flex items-center rounded-l-md bg-gray-100 px-3 py-2 md:w-80">
            <FaLink className="text-gray-400" />
            <input
              type="text"
              placeholder="Enter long URL"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className={`flex-1 bg-transparent placeholder-gray-400 text-gray-700 outline-none ml-2 ${
                longUrl ? 'text-black' : ''
              }`}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-r-md mt-2 md:mt-0 md:rounded-l-none"
          >
            <FaClipboard className="mr-2" />
            Shorten
          </button>
        </form>
        {shortUrl && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">Short URL:</p>
            <div className="flex items-center">
              <Link href={shortUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 hover:text-indigo-700 mr-2">
        
                  {shortUrl}
                  <FaLink className="ml-2" />
            
              </Link>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-md px-2 py-1"
              >
                <FaClipboardCheck />
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}