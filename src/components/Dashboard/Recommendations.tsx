import React from 'react';

const recommendations = [
  { id: 1, suggestion: 'Deploy 2 more security teams to Gate B due to rising density.' },
  { id: 2, suggestion: 'Open alternate route near Section 2 to ease congestion.' },
  { id: 3, suggestion: 'Send SMS alert to pilgrims near Main Plaza about alternate exits.' },
];

const Recommendations: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">AI Recommendations</h2>
    <ul className="space-y-3">
      {recommendations.map(rec => (
        <li key={rec.id} className="bg-blue-50 dark:bg-blue-900 dark:text-blue-100 p-3 rounded shadow">
          {rec.suggestion}
        </li>
      ))}
    </ul>
  </div>
);

export default Recommendations;