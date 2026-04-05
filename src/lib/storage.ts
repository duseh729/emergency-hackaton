export const STORAGE_KEYS = {
  HACKATHONS: 'daker_hackathons',
  TEAMS: 'daker_teams',
  SUBMISSIONS: 'daker_submissions',
  LEADERBOARDS: 'daker_leaderboards',
};

export const getStorage = (key: string, defaultValue: any = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
};

export const setStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

// Initial Data Mock
import mockHackathons from '@/data/mock/public_hackathons.json';
import mockTeams from '@/data/mock/public_teams.json';
import mockLeaderboard from '@/data/mock/public_leaderboard.json';
import mockDetails from '@/data/mock/public_hackathon_detail.json';

export const initializeStorage = () => {
  if (typeof window === 'undefined') return;

  // Combine simple hackathons list and their details
  if (!window.localStorage.getItem(STORAGE_KEYS.HACKATHONS)) {
    // A more advanced app would store details separately, but for our mock we map them nicely
    const fullHackathons = mockHackathons.map(h => {
      let detailsUrlMatch: any = mockDetails.slug === h.slug ? mockDetails : null;
      if (!detailsUrlMatch && mockDetails.extraDetails) {
        detailsUrlMatch = mockDetails.extraDetails.find(d => d.slug === h.slug) || null;
      }
      return { ...h, detailData: detailsUrlMatch };
    });
    setStorage(STORAGE_KEYS.HACKATHONS, fullHackathons);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    setStorage(STORAGE_KEYS.TEAMS, mockTeams);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.LEADERBOARDS)) {
    const combinedLeaderboards = [
      { slug: mockLeaderboard.hackathonSlug, entries: mockLeaderboard.entries, updatedAt: mockLeaderboard.updatedAt },
      ...(mockLeaderboard.extraLeaderboards?.map(lb => ({
        slug: lb.hackathonSlug,
        entries: lb.entries,
        updatedAt: lb.updatedAt
      })) || [])
    ];
    setStorage(STORAGE_KEYS.LEADERBOARDS, combinedLeaderboards);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    setStorage(STORAGE_KEYS.SUBMISSIONS, []); // empty initially
  }
};
