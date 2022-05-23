import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

// We'll get main detail dog out of route
// then generate the list of other dogs out of data less the current dog
const CardDetails = (props) => {

  // Make age output prettier
  var dog_age = '';
  if (props.dog.field_age < 12) {
    dog_age = props.dog.field_age + ' months old';
  }
  else if (props.dog.field_age === 12) {
    dog_age = (props.dog.field_age / 12) + ' year old';
  }
  else if (props.dog.field_age % 12 === 0) {
    dog_age = (props.dog.field_age / 12) + ' years old';
  }
  else {
    dog_age = (props.dog.field_age / 12).toFixed(1) + ' years old';
  }

  // cleanup Drupal's entity encoding for image src urls
  let imgSrc = props.dog.field_main_image;
  let imageCleanSrc = imgSrc.replace(/&amp;/g, '&');

  // prepare altered adjective
  let alteredAdjective = (props.dog.field_sex == 'Male') ? 'Neutered' : 'Spayed';

  return (
    <div>
      <div>

        <div className="detail--thumb-list">
          {/* All dogs thumbnails */}
          <div className="mx-auto">
            <ul>
              { props.allDogs.map((dog) => {
                let activeClass = '';
                if (dog.field_petpoint_id === props.dog.field_petpoint_id) {
                  activeClass = 'is-active';
                }

                // cleanup Drupal's entity encoding for image src urls
                let imgSrc = dog.field_main_image;
                let imageCleanSrc = imgSrc.replace(/&amp;/g, '&');

                return (
                  <li className={`mb-2 ${activeClass}`} key={dog.field_petpoint_id}>
                    <Link to={`/dog/${dog.field_petpoint_id}`} onClick={() => window.scrollTo(0,0)}>
                      <img
                        alt={`${dog.name} Info`}
                        src={imageCleanSrc}
                      />
                      <p className="text-center color-teal mb-0">{ dog.name }</p>
                    </Link>
                  </li>
                );
              })
              }
            </ul>
            <Link className="btn btn-ahs btn-ahs--sidebar my-1 w-100" to="/" onClick={props.fetchDogs}>Back to list</Link>
          </div>
        </div>


        <div className="detail--info-pane">

          {/* Main detail */}
          <div className="detail--info-pane--description px-5">

            <div className="detail--info-pane--title">
              <h1 className="title">{props.dog.name}</h1>
              <span className="card-status">{ props.dog.field_touchscreen_display_status }</span>
            </div>

            <div><strong>{props.dog.field_breed}</strong></div>
            <div>{ dog_age }</div>
            {/*{props.dog.field_breed_secondary.length ? `, ${props.dog.field_breed_secondary}` : ''}*/}
            <div>{(props.dog.field_altered == 'True') ? alteredAdjective + ' ' : ''}{props.dog.field_sex}</div>
            {/*<div>{props.dog.field_age}</div>*/}
            <div>{props.dog.field_weight} pounds</div>
            <div>Adoption Fee: ${props.dog.field_price}</div>
            <div>Adoption ID#: {props.dog.field_petpoint_id}</div>
            <div>
              <h3 className="my-4">Hi, my name is {props.dog.name}!</h3>
              <div dangerouslySetInnerHTML={{__html: props.decode(props.dog.field_keywords)}} />
            </div>
            <div className="fine-print my-4">* Minnesota sales tax and an administrative fee ($20 for cats and dogs, $5 for all other animals) apply to all adoptions. Adoption fee includes a physical examination, vaccinations, parasite treatment, surgical sterilization, and a 14-day supply of any prescribed medications. Sixty-day return policy, free behavior helpline, and canine training school discount available.</div>
          </div>
        </div>


        <div className="detail--info-pane--image">
          <img
            alt={`${props.dog.name} Info`}
            src={imageCleanSrc}
          />

          {props.modal.map((eachModal) =>
            <button key={eachModal.uuid} type="button" className="btn btn-ahs btn-ahs--main w-100 mt-3" data-toggle="modal" data-target={`#${eachModal.uuid}`}>
              {eachModal.title}
            </button>
            )
          }
        </div>

      </div>
      {props.modal.map((eachModal) =>
          <Modal key={eachModal.uuid} modalInfo={eachModal}/>
        )
      }
    </div>
  );
};

export default CardDetails;
