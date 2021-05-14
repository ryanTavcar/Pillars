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

        if (option !== undefined && option.includes('left')) { 
            this.dom.pillar[index].style.left = `${spacing}px`; 
            this.dom.pillar[index].style.top = 0+'px';  
        }
        if (option !== undefined && option.includes('top')) { 
            this.dom.pillar[index].style.top = `${spacing}px`;
            this.dom.pillar[index].style.left = 0+'px';  
        }
        spacing += space;
    }
    return this;
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
        case 'stretchAcross':
            this.stretchAcross(pixels);
            break;
        case 'stretchDown':
            this.stretchDown(pixels);
            break;
        case 'fade':
            this.fade();
            break;
        default:
            return console.error('No animation method was passed through');
    }
    return this;
}

// Transitions
Pillars.prototype.moveAcross = function (pixels) {

    this.insertStyleRule(`.${this.pillarObj.className} { animation: move 3s infinite alternate;}`);
    this.insertStyleRule(`@keyframes move { 0% { left: ; } 100% { left: ${pixels}px } }`);
    return this;

}

Pillars.prototype.moveDown = function (pixels) {

    this.insertStyleRule(`.${this.pillarObj.className} { animation: move 3s infinite alternate;}`);
    this.insertStyleRule(`@keyframes move { 0% { top: ; } 100% { top: ${pixels}px } }`);
    return this;

}

Pillars.prototype.stretchAcross = function (pixels) {

    this.insertStyleRule(`.${this.pillarObj.className} { animation: stretchAcross 3s infinite alternate;}`);
    this.insertStyleRule(`@keyframes stretchAcross { 0% { width: ; } 100% { width: ${pixels}px } }`);
    return this;
}

Pillars.prototype.stretchDown = function (pixels) {

    this.insertStyleRule(`.${this.pillarObj.className} { animation: stretchDown 3s infinite alternate;}`);
    this.insertStyleRule(`@keyframes stretchDown { 0% { height: ; } 100% { height: ${pixels}px } }`);
    return this;
}

Pillars.prototype.delayPillar = function (passed) {

    let delay = passed
    for(let index = 0; index < this.dom.pillar.length; index++) {

        this.dom.pillar[index].style.animationDelay = `${delay}s`;
        delay += passed
    }
    return this;
}

Pillars.prototype.everySecond = function (color) {

    for (let index = 0; index < this.dom.pillar.length; index++){

        this.dom.pillar[index++].style.backgroundColor = `${color}`;
    }
    return this;

}

Pillars.prototype.everyThird = function (color) {

    for (let index = 0; index < this.dom.pillar.length; index++){

        this.dom.pillar[index++].style.backgroundColor = `${color}`;
        index++
    }
    return this;

}


const pillar1 = new Pillars({
    className   : 'pillar1',
    position    : 'absolute',
    width       : 100,
    height      : 50,
    color       : 'blue',
    animation   : 'moveAcross'
});


pillar1.setup(['left','top'], 20)
pillar1.transition(300)
pillar1.delayPillar(.2);
pillar1.everySecond('white')
pillar1.everyThird('red')




//Change the every second pillar a different color every 4 seconds
// let nextColor = 0;
// const nextColorFunc = () => {
//     console.log(nextColor)
//     const colors = ['red', 'green', 'black'];
    
//     pillar.everySecond(colors[nextColor])
//     nextColor++
//     if(nextColor === 3) {
//         nextColor = 0
//     }
//     setTimeout( nextColorFunc ,4000)
// }


// setTimeout(nextColorFunc, 2000 )





