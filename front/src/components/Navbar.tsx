import React from 'react';
import * as actions from '../actions/userActions';
import { IMyUser } from '../reducers/myUserReducer';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowGarments from './ShowGarments';
// import "./styles/Navbar.css";

interface IPropsGlobal {
	myUser: IMyUser;
	saveToken: (token: string) => void;
}

const Navbar: React.FC<IPropsGlobal> = (props) => {
	
	// const { SideNav, SideNavItem, Button, Dropdown, Divider} = require ('react-materialize');
	const logOut = () => {
		props.saveToken('');
		localStorage.removeItem('token');
	};

	return (
		<div>
		  <nav className="navbar navbar-expand-lg navbar-light bg-light">
		    <img src="images/LogoLabtex.png" width="70" height="60"  />

		    <div className="collapse navbar-collapse" id="navbarNavDropdown">
		      <ul className="navbar-nav">
		        <li className="nav-item active">
		          <a className="nav-link" href="/">
		            HOME <span className="sr-only">(current)
					</span>
		          </a>
		        </li> 
		{ /* <li className="nav-item">
		  <a className="nav-link" href="#">
		    Features
		  </a>  
		</li> */
		/* <li className="nav-item">
		  <a className="nav-link" href="#">
		    Pricing
		  </a>
		</li> */}
		        <li className="nav-item dropdown">
		          <a
		            className="nav-link dropdown-toggle"
		            id="navbarDropdownMenuLink"
		            data-toggle="dropdown"
		            aria-haspopup="true"
		            aria-expanded="false"
		          >
		            SEASONS
		          </a>
		          <div
		            className="dropdown-menu"
		            aria-labelledby="navbarDropdownMenuLink"
		          >
		            <Link to={"/garments/list"} className="dropdown-item" >
		              SS'19
		            </Link>
		            <a className="dropdown-item" href="#">
		              AW'20
		            </a>
		            <a className="dropdown-item" href="#">
		              SS'20
		            </a>
		          </div>
		        </li>
		      </ul>
		    </div>

		    <a className="navbar-brand" href="/">
		      {props.myUser.username}
		    </a>
		    <form className="form-inline">
		      <button
		        className="btn btn-outline-info my-2 my-sm-0"
		        type="submit"
		        onClick={logOut}
		        data-toggle="collapse"
		        data-target="#navbarNavDropdown"
		        aria-controls="navbarNavDropdown"
		        aria-expanded="false"
		        aria-label="Toggle navigation"
		      >
		        Logout
		        {/* <span className="navbar-toggler-icon" /> */}
		      </button>
		      {props.myUser.isAdmin && (
		        <Link to="/users/list" className="btn btn-outline-info my-2 my-sm-0">
		          Employees
		        </Link>
		      )}
		    </form>
		  </nav>
    </div>
    

//---------------MATERIALIZE-----------------------//
		// <div className="container-fluid">
			/* <style>

      #root > div > div {
        z-index: 99999 !important;
      }

</style> */
			/* <SideNav trigger={<Button>asdasd</Button>} options={{ closeOnClick: true }}>
				<div className="sidebarr">
					<SideNavItem
						userView
						user={{
							background: 'https://placeimg.com/640/480/tech',
							image: './public/images/LogoLabtex.png',
							name: 'John Doe'
						}}
					/>
					<SideNavItem href="#!icon" icon="cloud">
						First Link With Icon
					</SideNavItem>
					<Dropdown
						trigger={<Button>texto</Button>}
						options={{
							alignment: 'left',
							hover: false,
							belowOrigin: true,
							constrainWidth: false,
							coverTrigger: true
						}}
					>
						<a href="#">one</a>
						<a href="#">two</a>
						<Divider />
						<a href="#">three</a>
					</Dropdown>

					<SideNavItem divider />
					<SideNavItem subheader>Subheader</SideNavItem>
					<SideNavItem waves href="#!third">
						Third Link With Waves
					</SideNavItem>
				</div>
			</SideNav>
		</div> */
	);
};

const mapStateToProps = (state: IGlobalState) => ({  
	myUser: state.myUser
});

const mapDispatchToProps = {
	saveToken: actions.saveToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
