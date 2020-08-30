import {
	performAction
}
from './js/app';
import {
	removeTrip
}
from './js/app';
import {
	countdown
}
from './js/app';
export {
	performAction,
	removeTrip,
	countdown
}
import './styles/style.scss'
console.log(performAction);
console.log("CHANGE!");
document.getElementById("generate").addEventListener("click", performAction);
document.getElementById("remove").addEventListener("click", removeTrip);
