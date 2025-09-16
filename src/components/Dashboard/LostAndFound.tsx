import React, { useState } from 'react';

interface LostItem {
  id: number;
  name: string;
  description: string;
  image?: string;
  status: 'lost' | 'found';
}

const initialFoundItems: LostItem[] = [
  {
    id: 1,
    name: 'Black Wallet',
    description: 'Found near Gate A. Contains some cash and cards.',
    status: 'found',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&h=200'
  },
  {
    id: 2,
    name: 'Red Backpack',
    description: 'Found at Section B. Has a water bottle and books.',
    status: 'found',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=200&h=200'
  }
];

const LostAndFound: React.FC = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [foundItems] = useState<LostItem[]>(initialFoundItems);
  const [form, setForm] = useState({ name: '', description: '', image: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) return;
    setLostItems([
      ...lostItems,
      {
        id: Date.now(),
        name: form.name,
        description: form.description,
        image: form.image,
        status: 'lost'
      }
    ]);
    setForm({ name: '', description: '', image: '' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Register Lost Item</h2>
        <form onSubmit={handleRegister} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Register Lost Item
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Your Lost Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lostItems.length === 0 && <p className="dark:text-gray-100">No lost items registered yet.</p>}
          {lostItems.map(item => (
            <div key={item.id} className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded shadow flex items-center space-x-4">
              {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />}
              <div>
                <h3 className="font-bold dark:text-gray-100">{item.name}</h3>
                <p className="text-sm dark:text-gray-100">{item.description}</p>
                <span className="text-xs text-yellow-700 dark:text-yellow-200">Status: {item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Found Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foundItems.map(item => (
            <div key={item.id} className="bg-green-50 dark:bg-green-900 p-4 rounded shadow flex items-center space-x-4">
              {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />}
              <div>
                <h3 className="font-bold dark:text-gray-100">{item.name}</h3>
                <p className="text-sm dark:text-gray-100">{item.description}</p>
                <span className="text-xs text-green-700 dark:text-green-200">Status: {item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostAndFound;