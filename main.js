function Pillars(object){
    this.pillarObj = object;
    this.dom = {
        pillar: document.getElementsByClassName('pillar'),
        stylesheet : document.documentElement,
        sheet:  document.styleSheets[0]
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

    this.move();

}

Pillars.prototype.move = function (name, frames) {

    let index = this.dom.pillar.length;
    // this.dom.sheet.insertRule(`@keyframes move-example { 
    //     0% { left: ${pillar.pillarObj.left}px } 
    //     100% { left: ${left}px; } `
    //     , pos);

    while(index--) {

        this.dom.pillar[index].style.setProperty('--pillar-moveleft', 500 +'px')

    }


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
pillar.move();
// pillar.move('move-example',
//             '0%{ left: `${pillar.pillarObj.left}px`; }' + 
//             '100%{ left: 300 + px; }'
//             );