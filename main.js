function Pillars(object){

    if (!arguments) { throw new Error( 'Please specify Object upon instantialized object.' ) };

    this.pillarObj = object;
    this.dom = {
        pillar: document.getElementsByClassName(object.className),
        stylesheet : document.documentElement,
    };

    if (!this.pillarObj.className) { throw new Error( 'Please specify className upon instantialized object.' ) };
}


Pillars.prototype.setup = function (option ,space) {

    if (space === undefined) {space = 0}

    let index = this.dom.pillar.length;
    let spacing = 0;

    while(index--) {
        this.dom.pillar[index].style.position = this.pillarObj.position;
        this.dom.pillar[index].style.width = `${this.pillarObj.width}px`;
        this.dom.pillar[index].style.height = `${this.pillarObj.height}px`;
        this.dom.pillar[index].style.backgroundColor = this.pillarObj.color;

        if (option !== undefined && option.includes('left')) { this.dom.pillar[index].style.left = `${spacing}px`; }
        if (option !== undefined && option.includes('top')) { this.dom.pillar[index].style.top = `${spacing}px`; }
        spacing += space;
    }
    return;
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

    return;
}

Pillars.prototype.transition = function (pixels) {

    switch (this.pillarObj.animation) {
        
        case 'moveAcross':
            this.moveAcross(pixels);
            break;
        case 'moveDown':
            this.moveDown(pixels);
            break;
        case 'stretch':
            this.stretch(pixels);
            break;
        case 'fade':
            this.fade();
            break;
        default:
            return console.error('No animation method was passed through');
    }

}

Pillars.prototype.moveAcross = function (pixels) {

    this.insertStyleRule(".pillar { animation: move 3s infinite alternate;}");
    this.insertStyleRule(`@keyframes move { 0% { left: ; } 100% { left: ${pixels}px } }`);
    return;

}

Pillars.prototype.moveDown = function (pixels) {

    this.insertStyleRule(".pillar { animation: move 3s infinite alternate;}");
    this.insertStyleRule(`@keyframes move { 0% { top: ; } 100% { top: ${pixels}px } }`);
    return;

}

Pillars.prototype.delayPillar = function (passed) {

    let delay = passed
    for(let index = 0; index < this.dom.pillar.length; index++) {

        this.dom.pillar[index].style.animationDelay = `${delay}s`;
        delay += passed
    }
    return;
}

Pillars.prototype.everySecond = function (color) {

    for (let index = 0; index < this.dom.pillar.length; index++){

        this.dom.pillar[index++].style.backgroundColor = `${color}`;
    }
    return;

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
    position    : 'absolute',
    width       : 50,
    height      : 350,
    top         : 300,
    left        : 0,
    color       : 'blue',
    animation   : 'moveAcross'
});

pillar.setup(['left','top'], 10);

pillar.transition(300);
pillar.everySecond('red');
pillar.delayPillar(.2);


