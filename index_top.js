var diamondx = 50;
var diamondy = 300;

var NS = "http://www.w3.org/2000/svg";
var reverse = true;
var yBar = 250;
var yText = 195;
var currentPI = 0;
var startingMarker = 5;
var itemCount = 0;

var input = document.getElementById('input');

input.addEventListener('change',function(){
    var i = 0;
    var count = 0;

    //read the first PI of the document and get number of items
    readXlsxFile(input.files[0]).then((data) => {
        //console.log(input.files[0]);
        currentPI = data[1][1];
        itemCount = data.length;
        //console.log(itemCount*50)
    });

    readXlsxFile(input.files[0]).then(function(rows) {
        //add main axis
        var mainLine = document.createElementNS(NS,"line");
        mainLine.setAttribute("x1",0);
        mainLine.setAttribute("y1",diamondy);
        console.log(itemCount)
        mainLine.setAttribute("x2",(itemCount*50));
        mainLine.setAttribute("y2",diamondy);
        mainLine.setAttribute("style", "stroke:black; stroke-width:2");
        console.log("the main is" , mainLine);
        timeline.appendChild(mainLine);

        rows.forEach((col)=>{
            if (count != 0){
                console.log(col[0]);
                console.log(col[1]);

                // This is for the PI Marker
                if(currentPI != col[1] || count == itemCount-1){
                    console.log("it is not the same :sadd:")
                    
                    // Rectagle to mark PI
                    var piMarker  = document.createElementNS(NS,"rect");
                    piMarker.setAttribute("x", startingMarker);
                    piMarker.setAttribute("y", 5);
                    piWidth = diamondx-startingMarker+25
                    if(count != itemCount-1){
                        piWidth = piWidth-50;
                    }
                    piMarker.setAttribute("width", piWidth);
                    piMarker.setAttribute("height", 20);
                    piMarker.setAttribute("style", "fill:white;stroke-width:3;stroke:black");
                    timeline.appendChild(piMarker);

                    // Line to separate PIs
                    // var example = document.createElementNS(NS,"line");
                    // example.setAttribute("x1",startingMarker + piWidth );
                    // example.setAttribute("y1",diamondy);
                    // example.setAttribute("x2",startingMarker + piWidth);
                    // example.setAttribute("y2",30);
                    // example.setAttribute("style", "stroke:black; stroke-width:2");
                    // console.log(example);
                    // timeline.appendChild(example);

                    console.log(piMarker)

                    // Create foreignObject to add text to rectangle via a div
                    var piName = document.createElementNS(NS,"foreignObject");      
                    console.log(piName)        
                    piName.setAttribute("x", startingMarker);
                    piName.setAttribute("y", 5);
                    piName.setAttribute("width", piWidth);
                    piName.setAttribute("height", 20);

                    // create div and add center-alligned text to it
                    var piText = document.createElement("div")
                    piText.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                    piText.setAttribute("style", "width:"+piWidth+"; height:20; overflow-y:auto; text-align:center")
                    piText.innerHTML = currentPI;
                    piName.appendChild(piText);
                    timeline.appendChild(piName);

                    console.log(piText);
                    
                    currentPI = col[1];
                    startingMarker = startingMarker+piWidth;
                }
                
                // Create "bar" for each item
                var bar = document.createElementNS(NS,"line");
                bar.setAttribute("x1",diamondx);
                bar.setAttribute("y1",diamondy);
                bar.setAttribute("x2",diamondx);
                if(reverse){
                    yBar = 150;
                }
                else{
                    yBar = 450;
                }
                bar.setAttribute("y2",yBar);
                bar.setAttribute("style", "stroke:black; stroke-width:2");
                console.log(bar);
                timeline.appendChild(bar);

                // Create diamond for the item
                var diamond = document.createElementNS(NS, "rect");
                console.log(diamond);
                diamond.setAttribute("x", diamondx - 10); //Subtracting half the width and height of the square so that the bar falls in the diamond's center
                diamond.setAttribute("y", diamondy - 10);
                diamond.setAttribute("width", 20);
                diamond.setAttribute("height", 20);
                diamond.setAttribute("transform", "rotate(45,"+ diamondx + ","+diamondy+")"); // The second and third arguments of the rotate transformation indicate the point at which we want to transform the rectangle, in this case, its center
                diamond.setAttribute("style", "fill:gray;stroke-width:3;stroke:blue");
                timeline.appendChild(diamond);

                // Add item text
                var item = document.createElementNS(NS, "foreignObject");
                item.setAttribute("x",diamondx-30);
                if(reverse){
                    yText = 95;
                    reverse = false;
                }
                else{
                    yText = 440;
                    reverse = true;
                }
                item.setAttribute("y",yText);
                item.setAttribute("width",100);
                item.setAttribute("height",100);
                item.setAttribute("overflow", "visible");

                var p = document.createElement("p")
                p.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                p.setAttribute("style", "font-size: 12px;content: attr(data-hover)")

                p.innerHTML = col[0];
                p.onmouseover = function(){
                    p.innerHTML = col[2];
                    // I could probably show the dependencies like this
                }
                p.onmouseout = function(){
                    p.innerHTML = col[0];
                    // Go back to item name like this
                }
                item.appendChild(p);

                
                console.log(item);
                timeline.appendChild(item);

                i = i+50;
                diamondx = diamondx+50
            }
            count += 1;

        })
    });
});

