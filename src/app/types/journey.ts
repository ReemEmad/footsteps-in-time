export interface SideEncounter {
  id: string;
  title: string;
  subtitle?: string;
  coordinates: [number, number]; // [latitude, longitude]
  brief: string;
  narrative: string;
  historicalFigure?: string;
  tag?: "miracle" | "encounter" | "reflection" | "oasis";
}

export interface Milestone {
  id: string;
  order: number;
  title: string;
  locationName: string;
  coordinates: [number, number];
  zoom: number; // Viewport zoom target for the map
  narrative: string;
  quote?: {
    arabic?: string;
    translation: string;
    source: string;
  };
  encounters?: SideEncounter[]; // Discoverable points near this waypoint
}
