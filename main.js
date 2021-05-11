function Pillars(object){
    this.pillarObj = object;
    this.dom = {
        pillar: document.getElementsByClassName('pillar'),
        stylesheet : document.documentElement
    }

    if (this.dom.pillar[0] === null) { throw new Error( console.error( 'No elements with className pillar.' ) ) }
}

Pillars.prototype.setup = function () {

    let index = this.dom.pillar.length;
    let count = 0;

    while(index--) {

        this.dom.stylesheet.style.setProperty( '--pillar-width' , `${this.pillarObj.width}px`   ) 
        this.dom.stylesheet.style.setProperty( '--pillar-height', `${this.pillarObj.height}px`  ) 
        this.dom.stylesheet.style.setProperty( '--pillar-top'   , `${this.pillarObj.top}px`     ) 
        this.dom.stylesheet.style.setProperty( '--pillar-left'  , `${this.pillarObj.left}px`    ) 

        this.dom.pillar[index].style.top = `${count}px`;
        count += 110;
    }

}

Pillars.prototype.move = function () {

}

const pillar = new Pillars({
    position    : 'left',
    width       : 300,
    height      : 100,
    top         : 300,
    left        : 0,
    color       : 'red',
    animation   : 'stretch'
});

pillar.setup();
//pillar.move();