$(function () {

    $('#continue').hide();
    $('#overlay3').hide();
    $('#video1').hide();
    $('#video2').hide();
    $('#video3').hide();
    $('#overlay').hide();
    $('#noClick').hide();
    $('#popUpText').hide();
    $('#gameContent').hide();
    $('#gameMiddle').hide();
    $('#crew').hide();
    

    //x-wing
    $(document).mousemove(function (e) {
        $('.xwing').css({
            left: e.pageX,
            top: e.pageY
        });
    })

    // blink
    $('#gallery').on('click', '#pl', function () {
        $(this).addClass('blink');
        setTimeout(function(){
            $('div#pl').removeClass('blink');
        },2000);
    })
    $('#gameMiddle').on('click', '#pl', function () {
        $(this).addClass('blink');
        setTimeout(function(){
            $('#pl').removeClass('blink');
        },2000);
    })
    $('button , #gallery#pl').click(function(){
        $(this).addClass('blink');
        setTimeout(function(){
            $('button').removeClass('blink');
        },2000);
    })

    // antiClick
    function noClic(){
        $('#noClick').fadeIn('slow',function(){});
        $('#noClick').fadeOut('slow',function(){});
    }

    // anti-scroll
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });

    //exploreknop & animations & scroll
    $('#explore').click(function () {
        $("#gallery").empty();
        noClic();
        callData();

        $('.xwing').fadeOut("slow", function () {})
        $('#buttons').delay(500).fadeOut("slow", function () {})
        $('.groot').delay(500).fadeOut("slow", function () {})

        $('#content').delay(1000).fadeIn("slow", function () {})
        $('#exploreNav').delay(1500).slideDown("slow", function () {})

        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });

       

    })

    //gameknop & animations
    

    $('.play').click(function () { 
        noClic();
        var vid = document.getElementById("video1");
        vid.currentTime = 0;
        $('#content').delay(500).fadeOut("slow", function () {})
        $('.xwing').fadeIn("slow", function () {})
        $('#exploreNav').fadeOut("slow", function () {})
        $('#space4').delay(4000).fadeOut("slow", function () {})
        $('#video1').delay(4000).fadeIn("slow", function () {})
        $('#video2').delay(6000).fadeIn("slow", function () {})
        $('#buttons').delay(500).fadeOut("slow", function () {})
        $('#gameNav').delay(1500).fadeIn("slow", function () {})
        $('#crew').delay(1500).fadeIn("slow", function () {})
        $('.groot').delay(500).fadeOut("slow", function () {})
        $('#gamePl').empty();
        $('#gameMiddle').delay(8000).fadeIn("slow", function () {})

        gameData();





    })

    //exitGame & animations
    $('.exit').click(function () {


        noClic();

        $('#video1').fadeOut("slow", function () {})
        $('#video2').delay(1000).fadeOut("slow", function () {})
        $('#video3').delay(1000).fadeOut("slow", function () {})

        $('#buttons').delay(3000).fadeIn("slow", function () {})
        $('#gameNav').delay(500).fadeOut("slow", function () {})
        $('.groot').delay(3000).fadeIn("slow", function () {})
        $('#space4').delay(2000).fadeIn("slow", function () {})
       

        $('#gameContent,#overlay,#gameMiddle').fadeOut("slow", function () {})


    })

    //terugnaarhomescreen & animations
    $('.klein').click(function () {
        noClic();
        $('#exploreNav').fadeOut("slow", function () {})
        $('#content').delay(500).fadeOut("slow", function () {})
        $('html, body').delay(1000).animate({
            scrollTop: $("#begin").offset().top
        }, 500);
        $('#space4').delay(1000).fadeIn("slow", function () {})
        $('.xwing').delay(2000).fadeIn("slow", function () {})
        $('#buttons').delay(1500).fadeIn("slow", function () {})
        $('.groot').delay(1500).fadeIn("slow", function () {})
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });

    })

    //search absolute to relative
    $(window).scroll(function () {
        if ($(this).scrollTop() > 170) {
            $('#search').css('position', 'fixed');
            $('#search').css('top', '6%');

        } else {
            $('#search').css('position', 'absolute');
            $('#search').css('top', '30%');
        }
    });

    //Data call api
    function callData() {
        for (let i = 1; i < 8; i++) {

            $.ajax({
                url: 'https://swapi.dev/api/planets/?page=' + i,
                method: 'GET',
                dataType: 'json',
            }).done(function (data) {
                console.log('DONE');
                console.log(data);


                

                for (let b of data.results) {
                    $('#gallery').append(`<div id="pl"><img src="beelden/planets/${b.name}.jpg" alt="planet img"><h1 id="plName">${b.name}</h1></div>`)
                }



            }).fail(function (er1, er2) {
                console.log(er1);
                console.log(er2);
            });

        }



    };

    //search function
    $("#search").keyup(function () {
        let seVal = $("#search").val();
        let url = "https://swapi.dev/api/planets/?search=" + seVal
        $("#gallery").empty();
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            console.log('DONE');
            console.log(data);

            for (let b of data.results) {
                $('#gallery').append(`<div id="pl"><img src="beelden/planets/${b.name}.jpg" alt="planet img"><h1 id="plName">${b.name}</h1></div>`)
            }


            if (seVal.length == 0) {
                $("#gallery").empty();
                callData();
            }

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });

    })


    //popUp
    $('#gallery').on('click', '#pl', function () {
        noClic();
        let hVal = $(this).children('h1').text();
        let url = "https://swapi.dev/api/planets/?search=" + hVal

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            console.log('DONE');
            console.log(data);


            $('#overlay').fadeIn('slow', function () {})
            $('#popUpText').fadeIn('slow', function () {})
            $('#cross , #overlay').click(function () {
                $('#overlay').fadeOut('slow', function () {})
                $('#popUpText').fadeOut('slow', function () {})
                $('#popContent').empty();
            })
            for (let t of data.results) {
                console.log(t.name);
                $('#popUpText').css(`background-image`, `url(beelden/planetBack/${t.name}.jpg)`);
                $('#popContent').append(`
                    
                    <h1>${t.name}</h1>
                    <p> Climate: ${t.climate}</p>
                    <p> Diameter: ${t.diameter}</p>
                    <p> Terrain: ${t.terrain}</p>
                    <p> Population: ${t.population}</p>
                    <p> Films:</p>
                    
                    
                    `)


                //callfilms
                let url = t.films[0]
                $.ajax({
                    url: url,
                    method: 'GET',
                    dataType: 'json',
                }).done(function (data) {
                    console.log('DONE');
                    console.log(data.title);

                    $('#popContent').append(`              
                        <p><img src="beelden/movies/${data.title}.png" alt="moviePic"></p>

                    `)


                }).fail(function (er1, er2) {
                    console.log(er1);
                    console.log(er2);
                });
            }

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });


    });


    //gameData call 
    function gameData() {
        for (let i = 1; i < 4; i++) {
            let random = Math.floor(Math.random() * 61) + 1;
            $.ajax({
                url: 'https://swapi.dev/api/planets/' + random,
                method: 'GET',
                dataType: 'json',
                limit: 3,
            }).done(function (data) {
                console.log('DONE');
                console.log(data);


                $('#gamePl').append(`<div id="pl"><img src="beelden/planets/${data.name}.jpg" alt="planet img"><h1 id="plName">${data.name}</h1></div>`)


            }).fail(function (er1, er2) {
                console.log(er1);
                console.log(er2);
            });

        }



    };


    //Planet chosen
    $('#gameMiddle').on('click', '#pl', function () {
        noClic();
        var vid = document.getElementById("video3");
        vid.currentTime = 0;

        $('#video2').delay(400).fadeOut("slow", function () {})
        $('#video3').fadeIn("slow", function () {})
        $('#space4').delay(2700).fadeIn("slow", function () {})
        $('#gameMiddle').fadeOut("slow", function () {})


        $('#gameContent').fadeOut();
        let gameVal = $(this).children('h1').text();
        let url = "https://swapi.dev/api/planets/?search=" + gameVal
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            console.log('DONE');
            console.log(data);


            $('#overlay').delay(2000).fadeIn('slow', function () {})
            $('#overlay3').delay(2000).fadeIn('slow', function () {})
            $('#gameContent').delay(3000).fadeIn('slow', function () {})
            $('#continue').delay(3000).fadeIn('slow', function () {})
            $('#people, #welcome').empty();

            for (let u of data.results) {
                console.log(u.name);
                $('#gameContent').css(`background-image`, `url(beelden/planetBack/${u.name}.jpg)`);
                $('#welcome').prepend(`Welcome to ${u.name}`);
                $('#gameChose').append(getperso());

            }

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });




    });


    //get personage
    function getperso() {
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 87) + 1;
            $.ajax({
                url: "https://swapi.dev/api/people/" + random,
                method: 'GET',
                dataType: 'json',
            }).done(function (data) {
                console.log('DONE');
                console.log(data);

                $('#people').append(`<div id="gamePerso"><img src="beelden/perso/${data.name}.png" alt="planet img"><h1 id="gameh1">${data.name}</h1><button>Choose</button></div>`);

            }).fail(function (er1, er2) {
                console.log(er1);
                console.log(er2);
            });
        }

    }

    
    //perso chosen
    $('#gameChose').on('click', 'button', function () {
  
        if ( $("#gameCrew").find("div").length <= 4 ) {
        let persoName = $(this).parents().children('h1').text();
        $(this).replaceWith('<p id="added">Added</p>')
        let Personage = {
            name: persoName,
            picUrl: 'beelden/perso/' + persoName + '.png'
        }
        var realData = JSON.stringify(Personage);
        loadCrew();
        $.ajax({
            url: "http://127.0.0.1:3000/getPeople/added",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: realData

        }).done(function () {
            console.log('perso removed');



        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });
        loadCrew();
 
    }else{$('#overload').text('Warning: you can only have 4 members in your ship.').css('color','red')}
    })

    
    //remove perso
    $('#gameCrew').on('click', 'button', function () {
        let persoRem = $(this).parents().children('h1').text();
        $(this).replaceWith('<p id="added">Removed</p>')

        let Personage = {
            name: persoRem,
            picUrl: 'beelden/perso/' + persoRem + '.png'
        }
        var fakeData = JSON.stringify(Personage);

        $.ajax({
            url: "http://127.0.0.1:3000/getPeople/deleted",
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: fakeData

        }).done(function (data) {
            console.log(data);

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });




    })

    //getData no reload
    function load() {
        $.ajax({
            url: 'http://127.0.0.1:3000/getPeople/deleted',
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            console.log('DONE');
            console.log(data);
            for (let p of data) {
                $('#crew').append(`<img id='crewIcon' src='${p.picUrl}' alt='personageImg'>`)

            }

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });
    }

    //replay
    function replay() {

        var vid = document.getElementById("video1");
        vid.currentTime = 0;
        $('#video1').hide();
        $('#video2').hide();
        $('#video3').hide();
        $('#overlay').fadeOut('slow', function () {})
        $('#gameContent').fadeOut('slow', function () {})
        $('#space4').delay(4000).fadeOut("slow", function () {})
        $('#video1').delay(4000).fadeIn("slow", function () {})
        $('#video2').delay(6000).fadeIn("slow", function () {})
        $('#gamePl').empty();

        $('#gameMiddle').delay(8000).fadeIn("slow", function () {})

        gameData();
    }

    //continue
    $('#conti').click(function () {
        noClic();
        $('#crew').empty();
        loadCrew();
        load();
        $('#gameCrew').fadeOut("slow", function () {});
        $('#gameChose').delay(2000).fadeIn("slow", function () {});
        replay();
    })

    //deposit
    $('#gameCrew').hide();
    loadCrew();
    $('#deposit').click(function () {
        loadCrew();

        $('#gameCrew , #gameChose').fadeToggle();
        if ( $("#gameCrew").find("div").length <= 4 ) {
            $('#overload').text('Would you like to take someone onboard?').css('color','white')
        };
    })
    function loadCrew(){

    
        $.ajax({
            url: 'http://127.0.0.1:3000/getPeople/added',
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            console.log('DONE');
            console.log(data);
            $('#yourCrew').empty();
            for (let p of data) {
                $('#yourCrew').append(`<div id="gamePerso"><img src="beelden/perso/${p.name}.png" alt="planet img"><h1 id="gameh1">${p.name}</h1><button>Remove</button></div>`)

            }

        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });
         
    }

});