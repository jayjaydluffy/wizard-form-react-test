import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import Col from 'react-bootstrap/lib/Col';
import { DebounceInput } from 'react-debounce-input';

const input = ( props ) => {
	let inputElement = null;
	let isInvalid = null;

	if (props.invalid && props.shouldValidate && props.touched) {
		isInvalid = true;
	}

	switch ( props.elementType ) {
		case 'input':
			inputElement = (
					<DebounceInput element={Form.Control}
						debounceTimeout={500}
						{...props.elementConfig}
						isInvalid={isInvalid}
						value={props.value}
						onChange={props.changed}
						size="lg" />
			);
			break;
		case 'textarea':
			inputElement = (
				<DebounceInput element={Form.Control}
					debounceTimeout={500}
					rows="3"
					{...props.elementConfig}
					as="textarea"
					value={props.value}
					onChange={props.changed}
					size="lg" />
			);
			break;
		case 'select':
			inputElement = (
				<DebounceInput element={Form.Control}
					debounceTimeout={500}
					as="select"
					value={props.value}
					onChange={props.changed}
					size="lg">
					{ props.elementConfig.options.map(opt => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					)) }
				</DebounceInput>
			);
			break;
		default:
			inputElement = (
					<DebounceInput element={Form.Control}
						debounceTimeout={500}
						{...props.elementConfig}
						isInvalid={isInvalid}
						value={props.value}
						onChange={props.changed}
						size="lg" />
			);
	}

	return (
		<Form.Group
			controlId={props.elementId}
			as={props.formRow ? Col : 'div'} >
			<Form.Label className={props.elementLabel4 ? "d-flex" : ''}>
				{ props.elementLabel }
			</Form.Label>
			{inputElement}
		</Form.Group>
	);
};

export default input;