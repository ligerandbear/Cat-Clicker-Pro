var model ={
	currentCat: null,
	cats: [
		{
			name: "George",
			imageSrc: "img/george.jpg",
			clickCount: 0
		},
		{
			name: "Ember Kitten",
			imageSrc: "img/ember1.jpg",
			clickCount: 0
		},
		{
			name: "Princess Ember",
			imageSrc: "img/ember2.jpg",
			clickCount: 0
		},
		{
			name: "Ember Cat",
			imageSrc: "img/ember3.jpg",
			clickCount: 0
		},
		{
			name: "Princess Ember Kitten",
			imageSrc: "img/ember4.jpg",
			clickCount: 0
		}
]};

var catListView = {
	//catListElem: document.getElementById('cat-list')
	render: function(){
		this.catListElem = document.getElementById('cat-list');
		var elem;
		//var catNames = "";
		var cats = octopus.getCats();
		this.catListElem.innerHTML = "";
		//cats.forEach(function(cat){ 
		for (var i=0; i < cats.length; i++){
			var cat = cats[i]; 
			elem = document.createElement('li');
            elem.textContent = cat.name;
			elem.addEventListener("click", (function(catCopy){
				return function() {
					octopus.setCurrentCat(catCopy);
					catDisplayView.render();
				};
			})(cat));
			    /* elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat)); */
		
		this.catListElem.appendChild(elem);
		}
	}
};
var catDisplayView = {
	init: function(){
		this.catImgElem = document.getElementById("cat-viewer");
		this.catNameElem = document.getElementById("current-cat-name");
		this.catCounterElem = document.getElementById("current-click-count");
		
		this.catImgElem.addEventListener("click", octopus.catCounter);
		this.render();
	},
	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.catImgElem.src = currentCat.imageSrc;
		this.catNameElem.textContent = currentCat.name;
		this.catCounterElem.textContent = currentCat.clickCount;
	}
}

var adminView = {
	init: function(){
		this.adminButton = document.getElementById("admin-button");
		//this.adminButton.addEventListener("click", this.showAdmin);
		//this.formBox = document.getElementsByTagName("form");
		this.catNameInput = document.getElementById("cat-name-input");
		this.imgSrcInput = document.getElementById("image-source-input");
		this.clickCountInput = document.getElementById("click-count-input");
		this.cancelButton = document.getElementById("cancel-button");
		this.saveButton = document.getElementById("save-button");
		this.adminButton.addEventListener("click", adminView.showAdmin);
		this.render();
	},
	showAdmin: function(){
		this.formBox.style.visibility = "visible";
		//adminView.render();
		console.log("something happened");
	},
	hideAdmin: function(){
		this.formBox.style.visibility = "hidden";
	},
		render: function(){
		var currentCat = octopus.getCurrentCat();
		this.catNameInput.placeholder = currentCat.name;
		this.imgSrcInput.placeholder = currentCat.imageSrc;
		//this.clickCountInput.text = "";
		this.clickCountInput.placeholder = currentCat.clickCount;
	}
}

var octopus = {
	init: function(){
		model.currentCat = model.cats[0];
		catListView.render();
		catDisplayView.init();
		adminView.init();
	} ,
	getCurrentCat: function(){
		return model.currentCat;
	},
	getCats: function(){
		return model.cats;
	},
	setCurrentCat: function(cat){
		model.currentCat = cat;
		/* var cat = model.cats[i]
		catListView.catList.addEventListener("click", (function(catCopy){
			return funtion(){
				model.currentCat = catCopy;
				catDisplayView.update();
			}
		})(cat)); */
	},
	catCounter: function(){
		model.currentCat.clickCount++;
		catDisplayView.render();
	},
	adminSave: function(){
		
	},
	adminCancel: function(){
		
	}
};
octopus.init();

