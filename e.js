//
//	e.js
//	A simple library full of functions that I find useful
//	Also a sort-of replacement for jquery
//	(please don't use them together or bad things will happen)
//

let $ = document.querySelector.bind(document);

Object.defineProperty(HTMLElement.prototype,'click',{
	value:($callback) => {
		this.addEventListener("click", $callback);
	},
	writable:false,
	enumerable:false
});
Object.defineProperty(HTMLElement.prototype,'fadeIn',{
	value:($timeout) => {
		$timeout = $timeout || 400;
		let el = this;
		el.style.display = "inherit";
		el.style.opacity = 0;
		let last = +new Date();
		let tick = () => {
			el.style.opacity = +el.style.opacity + (new Date() - last) / $timeout;
			last = +new Date();
			if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
		};
		tick();
	},
	writable:false,
	enumerable:false
});
Object.defineProperty(HTMLElement.prototype,'fadeOut',{
	value:($timeout) => {
		$timeout = $timeout || 400;
		let el = this;
		el.style.display = "inherit";
		el.style.opacity = 1;
		let last = +new Date();
		let tick = () => {
			el.style.opacity = +el.style.opacity - (new Date() - last) / $timeout;
			last = +new Date();
			if (+el.style.opacity > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			} else {
				el.style.display = "none";
			}
		};
		tick();
	},
	writable:false,
	enumerable:false
});

Object.defineProperty(HTMLElement.prototype,'hide',{
	value:() => {
		let el = this;
		el.style.display = "none";
	},
	writable:false,
	enumerable:false
});

Object.defineProperty(HTMLElement.prototype,'show',{
	value:() => {
		let el = this;
		el.style.display = "initial";
	},
	writable:false,
	enumerable:false
});

function Get($url, $method, $callback, $json) {
	$json = $json || false;
	let xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (this.readyState==4 && this.status==200) {
			if ($json) {
				$callback(JSON.parse(this.responseText));
			} else {
				$callback(this.responseText);
			}
		}
	}
	xmlhttp.open($method, $url ,true);
	xmlhttp.send();
}
