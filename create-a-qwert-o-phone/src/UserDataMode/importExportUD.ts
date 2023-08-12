import { QOPUserDataTemplate, QOPUDTimestamp } from './initQOPUD.js';
import { DeprecatedCheck } from './validateQOPUD.js';

export function DownloadQOPUDJSON(obj: QOPUserDataTemplate) {
	const formattedDateTime = QOPUDTimestamp();
	if (obj.Timestamp !== undefined) {
		obj.Timestamp = formattedDateTime;
	}
	const jsonString = JSON.stringify(obj, null, 2); 					// Convert object to JSON string
	const blob = new Blob([jsonString], { type: 'application/json' });	// Create a Blob out of the string
	const downloadLink = document.createElement('a');					// Create a download link for the blob
	downloadLink.href = URL.createObjectURL(blob); 						// Use the Object URL as the href for the download link
	downloadLink.download = `QOPUserData${formattedDateTime}.json`;		// Set the download attribute of the link to give the desired name to the file
	document.body.appendChild(downloadLink);							// Append the link to the body
	downloadLink.click();												// Programmatically trigger a click on the link to start the download
	document.body.removeChild(downloadLink);							// Remove the link after triggering the download
}

export function ImportQOPUDJSON(QOPUserData: QOPUserDataTemplate) {
	const fileInput = document.getElementById('jsonUploader') as HTMLInputElement;

	if (fileInput.files && fileInput.files.length > 0) {
		const file = fileInput.files[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			try {
				const content = event.target?.result as string;
				const parsedJSON = JSON.parse(content);
				if (DeprecatedCheck(parsedJSON) !== undefined) {
					if (DeprecatedCheck(parsedJSON) === false) {
						Object.assign(QOPUserData, parsedJSON);
					}
				}
			} catch (error) {
				console.error('Error parsing JSON', error);
			}
		};

		reader.readAsText(file);
	} else {
		console.error('No file selected');
	}
}

