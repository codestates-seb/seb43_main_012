import React from 'react';
type LoadingProps = {
  loadingGif: string;
};
const Loading = ({ loadingGif }: LoadingProps) => {
  return (
    <div>
      <img src={loadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;
