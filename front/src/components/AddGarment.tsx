import React from "react";
import { IGarment } from "../interfaceIgarment";
import { RouteComponentProps } from "react-router";
import { IMyUser } from "../reducers/myUserReducer";
import { IColor } from "../interfaceColor";
import { ISize } from "../interfaceSize";
import { IRole } from "../interfaceRole";
import { IUser } from "../interfaceIuser";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/garmentActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

interface IPropsGlobal {
  roles: IRole[];
  users: IUser[];
  sizes: ISize[];
  colors: IColor[];
  garment: IGarment[];
  token: string;
  myUser: IMyUser;
  addNewGarment: (garment: IGarment) => void;
}

const AddGarment: React.FC<IPropsGlobal & RouteComponentProps<{}>> = props => {
  const [reference, setReference] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [season, setSeason] = React.useState("");
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<string[]>([]);
  const [image, setImage] = React.useState();

  const updateReference = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReference(event.currentTarget.value);
  };

  const updateDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value);
  };

  const updateSeason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeason(event.currentTarget.value);
  };

  const updateSizes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setSizes(selectedOptions);
  };

  const updateColors = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setColors(selectedOptions);
  };

  const updateUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setUsers(selectedOptions);
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.currentTarget.files![0]);
  };

  const AddImage = (garment_id: string) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("id", garment_id);

    fetch("http://localhost:3000/api/garments/addImage", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token
      },
      body: formData
    }).then(response => {
      if (response.ok) {
        response.json().then((garment: IGarment) => {
          props.addNewGarment(garment);
          props.history.push("/garments/");
        });
      }
    });
  };

  const Add = () => {
    fetch("http://localhost:3000/api/garments/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        reference: reference,
        description: description,
        season: season,
        sizes: sizes,
        colors: colors,
        users: users
      })
    }).then(response => {
      if (response.ok) {
        response.json().then((garment: IGarment) => {
          AddImage(garment._id);
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group" id="formEdit">
            <h3>Garment Details</h3>
            <br />
            <h4>Reference</h4>
            <input
              type="text"
              id="reference"
              placeholder=""
              className="form-control"
              onChange={updateReference}
            />
            <br />
            <h4>Description</h4>
            <textarea
              id="exampleFormControlTextarea1"
              className="form-control"
              onChange={updateDescription}
            />
            <br />
            <h4>Season</h4>
            <input
              type="text"
              id="season"
              placeholder=""
              className="form-control"
              onChange={updateSeason}
            />
            <br />

            <h4>Colors</h4>
            <select onChange={updateColors} multiple>
              {props.colors.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <br />

            <h4>Sizes</h4>
            <select onChange={updateSizes} multiple>
              {props.sizes.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            <br />

            <h4>Users</h4>
            <select onChange={updateUsers} multiple>
              {props.users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.username}
                </option>
              ))}
            </select>
            <br />

            <h4>Images</h4>
            <input
              type="file"
              className="btn btn-info"
              onChange={updateImage}
            />
            <br />
            <Link
              to={"/garments/"}
              type="submit"
              className="btn btn-outline-info"
              onClick={Add}
            >
              Save
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  token: state.token,
  myUser: state.myUser,
  roles: state.roles,
  sizes: state.sizes,
  colors: state.colors,
  garment: state.garments
});

const mapDispatchToProps = {
  addNewGarment: actions.addNewGarment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGarment);