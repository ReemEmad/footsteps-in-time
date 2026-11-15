"use client";

import { useMemo, useCallback, useState } from "react";

type Event = { id: string; year: number; label: string };

export default function TimelineFilter({ events }: { events: Event[] }) {
  const [minYear, setMinYear] = useState(0);
  const [sortDescending, setSortDescending] = useState(false);
  const [order, setOrder] = useState<Event[]>(events);

  const visibleEvents = useMemo(() => {
    return events.filter((e) => e.year >= minYear);
  }, [events, minYear]);

  const handleSort = useCallback(() => {
    const sorted = [...order].sort((a, b) =>
      sortDescending ? b.year - a.year : a.year - b.year
    );
    setOrder(sorted);
  }, [order]);

  const shuffle = () => {
    setOrder((prev) => {
      const copy = [...prev];
      copy.reverse();
      return copy;
    });
  };

  return (
    <div>
      <input
        type="number"
        value={minYear}
        onChange={(e) => setMinYear(Number(e.target.value))}
      />
      <button onClick={handleSort}>Sort</button>
      <button onClick={shuffle}>Reverse</button>
      <ul>
        {visibleEvents.map((event, index) => (
          <li key={index}>
            {event.label} ({event.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
