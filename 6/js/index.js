var ind = 0;
var ind2 = 0;
if (localStorage.getItem("lastDiv") === null){
	localStorage.setItem("lastDiv", '0');
}
var lastDiv = localStorage.getItem("lastDiv");
var count = document.getElementById('fav_title');
count.innerText = 'Избранное (' + lastDiv + ')';

var list = [];
if (localStorage.getItem("fav_content") !== null){
    list = JSON.parse(localStorage.getItem("fav_content"));
}

let input = document.getElementById('search_input');
let add = document.getElementById('search_btn');
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if(event.keyCode === 13){
        add.click();
    }
});

function searchHouse() {
    if (document.getElementById('search_input').value === '') {
        alert('Введите город');
    } else {
        let myNode = document.getElementById("all");
        let fc = myNode.firstChild;

        while (fc) {
            myNode.removeChild(fc);
            fc = myNode.firstChild;
        }

        let load = document.getElementById('loading');
        load.style.display = 'flex';

        let e = document.getElementById("country");
        let place_name = document.getElementById("search_input").value;
        let strUser = e.options[e.selectedIndex].value;
        let type = document.querySelector('input[name="buy"]:checked').value;
        let pr_min = document.getElementById("price_min").value;
        let pr_max = document.getElementById("price_max").value;
        let room_min = document.getElementById("room_min").value;
        let room_max = document.getElementById("room_max").value;
        let bath_min = document.getElementById("bath_min").value;
        let bath_max = document.getElementById("bath_max").value;
        let country = "";
        switch (strUser) {
            case '1':
                country = 'com.au';
                break;
            case '2':
                country = 'com.br';
                break;
            case '3':
                country = 'de';
                break;
            case '4':
                country = 'es';
                break;
            case '5':
                country = 'fr';
                break;
            case '6':
                country = 'in';
                break;
            case '7':
                country = 'it';
                break;
            case '8':
                country = 'mx';
                break;
            case '9':
                country = 'co.uk';
                break;
        }
        const script = document.createElement('SCRIPT');
        script.src = 'https://api.nestoria.' + country + '/api?encoding=json&pretty=1&action=search_listings&bathroom_max=' + bath_max + '&bathroom_min=' + bath_min + '&room_min=' + room_min + '&room_max=' + room_max + '&price_min=' + pr_min + '&price_max=' + pr_max + '&listing_type=' + type + '&place_name=' + place_name + '&callback=callbackFunc';
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

function callbackFunc(result) {
    console.log(result);
    let load = document.getElementById('loading');
    load.style.display = 'none';
    if (result.response.application_response_code === '101' && result.response.listings.length !== 0) {
        for (let i = 0; i < result.response.listings.length; i++) {
            let div = document.createElement('div');
            div.id = 'box' + i;
            div.className = 'result_box';
            document.getElementById('all').appendChild(div);

            let img = document.createElement('img');
            img.src = result.response.listings[i].img_url;
            img.height = '250';
            document.getElementById('box' + i).appendChild(img);

            let right = document.createElement('div');
            right.className = 'search_right';
            document.getElementById('box' + i).appendChild(right);

            let title = document.createElement('div');
            title.className = 'box_title';

            let text = document.createElement('div');
            text.innerText = result.response.listings[i].title;
            text.className = 'title_text';
            title.appendChild(text);

            let date = document.createElement('div');
            date.innerText = result.response.listings[i].updated_in_days_formatted;
            date.className = 'title_date';
            title.appendChild(date);
            right.appendChild(title);

            let summary = document.createElement('div');
            summary.innerText = result.response.listings[i].summary;
            summary.className = 'summary';
            right.appendChild(summary);

            let menu = document.createElement('div');
            menu.className = 'price_menu';

            let price = document.createElement('div');
            if(result.response.listings[i].price_formatted === undefined) {
                price.innerText = 'Нет цены'
            } else {
                price.innerText = result.response.listings[i].price_formatted;
            }
            price.className = 'price';
            menu.appendChild(price);

            let info_right = document.createElement('div');
            info_right.className = 'info_right';
            menu.appendChild(info_right);
            let info_btn = document.createElement('div');
            info_btn.className = 'info_btn';
            info_btn.innerText = 'Подробнее';
            info_btn.id = i;
            info_btn.onclick = function (){
                let myNode = document.getElementById("box_content");
                let fc = myNode.firstChild;

                while( fc ) {
                    myNode.removeChild( fc );
                    fc = myNode.firstChild;
                }

                let modal = document.getElementById('openModal');
                myNode.style = 'overflow-y: scroll';
                modal.style.display = 'block';
                document.getElementById('box_title').innerText = result.response.listings[this.id].title;
                let img = document.createElement('img');
                img.src = result.response.listings[this.id].img_url;
                img.height = '200';
                let info = document.createElement('div');
                info.className = 'modal_info';
                let l0 = document.createElement('div');
                l0.innerText = result.response.listings[this.id].summary;
                l0.className = 'box_info_title';
                info.appendChild(l0);
                let l_main = document.createElement('div');
                info.appendChild(l_main);
                let l1 = document.createElement('li');
                if (result.response.listings[this.id].bathroom_number !== '') {
                    l1.innerText = 'Кол-во душевых: ' + result.response.listings[this.id].bathroom_number;
                    l_main.appendChild(l1);
                }
                let l2 = document.createElement('li');
                if (result.response.listings[this.id].bedroom_number !== '') {
                    l2.innerText = 'Кол-во комнат: ' + result.response.listings[this.id].bedroom_number;
                    l_main.appendChild(l2);
                }
                let type = document.createElement('li');
                if (result.response.listings[this.id].property_type !== undefined) {
                    type.innerText = 'Тип: ' + result.response.listings[this.id].property_type;
                    l_main.appendChild(type);
                }
                let price2 = document.createElement('div');
                if(result.response.listings[this.id].price_formatted === undefined) {
                    price2.innerText = 'Нет цены'
                } else {
                    price2.innerText = result.response.listings[this.id].price_formatted;
                }
                price2.className = 'price';
                let price = document.createElement('div');
                price.className = 'price_menu';
                price.appendChild(price2);
                let fav_btn_red = document.createElement('div');
                fav_btn_red.className = 'info_btn';
                fav_btn_red.innerText = 'Перейти';
                fav_btn_red.style.width = '85px';
                fav_btn_red.id = this.id;
                fav_btn_red.onclick = function (){
                    location.href = result.response.listings[this.id].lister_url;
                };
                price.appendChild(fav_btn_red);
                info.appendChild(price);
                let map = document.createElement('div');
                map.id = 'map';
                let box_main = document.createElement('div');
                box_main.className = 'box_main';
                box_main.appendChild(img);
                box_main.appendChild(info);
                document.getElementById('box_content').appendChild(box_main);
                document.getElementById('box_content').appendChild(map);
                let latit = result.response.listings[this.id].latitude;
                let long = result.response.listings[this.id].longitude;
                let title = result.response.listings[this.id].title;

                ymaps.ready(init);

                function init() {
                    var myMap = new ymaps.Map("map", {
                            center: [latit, long],
                            zoom: 10
                        }, {
                            searchControlProvider: 'yandex#search'
                        }),

                        myGeoObject = new ymaps.GeoObject({
                            geometry: {
                                type: "Point",
                                coordinates: [latit, long]
                            },
                            properties: {
                                iconContent: title,
                            }
                        }, {
                            preset: 'islands#blackStretchyIcon',
                            draggable: false
                        });

                    myMap.geoObjects
                        .add(myGeoObject)

                }
            };
            info_right.appendChild(info_btn);
           let fav_btn = document.createElement('div');
            fav_btn.className = 'fav_btn';
            fav_btn.value = '0';
            fav_btn.id = result.response.listings[i].longitude;
            fav_btn.placeholder = i;
            fav_btn.onclick = function (){
                if (fav_btn.value  === '0'){
                    fav_btn.className = 'fav_btn_active';
					fav_btn.value = '1';
                    if (list.length !== 0) {
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].id === this.id) {
                                ind++;
                                ind2 = i;
                            }
                        }
                        if (ind === 0) {
                            list.push({id: this.id, 'img' : result.response.listings[this.placeholder].img_url, 'title' : result.response.listings[this.placeholder].title, 'price' : result.response.listings[this.placeholder].price_formatted, summary : result.response.listings[this.placeholder].summary, 'lister_url' : result.response.listings[this.placeholder].lister_url});
                            localStorage.setItem("fav_content", JSON.stringify(list));
                            lastDiv++;
                            localStorage.setItem("lastDiv", lastDiv);
                            let count = document.getElementById('fav_title');
                            count.innerText = 'Избранное (' + lastDiv + ')';
                        }
                        ind = 0;
                    } else {
                        list.push({id: this.id, 'img' : result.response.listings[this.placeholder].img_url, 'title' : result.response.listings[this.placeholder].title, 'price' : result.response.listings[this.placeholder].price_formatted, summary : result.response.listings[this.placeholder].summary, 'lister_url' : result.response.listings[this.placeholder].lister_url});
                        localStorage.setItem("fav_content", JSON.stringify(list));
                        lastDiv++;
                        localStorage.setItem("lastDiv", lastDiv);
                        let count = document.getElementById('fav_title');
                        count.innerText = 'Избранное (' + lastDiv + ')';
                    }
                } else {
                    fav_btn.className = 'fav_btn';
                    fav_btn.value = '0';
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].id === this.id) {
                            ind2 = i;
                        }
                    }
                    list.splice(ind2, 1);
                    lastDiv--;
                    localStorage.setItem("lastDiv", lastDiv);
                    localStorage.setItem("fav_content", JSON.stringify(list));

                    let count = document.getElementById('fav_title');
                    count.innerText = 'Избранное (' + lastDiv + ')';
                    if (lastDiv === 0) {
                        let myNode = document.getElementById("box_content");
                        myNode.style = 'overflow-y: scroll';
                        let fc = myNode.firstChild;

                        while( fc ) {
                            myNode.removeChild( fc );
                            fc = myNode.firstChild;
                        }
                        let info = document.createElement('div');
                        info.className = 'info_none';
                        info.innerText = 'Добавлений нет';
                        myNode.appendChild(info);
                        myNode.style.overflow = 'hidden';
                    }
                }
            };
            info_right.appendChild(fav_btn);
            right.appendChild(menu);
        }
    } else {
        let error = document.createElement('div');
        error.innerText = 'Результатов не найдено';
        error.className = 'error';
        document.getElementById('all').appendChild(error);
    }
}

