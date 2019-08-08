import React, { useEffect } from "react";
import { IGarment } from "../interfaceIgarment";
import { RouteComponentProps } from "react-router";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../actions/garmentActions";
import { garmentsReducer } from "../reducers/garmentsReducer";
import { Link } from "react-router-dom";
import { IRole } from "../interfaceRole";
import { IUser } from "../interfaceIuser";
import { userInfo } from "os";
import { usersReducer } from "../reducers/usersReducer";
import { IMyUser } from "../reducers/myUserReducer";

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  roles: IRole[];
  users: IUser[];
  garments: IGarment[];
  setGarments: (garments: []) => void;
  removeGarment: (garment_id: string) => void;
}

const ShowGarments: React.FC<
  IPropsGlobal & RouteComponentProps<{ garment_id: string }>
> = props => {
  const garment = props.garments.find(
    g => g._id === props.match.params.garment_id
  );

  const getGarments = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/garments/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(garments => {
            props.setGarments(garments);
          });
        }
      });
    }
  };

  useEffect(() => {
    getGarments();
  }, []);

  const Delete = (garment_id: string) => {
    const id = garment_id;
    fetch("http://localhost:3000/api/garments/" + garment_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        props.removeGarment(garment_id);
        props.history.push("/garments");
      }
    });
  };
  return (
    <div className="container">
      <div className="row">
        {props.garments.map(g => (
          <div key={g._id} className="col-4 border-secondary mb-3">
            <div className="card garments">
              {g.images && (
                <img
                  src={"http://localhost:3000/uploads/" + g.images[0]}
                  className="card-img-top garments"
                  alt="Bomberg"
                />
              )}
              <div className="card-body garments">
                <h5 className="card-title garments">{g.reference}</h5>
                <p className="card-text garments">{g.description}</p>
                <Link to={"/garments/edit/" + g._id} className="btn btn-info">
                  Edit
                </Link>
                {(props.myUser.role === "5d3ebb9c17fb7b60d454b0a8" ||
                  props.myUser.role === "5d3ebc4b17fb7b60d454b0f2") && (
                  <div className="btn btn-info" onClick={() => Delete(g._id)}>
                    Delete
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {(props.myUser.role === "5d3ebb9c17fb7b60d454b0a8" ||
          props.myUser.role === "5d3ebc4b17fb7b60d454b0f2") && (
          <div className="container">
            <Link to="/garments/add" className="btn btn-info">
              Add New Garment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  roles: state.roles,
  garments: state.garments,
  myUser: state.myUser,
  users: state.users
});

const mapDispatchToProps = {
  setGarments: actions.setGarments,
  removeGarment: actions.removeGarment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGarments);