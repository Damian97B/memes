window.onload = function(){
    memeApp.loadData();
}
let memeApp = {
    memeData: null,
    memeNumber: 0,
    memeTitleDomEL: null,
    memeImgDomEL: null,

    loadData: function(){
        fetch("https://api.imgflip.com/get_memes").then( response => response.json()).then( data => memeApp.dataReady(data))
    },
    dataReady: function(data){
        console.log(data);
        memeApp.memeData = data.data.memes;
        memeApp.memeTitleDomEL = document.getElementsByClassName("meme-title")[0];
        memeApp.memeImgDomEL = document.getElementsByClassName("meme-img")[0];

        document.addEventListener("keydown", function(e){
            switch(e.keyCode){
                case 37:
                    console.log("left");
                    memeApp.previousMeme();
                    break;
                case 38:
                    console.log("up");
                    break;
                case 39:
                    console.log("right");
                    memeApp.nextMeme();
                    break;
            }
        })
        this.nextMeme();
    },
    nextMeme: function(){
        this.memeNumber++;
        if(this.memeNumber >= this.memeData.length) this.memeNumber = 0;
        this.setDOMData();

    },
    previousMeme: function(){
        this.memeNumber--;
        if(this.memeNumber < 0) this.memeNumber = this.memeData.length - 1;
        this.setDOMData();

    },
    setDOMData: function(){
        let imgData = this.memeData[this.memeNumber];
        this.memeTitleDomEL.innerHTML = imgData.name;
        this.memeImgDomEL.src = imgData.url;

        document.title = "meme #" + this.memeNumber;
    }
};