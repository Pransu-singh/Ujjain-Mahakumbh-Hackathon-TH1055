import React from 'react';

const posts = [
  { id: 1, user: '@pilgrim123', text: 'Crowd is huge but management is great!', sentiment: 'positive' },
  { id: 2, user: '@fieldofficer', text: 'Section 2 is getting crowded, need more volunteers.', sentiment: 'neutral' },
  { id: 3, user: '@newsupdate', text: 'Long queues at Gate B, people are frustrated.', sentiment: 'negative' },
];

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'text-green-700';
    case 'neutral':
      return 'text-yellow-700';
    case 'negative':
      return 'text-red-700';
    default:
      return 'text-gray-700';
  }
};

const SocialSentiment: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Social Media Sentiment</h2>
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 rounded shadow">
          <span className="font-semibold">{post.user}:</span>
          <span className={`ml-2 ${getSentimentColor(post.sentiment)}`}>{post.text}</span>
        </div>
      ))}
    </div>
    <div className="mt-6">
      <h3 className="font-semibold">Overall Mood:</h3>
      <span className="text-lg text-green-700">Positive</span>
    </div>
  </div>
);

export default SocialSentiment;