import React, { useEffect, useState } from "react";

const CreatorsList = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    // Simulamos una llamada a una API con datos mock
    const mockCreators = [
      {
        _id: "1",
        name: "Stan Lee",
        email: "stanlee@marvel.com",
        company: "Marvel Comics",
        yearsOfExperience: 60,
      },
      {
        _id: "2",
        name: "Bob Kane",
        email: "bobkane@dc.com",
        company: "DC Comics",
        yearsOfExperience: 45,
      },
      {
        _id: "3",
        name: "Jack Kirby",
        email: "jackkirby@marvel.com",
        company: "Marvel Comics",
        yearsOfExperience: 50,
      },
      {
        _id: "4",
        name: "Jerry Siegel",
        email: "jerry@dc.com",
        company: "DC Comics",
        yearsOfExperience: 40,
      },
      {
        _id: "5",
        name: "Steve Ditko",
        email: "steveditko@marvel.com",
        company: "Marvel Comics",
        yearsOfExperience: 42,
      },
    ];

    // Simula un delay como si fuera una API real
    setTimeout(() => {
      setCreators(mockCreators);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 creatorlist">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white pt-4 mb-6">
          Creators
        </h1>

        {creators.length === 0 ? (
          <p className="text-center text-gray-600">Loading creators...</p>
        ) : (
          <div className="creatorslista-grid">
            {creators.map((creator) => (
              <div
                key={creator._id}
                className="creator-card p-4 rounded-2xl shadow-md hover:shadow-lg transition mx-auto w-full"
              >
                <h2 className="text-xl font-semibold text-white-900">
                  {creator.name}
                </h2>
                <p className="text-white-700">Email: {creator.email}</p>
                <p className="text-white-600">Company: {creator.company}</p>
                <p className="text-white-500">
                  Experience: {creator.yearsOfExperience} years
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorsList;
