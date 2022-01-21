import React, { useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { addEmployee } from "./EmployeeManager"
import { getLocations } from "../location/LocationManager"
import { getAnimals } from "../animal/AnimalManager"
import "./Employees.css"

export const EmployeeForm = () => {
	const [locations, setLocations] = useState([])

	const [animals, setAnimals] = useState([])
	const [employee, setEmployee] = useState({})
	const history = useHistory()

	/*
        Get animal state and location state on initialization.
    */
	useEffect(() => {
		getAnimals().then((animalsData) => setAnimals(animalsData))
		getLocations().then((locationsData) => setLocations(locationsData))
	}, [])

	const handleControlledInputChange = (event) => {
		const newEmployee = Object.assign({}, employee)
		newEmployee[event.target.name] = event.target.value
		setEmployee(newEmployee)
	}

	const constructNewEmployee = () => {
		const locationId = parseInt(employee.locationId)

		if (locationId === 0) {
			window.alert("Please select a location")
		} else {
			addEmployee({
				name: employee.name,
				address: employee.address,
				location_id: locationId,
			}).then(() => history.push("/employees"))
		}
	}

	return (
		<form className='employeeForm'>
			<h2 className='employeeForm__title'>New Employee</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='name'>Employee name: </label>
					<input
						type='text'
						name='name'
						required
						autoFocus
						className='form-control'
						placeholder='Employee name'
						defaultValue={employee.name}
						onChange={handleControlledInputChange}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='address'>Address: </label>
					<input
						type='text'
						name='address'
						required
						className='form-control'
						placeholder='Employee address'
						defaultValue={employee.address}
						onChange={handleControlledInputChange}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='location'>Assign to location: </label>
					<select
						name='locationId'
						className='form-control'
						value={employee.locationId}
						onChange={handleControlledInputChange}>
						<option value='0'>Select a location</option>
						{locations.map((e) => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>

			<button
				type='submit'
				onClick={(evt) => {
					evt.preventDefault() // Prevent browser from submitting the form
					constructNewEmployee()
				}}
				className='btn btn-primary'>
				Save Employee
			</button>
		</form>
	)
}
