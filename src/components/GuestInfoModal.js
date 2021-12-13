import React from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	Label
} from "reactstrap";

class GuestInfoModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem
		};
	}
	handleChange = e => {
		let { name, value } = e.target;
		if (e.target.type === "checkbox") {
			value = e.target.checked;
		}
		const activeItem = { ...this.state.activeItem, [name]: value };
		this.setState({ activeItem });
	};
	
	render() {
		const { toggle, onSave } = this.props;
		return (
			<Modal isOpen={true} toggle={toggle}>
				<ModalHeader toggle={toggle}> Guest Info </ModalHeader>
				<ModalBody>
					<Form>
					    <FormGroup check>
							<Label for="rsvp">
								<Input
									type="checkbox"
									name="rsvp"
									checked={this.state.activeItem.rsvp}
									onChange={this.handleChange}
								/>
								RSVP
							</Label>
						</FormGroup>
						<FormGroup>
							<Label for="token">Guest Token</Label>
							<Input
								type="text"
								name="token"
								value={this.state.activeItem.token}
								onChange={this.handleChange}
								placeholder="Please enter your guest token"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="firstName">First Name</Label>
							<Input
								type="text"
								name="firstName"
								value={this.state.activeItem.firstName}
								onChange={this.handleChange}
								placeholder="Please enter your first name"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="lastName">Last Name</Label>
							<Input
								type="text"
								name="lastName"
								value={this.state.activeItem.lastName}
								onChange={this.handleChange}
								placeholder="Please enter your last name"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="email">E-mail Address</Label>
							<Input
								type="text"
								name="email"
								value={this.state.activeItem.email}
								onChange={this.handleChange}
								placeholder="Please enter your e-mail address"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="phone">Phone number (i.e. 604-123-4567)</Label>
							<Input
								type="text"
								name="phone"
								value={this.state.activeItem.phone}
								onChange={this.handleChange}
								placeholder="Please enter your phone number (optional)"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="allergies">Food allergies (i.e. gluten, nuts)</Label>
							<Input
								type="text"
								name="allergies"
								value={this.state.activeItem.allergies}
								onChange={this.handleChange}
								placeholder="Please enter any allergies you have"
							/>
						</FormGroup>
						<FormGroup check>
							<Label for="vegan">
								<Input
									type="checkbox"
									name="vegan"
									checked={this.state.activeItem.vegan}
									onChange={this.handleChange}
								/>
								Vegan
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label for="vegetarian">
								<Input
									type="checkbox"
									name="vegetarian"
									checked={this.state.activeItem.vegetarian}
									onChange={this.handleChange}
								/>
								Vegetarian
							</Label>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => onSave(this.state.activeItem)}>
						Save
              		</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default GuestInfoModal;