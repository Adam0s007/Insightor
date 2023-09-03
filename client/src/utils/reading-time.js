export const countWords = (str) => {
    console.log("WYWOLUJE SIE!")
    return str.split(/\s/).filter(Boolean).length;
  };
  
  export const calculateReadingTime = (totalWords) => {
    const wordsPerMinute = 200;
    const readingTimeSeconds = Math.floor((totalWords / wordsPerMinute) * 60);
  
    const days = Math.floor(readingTimeSeconds / (3600 * 24));
    const hours = Math.floor((readingTimeSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((readingTimeSeconds % 3600) / 60);
    const seconds = readingTimeSeconds % 60;
  
    return { days, hours, minutes, seconds };
  };
  
  export const formatReadingTime = ({ days, hours, minutes, seconds }) => {
    let formatted = "";
  
    if (days > 0) {
      formatted += `${days} days `;
    }
    if (hours > 0) {
      formatted += `${hours} hours `;
    }
    if (minutes > 0) {
      formatted += `${minutes} minutes `;
    }
    if (seconds > 0) {
      formatted += `${seconds} seconds`;
    }
  
    return formatted || "Less than a second";
  };
  