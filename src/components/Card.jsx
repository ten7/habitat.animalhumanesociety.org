import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {

  // cleanup Drupal's entity encoding for image src urls
  let imgSrc = props.dog.field_main_image;
  let imageCleanSrc = imgSrc.replace(/&amp;/g, '&');

  return (
    <div>
      <Link to={`/dog/${props.dog.field_petpoint_id}`}>
        <img
          className="card-img-top"
          alt={`${props.dog.name} Info`}
          src={imageCleanSrc}
        />
        <div className="card-body text-center">
          <h3 className="card-title mb-0">{props.dog.name}</h3>
          <span className="card-status">{ props.dog.field_touchscreen_display_status }</span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
