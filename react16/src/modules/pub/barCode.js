export default function(no) {
	if (JsBarcode) {
		JsBarcode && JsBarcode("#barcode", no, {
			//format: "pharmacode",
			lineColor: "black",
			width: 2,
			height: 50,
			displayValue: false
		});
	} else {
		setTimeout(() => {
			JsBarcode && JsBarcode("#barcode", no, {
				//format: "pharmacode",
				lineColor: "black",
				width: 2,
				height: 50,
				displayValue: false
			});
		}, 3000)
	}
}