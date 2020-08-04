export const convertImageToBase64 = (file: Blob): Promise<string> => {
	var reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onerror = () => {
			reader.abort();
			reject(new DOMException('Problem parsing input file.'));
		};

		reader.onload = function (event) {
			if (event.target !== null) {
				resolve(event.target.result as string);
			}
		};
		reader.readAsDataURL(file);
	});
};
