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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

class TokenModal extends React.Component {

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
				plusone: "",
                allergies: "",
                rsvp: false,
                vegan: false,
                vegetarian: false,
				newGuest: true,
				hasResponded: false,
                url: "",
            },
			firstName: '',
			lastName: '',
			firstLastName: '',
			guestToken: this.props.activeItem,
			isError: false,
			errorMessage: '',
			isFirstNameError: false,
			isLastNameError: false,
		};
	}

    handleChange = e => {
    	let { id, value } = e.target;
		if (e.target.type === "checkbox") {
			value = e.target.checked;
		}
        
		const activeItem = { ...this.state.activeItem, [id]: value };

		// async callback otherwise handleCleanup executes before setstate finishes
        this.setState({ [id]: value, activeItem}, () => {
			this.handleCleanup();
		});
	};

	handleCleanup = () => {
		var tempValue = this.state.firstName.replace(/\s+/g, ''); //remove white spaces
        const firstName = tempValue.toLowerCase();

		tempValue = this.state.lastName.replace(/\s+/g, ''); //remove white spaces
        const lastName = tempValue.toLowerCase();

		tempValue = firstName + lastName;

        this.setState({ firstLastName: tempValue });
	};

	handleTextFieldVerify = () => {

		var status = false;

		// Verify first name
		var tempValue = this.state.firstName.replace(/\s+/g, '')  //remove white spaces
		if (tempValue === '') {
			this.setState({ isFirstNameError: true });
			status = true;
		}
		else {
			this.setState({ isFirstNameError: false });
		}
		
		// Verify last name
		tempValue = this.state.lastName.replace(/\s+/g, '')  //remove white spaces
		if (tempValue === '') {
			this.setState({ isLastNameError: true });
			status = true;
		}
		else {
			this.setState({ isLastNameError: false });
		}
		return status;
	};

	handleTokenVerify = (onSaveCallback) => {
		
		var status = this.handleTextFieldVerify();
		if (status) {
			return status;
		}
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
            .then(res => this.setState({ activeItem: res.data, errorMessage: '', isError: false }, () => {
                console.log('LLLLLLLLLLLLLLL: ', this.state.activeItem);
				onSaveCallback();
            }))
            .catch(err => this.setState({ errorMessage: err.toJSON().message, isError: true }, () => {
                console.log(err.toJSON());
            }))
	};

	renderFirstName = () => {
		if (this.state.isFirstNameError) {
			return (
				<TextField
					error
					autoFocus
					margin="dense"
					id="firstName"
					label="First name"
					type="text"
					fullWidth
					variant="standard"
					helperText="Incorrect entry. Cannot be empty"
					value={this.state.firstName}
					onChange={this.handleChange}
				/>
			);
		}
		else {
			return (
				<TextField
					autoFocus
					margin="dense"
					id="firstName"
					label="First name"
					type="text"
					fullWidth
					variant="standard"
					value={this.state.firstName}
					onChange={this.handleChange}
				/>
			);
		}
		
	};

	renderLastName = () => {
		if (this.state.isLastNameError) {
			return (
				<TextField
					error
					autoFocus
					margin="dense"
					id="lastName"
					label="Last name"
					type="text"
					fullWidth
					variant="standard"
					helperText="Incorrect entry. Cannot be empty"
					value={this.state.lastName}
					onChange={this.handleChange}
				/>
			);
		}
		else {
			return (
				<TextField
					autoFocus
					margin="dense"
					id="lastName"
					label="Last name"
					type="text"
					fullWidth
					variant="standard"
					value={this.state.lastName}
					onChange={this.handleChange}
				/>
			);
		}
		
	};

	renderOkay = () => {
		const { toggle, onSave, onCancel } = this.props;
        return (
			<Dialog open={toggle}>
				<DialogTitle>Welcome Guest! Please fill out the form below.</DialogTitle>
				<DialogContent dividers>
					{this.renderFirstName()}
					{this.renderLastName()}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => onCancel()}>Cancel</Button>
					<Button variant="contained" onClick={() => this.handleTokenVerify( () => { onSave(this.state.activeItem); })}>
							Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	renderError = () => {
		const { toggle, onSave, onCancel } = this.props;
        return (
			<Dialog open={toggle}>
				<DialogTitle>:( Oops! There was an Error. Code: {this.state.errorMessage.slice(-3)}</DialogTitle>
				<DialogContent dividers>
					<Box sx={{ m: 2 }}>
						<DialogContentText sx={{ color: 'red' }}>
							We're sorry, we could not find your information for guest: {this.state.firstName} {this.state.lastName}.
						</DialogContentText>
					</Box>
					<Divider variant="middle" />
					<Box sx={{ m: 2 }}>
						<DialogContentText sx={{ color: 'black' }}>
							Please retry or click next to register as a new guest.
						</DialogContentText>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => onCancel()}>Cancel</Button>
					<Button variant="outlined" onClick={() => { this.setState({ isError: false }); }}>Retry</Button>
					<Button variant="contained" onClick={() => onSave(this.state.activeItem)}>
							Next
					</Button>
				</DialogActions>
			</Dialog>
		);
    };

	render() {
		if (this.state.isError) {
			return (
				<div>
					{this.renderError()}
				</div>
			);
		}
		else {
			return (
				<div>
					{this.renderOkay()}
				</div>
			);
		}


			// <Dialog open={toggle}>
        	// 	<DialogTitle>Welcome Guest! Fill out the form below</DialogTitle>
        	// 	<DialogContent dividers>
          	// 		<DialogContentText>
			// 		    Please enter your first name
          	// 		</DialogContentText>
			// 		<TextField
			// 			autoFocus
			// 			margin="dense"
			// 			id="firstName"
			// 			label="First name"
			// 			type="text"
			// 			fullWidth
			// 			variant="standard"
			// 			onChange={this.handleChange}
			// 		/>
			// 		<DialogContentText>
			// 			Please enter your last name
          	// 		</DialogContentText>
			// 		<TextField
			// 			autoFocus
			// 			margin="dense"
			// 			id="lastName"
			// 			label="Last name"
			// 			type="text"
			// 			fullWidth
			// 			variant="standard"
			// 			onChange={this.handleChange}
			// 		/>
        	// 	</DialogContent>
        	// 	<DialogActions>
			// 		<Button onClick={() => onCancel()}>Cancel</Button>
          	// 		<Button onClick={() => this.handleTokenVerify( () => { onSave(this.state.activeItem); })}>
			// 			  Submit
			// 		</Button>
        	// 	</DialogActions>
      		// </Dialog>



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
	}
}

export default TokenModal;