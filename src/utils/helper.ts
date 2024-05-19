// Helper function to parse ISO 8601 duration
export function parseISODuration(duration) {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = matches[1] ? parseInt(matches[1].slice(0, -1)) : 0;
  const minutes = matches[2] ? parseInt(matches[2].slice(0, -1)) : 0;
  const seconds = matches[3] ? parseInt(matches[3].slice(0, -1)) : 0;

  return hours * 60 + minutes + seconds / 60; // Convert to minutes
}
