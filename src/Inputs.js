import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';


export default function Inputs () {

	const { register, handleSubmit, watch } = useForm();
  	const [inputs, setInputs] = useState({});

  	const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

	const clearForm = () => {
		setInputs({});
	}

	const concat = () => {
		let output = '';
		for (const query in inputs) {

			switch (query) {
				case 'url':
					if (`${inputs[query]}`) {
						output = `${inputs[query]}` + '?';
					}	
					break;
				case 'source':
					if (`${inputs[query]}`) {
						output = output + 'utm_source=' + `${inputs[query]}` + '&';
					}
					break;
				case 'medium':
					if (`${inputs[query]}`) {
						output = output + 'utm_medium=' + `${inputs[query]}` + '&';
					}
					break;
				case 'campaign':
					if (`${inputs[query]}`) {
						output = output + 'utm_campaign=' + `${inputs[query]}` + '&';
					}
					break;
				case 'content':
					if (`${inputs[query]}`) {
						output = output + 'utm_content=' + `${inputs[query]}` + '&';
					}
					break;
				case 'term':
					if (`${inputs[query]}`) {
						output = output + 'utm_term=' + `${inputs[query]}` + '&';
					}
					break;
				default: output = '';
			}

		}
				
		output = output.slice(0, -1);

		return output;
	}

	const fullUrl = concat();

	const copyOutput = () => {
		const url = JSON.stringify(fullUrl);
		const unquotUrl = url.replace(/['"]+/g, '');
		navigator.clipboard.writeText(unquotUrl);

		alert("URL Copied to Clipboard");

	}

	return (
		<div>
			<form>
				<fieldset>
					<label>URL:</label>
					<input
			            {...register("url",  { pattern: /^[A-Za-z]+$/i })}
			            type="text"
			            value={inputs.url || ''}
			            onChange={handleChange}
			            placeholder="Enter Your URL..." />
			    </fieldset>
				<fieldset>
					<label>Source:</label>
					<input
			            {...register("source")}
			            type="text"
			            value={inputs.source || ''}
			            onChange={handleChange}
			            placeholder="Enter Your Source..." />
			    </fieldset>
			    <fieldset>
					<label>Medium:</label>
				 	<input
					 	{...register("medium")}
			            type="text"
			            value={inputs.medium || ''}
			            onChange={handleChange}
			            placeholder="Enter Your Medium..." />
			    </fieldset>
			    <fieldset>
		        	<label>Campaign Name:</label>
				 	<input
					 	{...register("campaign")}
			            type="text"
			            value={inputs.campaign || ''}
			            onChange={handleChange}
			            placeholder="Enter Your Campaign..." />
			    </fieldset>
			    <fieldset>
		        	<label>Content:</label>
				 	<input
					 	{...register("content")}
			            type="text"
			            value={inputs.content || ''}
			            onChange={handleChange}
			            placeholder="Enter Your Content..." />
			    </fieldset>
			    <fieldset>
		        	<label>Term:</label>
				 	<input
					 	{...register("term")}
			            type="text"
			            value={inputs.term || ''}
			            onChange={handleChange}
			            placeholder="Enter Your Term..." />
			    </fieldset>
			    <fieldset>
		        	<label>Your URL</label> 
				 	<input
					 	{...register("output")}
			            type="text"
			            className="output"
			            value={fullUrl}
			         />
			         <FontAwesomeIcon icon={faClipboard} size="2x" onClick={copyOutput} />
			    </fieldset>
		    </form>
			<button className="btn" onClick={clearForm}>
			Clear All
			</button>
		</div>
	)
	
}