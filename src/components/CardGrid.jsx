import React from 'react';
import Card from './Card';

const CardGrid = (props) => {
  return (
    <div className="card-grid">
      <div className="row">
        {props.dogs.map( (dog) => (
          <div className="col-4 mb-4" key={dog.field_petpoint_id}>
            <Card dog={dog} />
          </div>
        ) )}
      </div>
      <div className="text-center">
        <p className="text-medium color-teal">Tap a photo to learn more</p>
      </div>
    </div>
  );
};


export default CardGrid;