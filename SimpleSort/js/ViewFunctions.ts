let nr: string = "#insElemNr";
let defaultColor: string = "#fff";

// List of controllers (buttons) which is disabled under algorithm execution
let lockingControllers: string[] = ["start", "random", "almost", "sorted"];

function setColor(index: number, color: string, colorOn: boolean) {
    if (colorOn) {
        $(nr + index).css('backgroundColor', color);
    }
    else
        $(nr + index).css('backgroundColor', defaultColor); // Default color here
}

function setPosition(index: number, left: number, top: number) {
    let leftpx: string = left + "px";
    $(nr + index).animate({left: leftpx}, 700);
}

function swapId(a: number, b: number) {
    var midlA = $(nr + a).attr('id');
    var midlB = $(nr + b).attr('id');
    $(nr + b).attr('id', "Midl");
    $(nr + a).attr('id', midlB);
    $("#Midl").attr('id', midlA);
    return true;
}

function setId(oldId: number, newId: number) {
    let midlNew: string = $(nr + newId).attr('id');
    $(nr + oldId).attr('id', midlNew);
    return true;
}

function storePermaValue(index: any) {
    $(nr + index).animate({top: "50px"});
}

function releasePermaValue(index: any) {
    $(nr + index).animate({top: "0px"});
}

function setHeaderText(name: string) {
    $("#header").text(name);
}



