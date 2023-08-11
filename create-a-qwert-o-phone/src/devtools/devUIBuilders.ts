import { DownloadQOPUDJSON, ImportQOPUDJSON } from "../UserDataMode/importExportUD";

export function BindUploaderToImportFunction(QOPUserData) {
	const fileInput = document.getElementById('jsonUploader');

	if (fileInput) {
		fileInput.addEventListener('change', () => ImportQOPUDJSON(QOPUserData));
	}
}
export function CreateJSONUploadButton(QOPUserData) {
	const uploader = document.createElement('input');
	uploader.setAttribute('type', 'file');
	uploader.setAttribute('id', 'jsonUploader');
	uploader.style.position = 'absolute';
	uploader.style.top = '0';
	uploader.style.left = '0';
	uploader.style.zIndex = '1000'; // To ensure it's above most other elements

	document.body.appendChild(uploader);

	BindUploaderToImportFunction(QOPUserData);
}

export function CreateDownloadButton(QOPUserData) {
	const button = document.createElement('button');
	button.innerText = 'Download JSON';
	button.style.position = 'absolute';
	button.style.top = '40px'; // position it a bit below the upload button
	button.style.left = '0';
	button.style.zIndex = '1000'; // ensure it's above most other elements

	// Bind the button to the DownloadQOPUDJSON function
	button.addEventListener('click', () => DownloadQOPUDJSON(QOPUserData));

	document.body.appendChild(button);
}