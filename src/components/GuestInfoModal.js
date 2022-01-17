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
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

class GuestInfoModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			firstName: '',
			lastName: '',
			firstLastName: '',
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

	handleTokenVerify = (onSaveCallback) => {
		
		this.handleCleanup();

		//Hash the first and last name
        var crypto = require('crypto')
        var shasum = crypto.createHash('sha1')
        shasum.update(this.state.firstLastName)
        var hashToken = shasum.digest('hex')

		const activeItem = { ...this.state.activeItem, 'token': hashToken };

		if (this.state.activeItem.id) {
            axios
                // Because of proxy in package.json, command be shorten as follows:
                // .put(`http://localhost:8000/api/guestlist/${this.state.activeItem.id}/`, this.state.activeItem)
                .put(`/api/guestlist/${hashToken}/`, this.state.activeItem)
                .then(res => this.setState({ activeItem: activeItem }, () => {
					console.log('LLLLLLLLLLLLLLL: ', this.state.activeItem);
					onSaveCallback();
				}))
				.catch(err => console.log(err));

				// TODO error handling

            return;
        }
        axios
            // Because of proxy in package.json, command be shorten as follows:
            // .post("http://localhost:8000/api/guestlist/", this.state.activeItem)
            .post("/api/guestlist/", this.state.activeItem)
            .then(res => this.setState({ activeItem: activeItem }, () => {
				console.log('RRRRRRRRRRRRRR: ', this.state.activeItem);
				onSaveCallback();
			}))
			.catch(err => console.log(err));

			// TODO error handling
	};
	
	render() {
		const { toggle, onSave, onCancel } = this.props;
		return (
			<Dialog open={toggle}>
				<DialogTitle>Guest Info</DialogTitle>
				<DialogContent dividers>
					<FormLabel component="legend">RSVP</FormLabel>
					<RadioGroup row name="rsvp" value={this.state.activeItem.rsvp}>
						<FormControlLabel value={true} control={<Radio />} label="Yes" onChange={this.handleChange}/>
						<FormControlLabel value={false} control={<Radio />} label="No" onChange={this.handleChange}/>
					</RadioGroup>
					<TextField
						autoFocus
						margin="dense"
						id="token"
						label="Guest Token"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.activeItem.token}
						onChange={this.handleChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="firstName"
						label="First Name"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.activeItem.firstName}
						onChange={this.handleChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="lastName"
						label="Last Name"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.activeItem.lastName}
						onChange={this.handleChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="E-mail address"
						type="text"
						fullWidth
						variant="standard"
						value={this.state.activeItem.email}
						onChange={this.handleChange}
					/>
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
          			<Button onClick={() => this.handleTokenVerify( () => { onSave(this.state.activeItem); })}>
						  Submit
					</Button>
        		</DialogActions>
			</Dialog>
		);
	}
}

export default GuestInfoModal;