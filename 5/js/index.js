var script = document.createElement('SCRIPT'); 
	script.src = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108&callback=callbackFunc"; 
	document.getElementsByTagName("head")[0].appendChild(script);
var result2 = {};
var id = 0;
var width = 150;
var count2 = 4;
var position = 0;

function callbackFunc(result){
    result2 = result;
      let load = document.getElementById('loading');
	  load.style = 'display: none';
	for (let i = 0; i < result.response.count; i++){
		let div = document.createElement('div');
		div.id = i; 
		div.className = 'photo_box';
		document.getElementById('all_photos').appendChild(div); 
		div.onclick = function () {
			let img2 = document.createElement('img');
			img2.src = result.response.items[this.id].sizes[7].url;
			img2.id = this.id;
			id = +this.id;
            let el = document.getElementById("overlay");
			el.style.visibility = (el.style.visibility === "visible") ? "hidden" : "visible";
			document.getElementById("main_photo").appendChild(img2);
            let count = document.getElementById("count");
            count.innerText = +id + 1 + ' из ' + result.response.count;

            for (let i = 0; i < result.response.count; i++) {

                let img_carousel = document.createElement('img');
                let li_carousel = document.createElement('li');
                let carousel = document.getElementById('all_images');
                img_carousel.src = result.response.items[i].sizes[0].url;
                img_carousel.id = i + 1;
				img_carousel.onclick = function (){
						let myNode = document.getElementById("main_photo");
						let fc = myNode.firstChild;
						while( fc ) {
							myNode.removeChild( fc );
							fc = myNode.firstChild;
						}
						let img2 = document.createElement('img');
						img2.src = result2.response.items[this.id - 1].sizes[7].url;
						img2.id = this.id;
						document.getElementById("main_photo").appendChild(img2);
						let count = document.getElementById("count");
						count.innerText = +this.id + ' из ' + result2.response.count;
										
				};
                carousel.appendChild(li_carousel);
                li_carousel.appendChild(img_carousel);
            }

    };
	
		let img = document.createElement('img');
		img.src = result.response.items[i].sizes[6].url; 
		img.width = '320'; 
		document.getElementById(i).appendChild(img);
}
}

function closeBox(){
    let el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility === "visible") ? "hidden" : "visible";
			
	let myNode = document.getElementById("main_photo");
	let fc = myNode.firstChild;
	while( fc ) {
		myNode.removeChild( fc );
		fc = myNode.firstChild;
	}
    id = 0;
}

function rightArrow(){
    if (id + 1 < result2.response.count) {
        id += 1
    } else {
    	id = 0;
    }
    let myNode = document.getElementById("main_photo");
    let fc = myNode.firstChild;
    while( fc ) {
        myNode.removeChild( fc );
        fc = myNode.firstChild;
    }
    let img2 = document.createElement('img');
    img2.src = result2.response.items[id].sizes[7].url;
    img2.id = id;
    document.getElementById("main_photo").appendChild(img2);
    let count = document.getElementById("count");
    count.innerText = +id + 1 + ' из ' + result2.response.count;
}


function leftArrow(){
	if (id - 1 >= 0) {
        id -= 1
    } else {
		id = +result2.response.count - 1;
	}
        let myNode = document.getElementById("main_photo");
        let fc = myNode.firstChild;
        while (fc) {
            myNode.removeChild(fc);
            fc = myNode.firstChild;
        }
        let img2 = document.createElement('img');
        img2.src = result2.response.items[id].sizes[7].url;
        img2.id = id;
        document.getElementById("main_photo").appendChild(img2);
        let count = document.getElementById("count");
    	count.innerText = +id + 1 + ' из ' + result2.response.count;
}

function prev() {
    let carouse2 = document.getElementById('carousel');
    let list = carouse2.querySelector('ul');
        position = Math.min(position + width * count2, 0);
        list.style.marginLeft = position + 'px';
}

function next() {
    let carouse2 = document.getElementById('carousel');
    let list = carouse2.querySelector('ul');
    let listElem = carouse2.querySelectorAll('li');

    position = Math.max(position - width * count2, -width * (listElem.length - count2));
    list.style.marginLeft = position + 'px';
}