$(document).ready(
function () {
    var cols = 10;
    var id = 'black';
    var temp;

    /*Initial Settings*/
    $(':input#borders').prop('checked', true);
    createGrid(cols);
    blackMode();

    /*Add/Remove Borders*/
    $('input#borders').change(
    function(){
        if($(this).is(':checked'))
        {
            $('.column').css('border', '1px solid white');
        } 
        else 
        {
            $('.column').css('border', 'none');
        }
    });

    $(':button').click(
    function () {
        temp = id;
        id = $(this).attr('id'); //Get button id.
        $(':input#borders').prop('checked', true);

        if(id != 'changeColor' || id !='changeSize')
        {
            createGrid(cols); 
        }
        if(id === 'changeSize')
        {
            id = temp;
            cols = getCols(); //Ask the user for a grid size.ss
            $('#borders').prop('checked', true);
            createGrid(cols); //Create the new user-custom grid.
        }

        //Select Mode
        switch (id) 
        {
            case 'black':
                blackMode();
                break;
            case 'gradient':
                gradientMode();
                break;
            case 'randomColor':
                randomColorMode();
                break;
            case 'trail':
                trailMode();
                break;
            default:
                break;
        }
    });
});

/*Ask the user for a  grid size and it returns it*/
function getCols() 
{
    var cols = prompt("How many rows would you like? (1-100)");

    while (cols < 1 || cols > 100) //Validation
    { 
        alert("That's not a correct value. ");
        cols = prompt("Try again and remember that it has to be 1-100");
    }

    return cols;
}

/*Create a new grid based on a size parameter*/
function createGrid(size) 
{   
    $('.row').remove();//Removes the current grid

    var squareSize = 600 / size; //Display size is adapted to the grid size

    /*Creates Rows' divs*/
    for (var i = 0; i < size; i++)
    {
        $('#grid').append('<div class="row"></div>');
    }
    /*Creates Columns divs (squares) inside each Row div*/
    for (var j = 0; j < size; j++)
    {
        $('.row').append('<div class="column"></div>');
    }

    /*Sets each square size*/
    $('.column').css('height', squareSize + 'px');
    $('.column').css('width',squareSize + 'px');
}

/*Simple version, it just makes black a hovered square*/
function blackMode()
{
    $('div.column').mouseenter(
    function () 
    {
        $(this).css('opacity',.7);
    });
}

/*Color keeps getting closer to black with every hover on the tile*/
function gradientMode() 
{
    $('div.column').mouseenter(
    function () 
    {
        var opa = $(this).css("opacity");

        if (opa < 1) 
        {
            $(this).css("opacity", opa*2); //1.28 for 10 hovers to get black
        }
    });
}

/*Each square gets a random color each time you hover over it*/
function randomColorMode()
{
    $('div.column').mouseenter(
    function()
    {
        /*Random color generation, opacity for a larger color range*/
        var r =Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        var opa = Math.random();

        $(this).css("background-color", "rgb(" + r +"," + g + "," + b +")");
        $(this).css("opacity", opa+.2); //.2 to avoid colors close to white
    });
}

/*Mouse leaves a fadding trail as it passes over each square*/
function trailMode(){
    $('div.column').mouseenter(
    function() {
        $(this).fadeTo(100,1);
        $(this).mouseleave(
        function(){
            $(this).fadeTo(300,.1);
        });
    });
}