import React from 'react';
import defaultLoading from '../../assets/gifs/dot-anim1.gif';
type LoadingProps = {
  loadingGif?: string;
};
const Loading = ({ loadingGif = defaultLoading }: LoadingProps) => {
  return (
    <div>
      <img src={loadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;
