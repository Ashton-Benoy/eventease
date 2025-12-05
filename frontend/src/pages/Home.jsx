import React from "react";
import EventList from "./EventList";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to EventEase</h1>
      <EventList />
    </div>
  );
};

export default Home;
