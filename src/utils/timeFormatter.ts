export const formatRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp * 1000; // Convert timestamp to milliseconds
    
    // Convert diff to minutes/hours/days
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
  
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 30) {
      return `${days}d ago`;
    } else {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    }
  };
  
  export const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC'
    }) + ' UTC';
  };