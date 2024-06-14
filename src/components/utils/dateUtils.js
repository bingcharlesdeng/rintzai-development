export const formatDateTime = (timestamp) => {
    if (!timestamp) return '';
  
    const date = timestamp.toDate();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  