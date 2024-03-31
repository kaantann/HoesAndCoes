class ColorCard{
    static _arrayLength = 4;

    constructor(){
        this.colorSquareList = new Array(_arrayLength);
        fillColorSquareList()
    }


    fillColorSquareList(){

        for (let index = 0; index < _arrayLength; index++) {

            let rowIdx = Math.floor(Math.random() * 16)
            let columnIdx = Math.floor(Math.random() * 30)

            this.colorSquareList[index] = {rowIdx,columnIdx};
        }

    }
}