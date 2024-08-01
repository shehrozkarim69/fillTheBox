for (var i = 0; i < 16; i++) {
	let b = document.createElement("div");
	b.className = "generic_block";
	game_box.appendChild(b);
}

let pieces = document.querySelectorAll("span"),
		blocks = document.querySelectorAll(".generic_block"),
		gx = game_box.getBoundingClientRect().x,
		gy = game_box.getBoundingClientRect().y,
		inside = 0

function randomNumber() {
	return Math.random() < 0.5
		? Math.random() * 250 + "px"
	: Math.random() * -250 + "px";
}
function randomPlacement() {
	pieces.forEach(function (elm) {
		elm.parentElement.style.left = randomNumber();
		elm.parentElement.style.top = Math.random() * 250 + "px";
	});
}

randomPlacement();

function findContainment(element, container) {

	const brE = element.getBoundingClientRect()
	const brC = container.getBoundingClientRect()

	if (
		brE.left >= brC.left &&
		brE.top >= brC.top &&
		brE.bottom <= brC.bottom &&
		brE.right <= brC.right
	) {
		return "contained"
	}
}

pieces.forEach(function (elm) {
	elm.addEventListener("click", function (e) {
		if (document.querySelector(".selected")) {
			document.querySelector(".selected").classList.toggle("selected");
			elm.parentElement.classList.toggle("selected");
		} else {
			elm.parentElement.classList.toggle("selected");
		}
	});
});

blocks.forEach(function (elm) {
	elm.addEventListener("click", function (e) {
		if (document.querySelector(".selected")) {
			let s = document.querySelector(".selected"),
					bx = elm.getBoundingClientRect().left,
					by = elm.getBoundingClientRect().top;
			s.style.left = bx - gx + "px";
			s.style.top = by - gy + "px";
			s.classList.toggle("selected");
		}

		inside = 0
		pieces.forEach(function(e){
			if(findContainment(e, game_box) == 'contained') {
				inside++

				if(inside === 16) {
					game_box.classList.toggle('winner')
					setTimeout(function(){
						game_box.classList.toggle('winner')
						randomPlacement()
					}, 1250)
				}
			}
		})
	});
});

window.addEventListener('mousemove', function(e){
	if(document.querySelector(".selected")){
		let s = document.querySelector(".selected"),
			x = e.clientX,
			y = e.clientY;
	s.style.left = x + 10 - gx + "px";
	s.style.top = y + 10 - gy + "px";
	}	
})
