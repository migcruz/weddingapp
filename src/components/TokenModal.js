import React from "react";
// import {
// 	Button,
// 	Modal,
// 	ModalHeader,
// 	ModalBody,
// 	ModalFooter,
// 	Form,
// 	FormGroup,
// 	Input,
// 	Label
// } from "reactstrap";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class TokenModal extends React.Component {
	// const [open, setOpen] = React.useState(false);
  
	// const handleClose = () => {
	//   setOpen(false);
	// };

	constructor(props) {
		super(props);
		this.state = {
            activeItem: {
                id: "",
                token: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                allergies: "",
                rsvp: false,
                vegan: false,
                vegetarian: false,
                url: "",
            },
			firstName: '',
			lastName: '',
			firstLastName: '',
			guestToken: this.props.activeItem,
		};
	}

    handleChange = e => {
    	let { id, value } = e.target;
		if (e.target.type === "checkbox") {
			value = e.target.checked;
		}

		// async callback otherwise handleCleanup executes before setstate finishes
        this.setState({ [id]: value }, () => {
			this.handleCleanup();
		});
	};

	handleCleanup = () => {
		var tempValue = this.state.firstName.replace(/\s+/g, ''); //remove white spaces
        const firstName = tempValue.toLowerCase();

		var tempValue = this.state.lastName.replace(/\s+/g, ''); //remove white spaces
        const lastName = tempValue.toLowerCase();

		var tempValue = firstName + lastName;

        this.setState({ firstLastName: tempValue });
	};

	handleTokenVerify = (onSaveCallback) => {
		
		this.handleCleanup();

		//Hash the first and last name
        var crypto = require('crypto')
        var shasum = crypto.createHash('sha1')
        shasum.update(this.state.firstLastName)
        var hashToken = shasum.digest('hex')

        axios
            // .get("http://localhost:8000/api/guestlist/ABCD4/")
            // Because of proxy in package.json, command be shorten as follows:
            .get(`/api/guestlist/${hashToken}/`)
            .then(res => this.setState({ activeItem: res.data }, () => {
                console.log('LLLLLLLLLLLLLLL: ', this.state.activeItem);
				onSaveCallback();
            }))
            .catch(err => console.log(err));

			// TODO error handling
	};

	handleClose = () => {
		// setOpen(false);
	};

	// renderError = () => {
    //     return (
    //         <div className="my-5 tab-list">
    //             <span
    //                 onClick={() => this.displayRsvp(true)}
    //                 className={this.state.viewRsvp ? "active" : ""}
    //             >
    //                 Rsvp
    //         </span>
    //             <span
    //                 onClick={() => this.displayRsvp(false)}
    //                 className={this.state.viewRsvp ? "" : "active"}
    //             >
    //                 No Rsvp
    //         </span>
    //         </div>
    //     );
    // };

	render() {
		const { toggle, onSave, onCancel } = this.props;
		return (
			<Dialog open={toggle}>
        		<DialogTitle>Welcome Guest! Fill out the form below</DialogTitle>
        		<DialogContent dividers>
          			<DialogContentText>
					    Please enter your first name
          			</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="firstName"
						label="First name"
						type="text"
						fullWidth
						variant="standard"
						onChange={this.handleChange}
					/>
					<DialogContentText>
						Please enter your last name
          			</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="lastName"
						label="Last name"
						type="text"
						fullWidth
						variant="standard"
						onChange={this.handleChange}
					/>
        		</DialogContent>
        		<DialogActions>
					<Button onClick={() => onCancel()}>Cancel</Button>
          			<Button onClick={() => this.handleTokenVerify( () => { onSave(this.state.activeItem); })}>
						  Submit
					</Button>
        		</DialogActions>
      		</Dialog>



			// <Modal isOpen={true} toggle={toggle}>
			// 	<ModalHeader toggle={toggle}> Welcome Guest! </ModalHeader>
			// 	<ModalBody>
			// 		<Form>
			// 			<FormGroup>
			// 				<Label for="firstName">First Name</Label>
			// 				<Input
			// 					type="text"
			// 					name="firstName"
			// 					value={this.state.firstName}
			// 					onChange={this.handleFirstNameVerify}
			// 					placeholder="Please enter your first name"
			// 				/>
			// 			</FormGroup>
			// 			<FormGroup>
			// 				<Label for="lastName">Last Name</Label>
			// 				<Input
			// 					type="text"
			// 					name="lastName"
			// 					value={this.state.lastName}
			// 					onChange={this.handleLastNameVerify}
			// 					placeholder="Please enter your last name"
			// 				/>
			// 			</FormGroup>
			// 		</Form>
			// 	</ModalBody>
			// 	<ModalFooter>
			// 		<Button color="success" onClick={() => this.handleTokenVerify( () => { onSave(this.state.activeItem); })   }>
			// 			Submit
            //   		</Button>
			// 	</ModalFooter>
			// </Modal>
		);
	}
}

export default TokenModal;