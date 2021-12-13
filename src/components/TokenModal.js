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

class TokenModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            activeItem: this.props.activeItem,
		};
	}
	// handleChange = e => {
	// 	let { name, value } = e.target;
	// 	if (e.target.type === "checkbox") {
	// 		value = e.target.checked;
	// 	}
	// 	const activeItem = { ...this.state.activeItem, [name]: value };
	// 	this.setState({ activeItem });
	// };

    handleTokenVerify = e => {
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
				<ModalHeader toggle={toggle}> Welcome Guest! </ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="guestToken">Please enter your guest token</Label>
							<Input
								type="text"
								name="guestToken"
								value={this.state.activeItem.guestToken}
								onChange={this.handleTokenVerify}
								placeholder="Please enter your guest token"
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => onSave(this.state.activeItem)}>
						Submit
              		</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default TokenModal;