"use client";

import { useEffect, useState } from "react";

type Artifact = {
  id: string;
  title: string;
  era: string;
};

export default function ArtifactList() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.example.com/artifacts")
      .then((res) => res.json())
      .then((data) => {
        setArtifacts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {artifacts.map((artifact) => (
        <li key={artifact.id} onClick={() => setExpandedId(artifact.id)}>
          <h3>{artifact.title}</h3>
          {expandedId === artifact.id && <p>Era: {artifact.era}</p>}
        </li>
      ))}
    </ul>
  );
}
