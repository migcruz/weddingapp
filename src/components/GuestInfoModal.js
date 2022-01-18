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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

class GuestInfoModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			firstLastName: '',
			isError: false,
			isSuccess: false,
			errorMessage: '',
			isFirstNameError: false,
			isLastNameError: false,
			isEmailError: false,
		};
	}
	handleChange = e => {
		let { id, value, name, checked } = e.target;
		if (e.target.type === "radio") {
			switch (value) {

				// 'value' boolean gets converted to string when passed as a prop to a function, so we need to use a switch or if else statement to switch back to boolean
				case "true":
					value = true;
				  	break;
				case "false":
					value = false;
				  	break;
				default:
					value = false;
				  	break;
			}
			  
			id = name;
		}
		
		const activeItem = { ...this.state.activeItem, [id]: value };

		// async callback otherwise handleCleanup executes before setstate finishes
        this.setState({ activeItem }, () => {
			this.handleCleanup();
		});
	};

	handleCleanup = () => {
		var tempValue = this.state.activeItem.firstName.replace(/\s+/g, ''); //remove white spaces
        const firstName = tempValue.toLowerCase();

		var tempValue = this.state.activeItem.lastName.replace(/\s+/g, ''); //remove white spaces
        const lastName = tempValue.toLowerCase();

		var tempValue = firstName + lastName;

        this.setState({ firstLastName: tempValue });
		
	};

	handlePut = () => {
		axios
			// Because of proxy in package.json, command be shorten as follows:
			// .put(`http://localhost:8000/api/guestlist/${this.state.activeItem.id}/`, this.state.activeItem)
			.put(`/api/guestlist/${this.state.activeItem.token}/`, this.state.activeItem)
			.then(res => this.setState({ errorMessage: '', isError: false, isSuccess: true }, () => {
				console.log('PUT SUCCESS: ', this.state.activeItem);
			}))
			.catch(err => this.setState({ errorMessage: err.toJSON().message, isError: true, isSuccess: false }, () => {
                console.log(this.state.errorMessage);
            }))

			// TODO error handling
	};

	handlePost = () => {
		axios
            // Because of proxy in package.json, command be shorten as follows:
            // .post("http://localhost:8000/api/guestlist/", this.state.activeItem)
            .post("/api/guestlist/", this.state.activeItem)
            .then(res => this.setState({ errorMessage: '', isError: false, isSuccess: true }, () => {
				console.log('POST SUCCESS: ', this.state.activeItem);
			}))
			
			.catch(err => this.setState({ errorMessage: err.toJSON().message, isError: true, isSuccess: false }, () => {
                console.log(this.state.errorMessage);
            }))
	};

	handleTextFieldVerify = () => {

		var status = false;

		// Verify first name
		var tempValue = this.state.activeItem.firstName.replace(/\s+/g, '')  //remove white spaces
		if (tempValue== '') {
			this.setState({ isFirstNameError: true });
			status = true;
		}
		else {
			this.setState({ isFirstNameError: false });
		}
		
		// Verify last name
		var tempValue = this.state.activeItem.lastName.replace(/\s+/g, '')  //remove white spaces
		if (tempValue== '') {
			this.setState({ isLastNameError: true });
			status = true;
		}
		else {
			this.setState({ isLastNameError: false });
		}

		// Verify email
		var tempValue = this.state.activeItem.email.replace(/\s+/g, '')  //remove white spaces
		if (tempValue== '') {
			this.setState({ isEmailError: true });
			status = true;
		}
		else {
			this.setState({ isEmailError: false });
		}
		return status;
	};

	handleTokenVerify = () => {
		
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

		const activeItem = { ...this.state.activeItem, 'token': hashToken };

		axios
            // .get("http://localhost:8000/api/guestlist/ABCD4/")
            // Because of proxy in package.json, command be shorten as follows:
            .get(`/api/guestlist/${hashToken}/`)
            .then(res => this.setState({ activeItem: activeItem, errorMessage: '', isError: false }, () => {
				this.handlePut();
            }))
            .catch(err => this.setState({ activeItem: activeItem, errorMessage: err.toJSON().message, isError: true }, () => {
                console.log(this.state.errorMessage);

				// User not found in db, so post a new entry
				this.handlePost();
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
					label="*First Name"
					type="text"
					fullWidth
					variant="standard"
					helperText="Incorrect entry. Cannot be empty"
					value={this.state.activeItem.firstName}
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
					label="*First Name"
					type="text"
					fullWidth
					variant="standard"
					value={this.state.activeItem.firstName}
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
					label="*Last Name"
					type="text"
					fullWidth
					variant="standard"
					helperText="Incorrect entry. Cannot be empty"
					value={this.state.activeItem.lastName}
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
					label="*Last Name"
					type="text"
					fullWidth
					variant="standard"
					value={this.state.activeItem.lastName}
					onChange={this.handleChange}
				/>
			);
		}
		
	};

	renderEmail = () => {
		if (this.state.isEmailError) {
			return (
				<TextField
					error
					autoFocus
					margin="dense"
					id="email"
					label="*E-mail address"
					type="text"
					fullWidth
					variant="standard"
					helperText="Incorrect entry. Cannot be empty"
					value={this.state.activeItem.email}
					onChange={this.handleChange}
				/>
			);
		}
		else {
			return (
				<TextField
					autoFocus
					margin="dense"
					id="email"
					label="*E-mail address"
					type="text"
					fullWidth
					variant="standard"
					value={this.state.activeItem.email}
					onChange={this.handleChange}
				/>
			);
		}
		
	};

	renderOkay = () => {
		const { toggle, onSave, onCancel } = this.props;
		return (
			<Dialog open={toggle}>
				<DialogTitle>Welcome {this.state.activeItem.firstName}! Please edit and submit your information.</DialogTitle>
				<DialogContent dividers>
					<FormLabel component="legend">RSVP</FormLabel>
					<RadioGroup row name="rsvp" value={this.state.activeItem.rsvp}>
						<FormControlLabel value={true} control={<Radio />} label="Yes" onChange={this.handleChange}/>
						<FormControlLabel value={false} control={<Radio />} label="No" onChange={this.handleChange}/>
					</RadioGroup>
					{this.renderFirstName()}
					{this.renderLastName()}
					{this.renderEmail()}
					<TextField
						autoFocus
						margin="dense"
						id="phone"
						label="Phone number"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.activeItem.phone}
						onChange={this.handleChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="allergies"
						label="Allergies"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.activeItem.allergies}
						onChange={this.handleChange}
					/>
					<Box sx={{ m: 3 }}></Box>
					<FormLabel component="legend">Vegan</FormLabel>
					<RadioGroup row name="vegan" value={this.state.activeItem.vegan}>
						<FormControlLabel value={true} control={<Radio />} label="Yes" onChange={this.handleChange}/>
						<FormControlLabel value={false} control={<Radio />} label="No" onChange={this.handleChange}/>
					</RadioGroup>
					<FormLabel component="legend">Vegetarian</FormLabel>
					<RadioGroup row name="vegetarian" value={this.state.activeItem.vegetarian}>
						<FormControlLabel value={true} control={<Radio />} label="Yes" onChange={this.handleChange}/>
						<FormControlLabel value={false} control={<Radio />} label="No" onChange={this.handleChange}/>
					</RadioGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onCancel()}>Cancel</Button>
          			<Button onClick={() => this.handleTokenVerify()}>
						  Submit
					</Button>
        		</DialogActions>
			</Dialog>
		);
	};

	renderError = () => {
		const { toggle, onCancel } = this.props;
        return (
			<Dialog open={toggle}>
				<DialogTitle>Oops! There was an Error :(</DialogTitle>
				<DialogContent dividers>
					<Box sx={{ m: 2 }}>
						<DialogContentText sx={{ color: 'red' }}>
							Error: {this.state.errorMessage}
						</DialogContentText>
					</Box>
					<Divider variant="middle" />
					<Box sx={{ m: 2 }}>
						<DialogContentText sx={{ color: 'black' }}>
							We're sorry, we could not submit your information for guest: {this.state.activeItem.firstName} {this.state.activeItem.lastName}. Please contact miguel.jessica.shared@gmail.com for assistance.
						</DialogContentText>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onCancel()}>Cancel</Button>
				</DialogActions>
			</Dialog>
		);
    };

	renderSuccess = () => {
		const { toggle, onSave } = this.props;
        return (
			<Dialog open={toggle}>
				<DialogTitle>Thank you! Your information has been submitted.</DialogTitle>
				<DialogContent dividers>
					<Box sx={{ m: 2 }}>
						<DialogContentText sx={{ color: 'green' }}>
							Success! Submitted information for guest: {this.state.activeItem.firstName} {this.state.activeItem.lastName}
						</DialogContentText>
					</Box>
					<Divider variant="middle" />
					<Box sx={{ m: 2 }}>
						<DialogContentText sx={{ color: 'black' }}>
							We look forward to seeing you soon {this.state.activeItem.firstName}! Please contact miguel.jessica.shared@gmail.com if you require any assistance.
						</DialogContentText>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onSave(this.state.activeItem)}>
							Done
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
			if (this.state.isSuccess) {
				return (
					<div>
						{this.renderSuccess()}
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
		}
	}
}

export default GuestInfoModal;