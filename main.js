function Pillars(object){
    this.pillarObj = object;
    this.dom = {
        pillar: document.getElementsByClassName(object.className),
        stylesheet : document.documentElement,
        sheet:  document.styleSheets[0]
    }

    if (this.dom.pillar[0] === null) { throw new Error( console.error( 'No elements with className pillar.' ) ) }
}

Pillars.prototype.setup = function () {

    let index = this.dom.pillar.length;
    let count = 0;

    while(index--) {

        this.dom.stylesheet.style.setProperty( '--pillar-color' , `${this.pillarObj.color}`     ) 
        this.dom.stylesheet.style.setProperty( '--pillar-width' , `${this.pillarObj.width}px`   ) 
        this.dom.stylesheet.style.setProperty( '--pillar-height', `${this.pillarObj.height}px`  ) 
        this.dom.stylesheet.style.setProperty( '--pillar-top'   , `${this.pillarObj.top}px`     ) 
        this.dom.stylesheet.style.setProperty( '--pillar-left'  , `${this.pillarObj.left}px`    )

        this.dom.pillar[index].style.top = `${count}px`;
        count += 110;
    }

}

Pillars.prototype.transition = function (callback, pixels) {


    switch (this.pillarObj.animation || callback) {
        
        case 'move':
            this.move(pixels);
            break;
        case 'stretch':
            this.stretch(pixels);
            break;
        case 'fade':
            this.fade();
            break;
    }
}

Pillars.prototype.move = function (pixels) {

    this.dom.stylesheet.style.setProperty( '--pillar-transition', 'move' )

    let index = this.dom.pillar.length;
    for(let index = 0; index < this.dom.pillar.length; index++) {

        this.dom.pillar[index].style.setProperty('--pillar-movement', `${pixels}px`);
        this.dom.pillar[index].style.animationDelay = `${index}s`;
    }
}

Pillars.prototype.stretch = function (pixels) {

    this.dom.stylesheet.style.setProperty( '--pillar-transition', 'stretch' )

    let index = this.dom.pillar.length;
    for(let index = 0; index < this.dom.pillar.length; index++) {

        this.dom.pillar[index].style.setProperty('--pillar-movement', `${pixels}px`);
        this.dom.pillar[index].style.animationDelay = `$0.{index}s`;
    }
}


const pillar = new Pillars({
    className   : 'pillar',
    position    : 'left',
    width       : 300,
    height      : 100,
    top         : 300,
    left        : 0,
    color       : 'black',
});


pillar.setup();
//pillar.transition('move', 800);
pillar.transition('stretch', 1500);

