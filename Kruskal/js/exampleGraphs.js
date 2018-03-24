///<reference path="Methods".ts"/>
function graph3() {
    addThisNode(160, 350);
    addThisNode(320, 150);
    addThisNode(480, 350);
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
}
function graph4() {
    addThisNode(160, 290);
    addThisNode(320, 450);
    addThisNode(320, 120);
    addThisNode(480, 290);
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(3, 0);
    connectNodes(3, 1);
}
function graph5() {
    addThisNode(160, 290);
    addThisNode(320, 450);
    addThisNode(320, 290);
    addThisNode(320, 120);
    addThisNode(480, 290);
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(3, 0);
    connectNodes(2, 4);
    connectNodes(3, 4);
    connectNodes(1, 4);
}
function graph6() {
    // Add nodes
    addThisNode(120, 290); //0
    addThisNode(280, 430); //1
    addThisNode(280, 120); //2
    addThisNode(580, 430); //3
    addThisNode(580, 120); //4
    addThisNode(750, 290); //5
    // Add edges
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(3, 4);
    connectNodes(3, 5);
    connectNodes(4, 5);
    connectNodes(4, 2);
    connectNodes(1, 3);
}
function graph7() {
    // Add nodes
    addThisNode(120, 290);
    addThisNode(280, 450);
    addThisNode(280, 120);
    addThisNode(430, 290);
    addThisNode(580, 450);
    addThisNode(580, 120);
    addThisNode(750, 290);
    // Add edges
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(3, 5);
    connectNodes(3, 4);
    connectNodes(3, 6);
    connectNodes(1, 3);
    connectNodes(5, 6);
    connectNodes(4, 6);
}
function graph8() {
    // Add nodes
    addThisNode(150, 290); //0
    addThisNode(270, 400); //1
    addThisNode(270, 180); //2
    addThisNode(420, 100); //3
    addThisNode(420, 480); //4
    addThisNode(570, 400); //5
    addThisNode(570, 180); //6
    addThisNode(700, 290); //7
    // Add edges
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(1, 4);
    connectNodes(3, 4);
    connectNodes(3, 6);
    connectNodes(4, 5);
    connectNodes(5, 6);
    connectNodes(5, 7);
    connectNodes(6, 7);
    connectNodes(1, 6);
    connectNodes(2, 5);
    connectNodes(3, 5);
}
function graph9() {
    // Add nodes
    addThisNode(150, 290); //0
    addThisNode(270, 400); //1
    addThisNode(270, 180); //2
    addThisNode(420, 100); //3
    addThisNode(420, 290); //4
    addThisNode(420, 480); //5
    addThisNode(570, 400); //6
    addThisNode(570, 180); //7
    addThisNode(700, 290); //8
    // Add edges
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(1, 4);
    connectNodes(3, 4);
    connectNodes(3, 6);
    connectNodes(4, 5);
    connectNodes(5, 6);
    connectNodes(6, 7);
    connectNodes(2, 4);
    connectNodes(4, 6);
    connectNodes(4, 8);
    connectNodes(6, 8);
    connectNodes(7, 8);
}
function graph10() {
    addThisNode(100, 290); //0
    addThisNode(250, 440); //1
    addThisNode(250, 140); //2
    addThisNode(250, 290); //3
    addThisNode(400, 200); //4
    addThisNode(400, 380); //5
    addThisNode(550, 440); //6
    addThisNode(550, 140); //7
    addThisNode(550, 290); //8
    addThisNode(710, 290); //9
    connectNodes(0, 1);
    connectNodes(0, 2);
    connectNodes(1, 3);
    connectNodes(2, 4);
    connectNodes(3, 4);
    connectNodes(5, 1);
    connectNodes(4, 5);
    connectNodes(3, 8);
    connectNodes(5, 8);
    connectNodes(4, 7);
    connectNodes(7, 8);
    connectNodes(7, 9);
    connectNodes(6, 9);
    connectNodes(4, 1);
    connectNodes(0, 3);
    connectNodes(8, 6);
    connectNodes(8, 4);
    connectNodes(1, 6);
}
