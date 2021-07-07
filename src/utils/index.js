import router from "../router/index";


export function routerPush(path) {
	router.push(path);
}

export function routerReplace(path) {
	router.replace(path);
}

let wait = 60;
export function sendCode(element, txt, active, color) { //elementId
	try {
		if (wait == 0) {
			document.getElementById(element).removeAttribute("disabled",true);
			document.getElementById(element).value = txt;
			document.getElementById(element).innerHTML = txt;
			document.getElementById(element).style.color = active;
			wait = 60;
		} else {
			document.getElementById(element).setAttribute("disabled", true);
			document.getElementById(element).value = wait + "s" + "重新发送";
			document.getElementById(element).innerHTML = wait + " s" + "重新发送";
			document.getElementById(element).style.color = color;
			wait--;
			setTimeout(function () {
				sendCode(element, txt, active, color);
			}, 1000);
		}
	} catch (error) {
		wait = 60;
	}
}