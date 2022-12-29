import React from 'react';

const ImgList = (props) => {
  const images = props.images.map(({ id, urls, description }) => {
    return <img key={id} src={urls.regular} alt={description} />;
  });
  return <div>{images}</div>;
};

export default ImgList;
