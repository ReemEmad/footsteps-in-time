"use client";

import { create } from "zustand";
import { Milestone, SideEncounter } from "../types/journey";

interface JourneyState {
  // Data
  milestones: Milestone[];

  // Navigation & Spatial Focus
  activeMilestoneId: string;
  activeCoordinates: [number, number];
  activeZoom: number;

  // Encounter Overlay State
  activeEncounter: SideEncounter | null;
  isEncounterOpen: boolean;

  // Actions
  setMilestones: (data: Milestone[]) => void;
  setActiveMilestone: (milestone: Milestone) => void;
  openEncounter: (encounter: SideEncounter) => void;
  closeEncounter: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  milestones: [],
  activeMilestoneId: "",
  activeCoordinates: [21.3789, 39.8579], // Cave of Thawr default
  activeZoom: 12,
  activeEncounter: null,
  isEncounterOpen: false,

  setMilestones: (data) => set({ milestones: data }),

  setActiveMilestone: (milestone) =>
    set({
      activeMilestoneId: milestone.id,
      activeCoordinates: milestone.coordinates,
      activeZoom: milestone.zoom,
    }),

  openEncounter: (encounter) =>
    set({
      activeEncounter: encounter,
      isEncounterOpen: true,
    }),

  closeEncounter: () =>
    set({
      activeEncounter: null,
      isEncounterOpen: false,
    }),
}));
