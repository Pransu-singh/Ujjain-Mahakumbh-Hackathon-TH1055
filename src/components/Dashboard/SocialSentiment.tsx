import React, { useState } from 'react';

type SentimentType = 'positive' | 'neutral' | 'negative';

interface Post {
  id: number;
  user: string;
  text: string;
  sentiment: SentimentType;
}

const initialPosts: Post[] = [
  { id: 1, user: '@pilgrim123', text: 'Crowd is huge but management is great!', sentiment: 'positive' },
  { id: 2, user: '@fieldofficer', text: 'Section 2 is getting crowded, need more volunteers.', sentiment: 'neutral' },
  { id: 3, user: '@newsupdate', text: 'Long queues at Gate B, people are frustrated.', sentiment: 'negative' },
];

const getSentimentColor = (sentiment: SentimentType) => {
  switch (sentiment) {
    case 'positive':
      return 'text-green-700 dark:text-green-300';
    case 'neutral':
      return 'text-yellow-700 dark:text-yellow-300';
    case 'negative':
      return 'text-red-700 dark:text-red-300';
    default:
      return 'text-gray-700 dark:text-gray-200';
  }
};

const getOverallMood = (posts: Post[]) => {
  const counts = { positive: 0, neutral: 0, negative: 0 };
  posts.forEach(p => counts[p.sentiment]++);
  if (counts.positive >= counts.neutral && counts.positive >= counts.negative) return 'Positive';
  if (counts.negative >= counts.positive && counts.negative >= counts.neutral) return 'Negative';
  return 'Neutral';
};

const SocialSentiment: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<SentimentType>('positive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setPosts([
        {
          id: Date.now(),
          user: '@you',
          text,
          sentiment,
        },
        ...posts,
      ]);
      setText('');
      setSentiment('positive');
    }
  };

  const overallMood = getOverallMood(posts);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Share Your Social Sentiment</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Share your thoughts..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex items-center mb-2">
          <label className="mr-2 font-semibold dark:text-gray-100">Sentiment:</label>
          <select
            className="border rounded p-1"
            value={sentiment}
            onChange={e => setSentiment(e.target.value as SentimentType)}
          >
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          Share
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">All Sentiments</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow">
              <span className="font-semibold dark:text-gray-100">{post.user}:</span>
              <span className={`ml-2 ${getSentimentColor(post.sentiment)}`}>{post.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold dark:text-gray-100">Overall Mood:</h3>
        <span className={`text-lg ${getSentimentColor(overallMood.toLowerCase() as SentimentType)}`}>
          {overallMood}
        </span>
      </div>
    </div>
  );
};

export default SocialSentiment;