function showSettings() {
    let show = document.getElementById('width_set');
    if (show.value === '0'){
        show.style.display = 'none';
        show.value = '1';
    } else {
        show.style.display = 'block';
        show.value = '0';
    }
}

function closeBox() {
    let modal = document.getElementById('openModal');
    modal.style.display = 'none';
}

function favOpen() {
    let myNode = document.getElementById("box_content");
    myNode.style = 'overflow-y: scroll';
    let fc = myNode.firstChild;

    while( fc ) {
        myNode.removeChild( fc );
        fc = myNode.firstChild;
    }

        let modal = document.getElementById('openModal');
        modal.style.display = 'block';
        document.getElementById('box_title').innerText = 'Избранное';
        let main = document.createElement('div');
        main.className = 'fav_main';
    if (lastDiv === 0 || lastDiv === '0') {
        let info = document.createElement('div');
        info.className = 'info_none';
        info.innerText = 'Добавлений нет';
        myNode.appendChild(info);
        myNode.style.overflow = 'hidden';
    } else {
        for (let i = 0; i < list.length; i++) {
            let fav_box = document.createElement('div');
            fav_box.className = 'fav_box';
            fav_box.id = 'fav' + i;
            let img = document.createElement('img');
            img.src = list[i].img;
            img.height = '145';
            fav_box.appendChild(img);
            main.appendChild(fav_box);
            let info = document.createElement('div');
            info.className = 'modal_info';
            let title = document.createElement('div');
            title.innerText = list[i].title;
            title.className = 'box_info_title';
            title.style.padding = '0';
            let summary = document.createElement('div');
            summary.innerText = list[i].summary;
            summary.className = 'summary';
            summary.style.height = 'auto';
            let menu = document.createElement('div');
            menu.className = 'price_menu';
            let price = document.createElement('div');
            if (list[i].price === undefined) {
                price.innerText = 'Нет цены'
            } else {
                price.innerText = list[i].price;
            }
            price.className = 'price';
            let fav_btn_del = document.createElement('div');
            fav_btn_del.className = 'fav_btn_del';
            fav_btn_del.innerText = 'Удалить';
            fav_btn_del.id = i;
            fav_btn_del.onclick = function (){
                document.getElementsByClassName('fav_box')[this.id].remove();
                list.splice(this.id, 1);
                lastDiv--;
                localStorage.setItem("lastDiv", lastDiv);
                localStorage.setItem("fav_content", JSON.stringify(list));

                for (let i = this.id; i < list.length; i++) {
                    document.getElementsByClassName('fav_btn_del')[i].id = i;
                }

                let count = document.getElementById('fav_title');
                count.innerText = 'Избранное (' + lastDiv + ')';
                if (lastDiv === 0) {
                    let myNode = document.getElementById("box_content");
                    myNode.style.overflow = 'hidden';
                    let fc = myNode.firstChild;

                    while( fc ) {
                        myNode.removeChild( fc );
                        fc = myNode.firstChild;
                    }
                    let info = document.createElement('div');
                    info.className = 'info_none';
                    info.innerText = 'Добавлений нет';
                    myNode.style.overflow = 'hidden';
                    myNode.appendChild(info);
                }
            };
            let fav_btn_red = document.createElement('div');
            fav_btn_red.className = 'info_btn';
            fav_btn_red.innerText = 'Перейти';
            fav_btn_red.style.width = '85px';
            fav_btn_red.id = i;
            fav_btn_red.onclick = function (){
                location.href = list[this.id].lister_url;
            };
            let button = document.createElement('div');
            button.className = 'fav_buttons';
            button.appendChild(fav_btn_red);
            button.appendChild(fav_btn_del);
            menu.appendChild(price);
            menu.appendChild(button);
            info.appendChild(title);
            info.appendChild(summary);
            info.appendChild(menu);
            fav_box.appendChild(info);
            main.appendChild(fav_box);

        }
    }
    document.getElementById("box_content").appendChild(main);
}
