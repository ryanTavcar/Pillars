function Pillars(object){

    if (!arguments) { throw new Error( 'Please specify Object upon instantialized object.' ) };

    this.pillarObj = object;
    this.dom = {
        pillar: document.getElementsByClassName(object.className),
        stylesheet : document.documentElement,
    };

    if (!this.pillarObj.className) { throw new Error( 'Please specify className upon instantialized object.' ) };
}


Pillars.prototype.setup = function () {

    let index = this.dom.pillar.length;
    let spacing = 0;

    while(index--) {
        this.dom.pillar[index].style.position = this.pillarObj.position;
        this.dom.pillar[index].style.left = `${this.pillarObj.left}px`;
        this.dom.pillar[index].style.width = `${this.pillarObj.width}px`;
        this.dom.pillar[index].style.height = `${this.pillarObj.height}px`;
        this.dom.pillar[index].style.backgroundColor = this.pillarObj.color;

        this.dom.pillar[index].style.top = `${spacing}px`;
        spacing += 110;
    }

}

Pillars.prototype.insertStyleRule = function (ruleText) {
    let sheets = document.styleSheets;

    if (sheets.length === 0) {
        let style = document.createElement('style');
        style.appendChild( document.createTextNode('') );
        document.head.appendChild(style);
    }
    let sheet = sheets[sheets.length - 1]
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length)

}

Pillars.prototype.transition = function (callback, pixels) {


    switch (this.pillarObj.animation || callback) {
        
        case 'move':
            this.move(pixels, 1);
            break;
        case 'stretch':
            this.stretch(pixels);
            break;
        case 'fade':
            this.fade();
            break;
    }
}

Pillars.prototype.move = function (pixels, passed) {

    this.insertStyleRule(".pillar { animation: move 3s infinite alternate;}");
    this.insertStyleRule(`@keyframes move { 0% { left: 0px; } 100% { left: ${pixels}px } }`);

    let delay = passed
    for(let index = 0; index < this.dom.pillar.length; index++) {

        this.dom.pillar[index].style.animationDelay = `${delay}s`;
        delay += passed
    }
}

Pillars.prototype.delayPillar = function () {

    let index = this.dom.pillar.length;
    for(let index = 0; index < this.dom.pillar.length; index++) {


        this.dom.pillar[index].style.animationDelay = `${index}s`;
    }
}

// Pillars.prototype.stretch = function (pixels) {

//     this.dom.stylesheet.style.setProperty( '--pillar-transition', 'stretch' )

//     let index = this.dom.pillar.length;
//     for(let index = 0; index < this.dom.pillar.length; index++) {

//         this.dom.pillar[index].style.setProperty('--pillar-movement', `${pixels}px`);
//         this.dom.pillar[index].style.animationDelay = `$0.{index}s`;
//     }
// }


const pillar = new Pillars({
    className   : 'pillar',
    position    : 'absolute',
    width       : 300,
    height      : 100,
    top         : 300,
    left        : 0,
    color       : 'black'
});

pillar.setup();

pillar.transition('move', 800);
//pillar.insertStyleRule(".pillar { animation: move 3s infinite alternate;}");

