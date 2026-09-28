//import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ডাটা ফেচ করা
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // নতুন টাস্ক যোগ করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);

    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      setTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // টাস্ক ডিলিট করা
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4 text-primary fw-bold">Laravel + Next.js Task App</h2>
      
      <form onSubmit={handleSubmit} className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="নতুন টাস্ক লিখুন..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}
        </button>
      </form>

      <div className="list-group">
        {tasks.length === 0 ? (
          <p className="text-center text-muted">কোনো টাস্ক পাওয়া যায়নি!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center task-card mb-2 rounded shadow-sm">
              <span>{task.title}</span>
              <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm rounded-pill px-3">
                ডিলিট
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
