var rdAtual = 0;

function verificaRd(tp){

    var vfrd = rdAtual;

    //true +
    tp ? vfrd++ :vfrd--;

    if(vfrd > 0 && vfrd < 39){

        rdAtual = vfrd
        vfrd = 'rd'+rdAtual

        Selectrd(window[vfrd], rdAtual)
    }

}

function Selectrd(rd, num){

    rdAtual = num;

    var conteudo = []
    var div, divSec, span, spanSec, img, conteudo, dt, titulo;

    div = document.createElement('div')
        $(div).addClass('d-flex')
        $(div).attr('style','justify-content: space-between')

        divSec = document.createElement('div')
            $(divSec).html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg>');
            $(divSec).attr('onclick','verificaRd(false)');
        div.appendChild(divSec)

        titulo = document.createElement('h2')
            $(titulo).text(num + '° RODADA' );
        div.appendChild(titulo)

        divSec = document.createElement('div')
            $(divSec).attr('onclick','verificaRd(true)');
            $(divSec).html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/> </svg>');
        div.appendChild(divSec)

    $('#placar').html(div)


    $(rd).each(function(a,b){

        div = document.createElement('div')
        $(div).addClass('jogo')


        span = document.createElement('span')
        $(span).addClass('tempo')

        vfdt = new Date(b.data_realizacao).toLocaleDateString('pt-BR')
        console.log(b.data_realizacao)

        dt = '<b>'
        dt += vfdt != '31/12/1969' ? vfdt : ''
        dt += ' </b> '  + (b.sede != null ? b.sede.nome_popular : '')
        dt += '<b> ' + (b.data_realizacao != null ? b.data_realizacao.split('T')[1] : '') + ' </b>'

        $(span).html(dt)

        div.appendChild(span)


        //TIME2
        divSec = document.createElement('div')
        $(divSec).addClass('time')

        img = document.createElement('img')
        $(img).attr('src', b.equipes.visitante.escudo)
        divSec.appendChild(img)

        span = document.createElement('span')
        $(span).text(b.equipes.visitante.sigla)
        divSec.appendChild(span)

        div.appendChild(divSec)


        //PLACAR
        span = document.createElement('span')
        $(span).addClass('gols')

        spanSec = document.createElement('span')
        $(spanSec).text(b.placar_penaltis_mandante != null ? b.placar_penaltis_mandante : '')
        span.appendChild(spanSec)

        conteudo = document.createTextNode((b.placar_oficial_mandante != null ? b.placar_oficial_mandante : '') + " x ");
        span.appendChild(conteudo)

        conteudo = document.createTextNode(b.placar_oficial_visitante != null ? b.placar_oficial_visitante : '');
        span.appendChild(conteudo)

        spanSec = document.createElement('span')
        $(spanSec).text(b.placar_penaltis_visitante != null ? b.placar_penaltis_visitante : '')
        span.appendChild(spanSec)

        div.appendChild(span)


        //TIME1
        divSec = document.createElement('div')
        $(divSec).addClass('time')

        img = document.createElement('img')
        $(img).attr('src', b.equipes.mandante.escudo)
        divSec.appendChild(img)

        span = document.createElement('span')
        $(span).text(b.equipes.mandante.sigla)
        divSec.appendChild(span)

        div.appendChild(divSec)

        $('#placar').append(div)

    })
}

function populaTabela(cont){

    var div, span;

    $(cont).each(function(a,b) {

        span = document.createElement('span');
            $(span).addClass('dado');

        $(span).html(b);

        $('#tableTr').append(span)
    })
}

function cabecalhoTabelaDireita(){

    var span, conteudo, contLeng;

    contLeng = ['P', 'J', 'V',	'E', 'D', 'GP', 'GC', 'SG', '%', 'ÚLT.JOGOS'];

    $(contLeng).each(function(a,b) {

        span = document.createElement('span');
        $(span).addClass('header');

        conteudo = document.createTextNode(b);
        span.appendChild(conteudo);

        $('#tableTr').append(span)
    })
}

$(document).ready(function(){

    cabecalhoTabelaDireita();


    $(classificacao.classificacao).each(function(a,b){

        var conteudo = []
        var ultimosj = ''


        if(b.variacao == 0 ){ b.variacao = '<div class="emp"> ' + b.variacao + '<i class="fas fa-square"></i> </div>' }
        else if(b.variacao > 0){ b.variacao = '<div class="vit"> ' + b.variacao + '<i class="fas fa-arrow-up"></i> </div>'}else{b.variacao = '<div class="der"> ' + b.variacao.toString().substring(1) +  '<i class="fas fa-arrow-down"></i> </div>'}
        $('#tableTh').append('<div class="pos-time"> <p>' +b.ordem + '°</p>  ' + b.nome_popular + ' ' + b.variacao + '</div>')

        conteudo.push(b.pontos)
        conteudo.push(b.jogos)
        conteudo.push(b.vitorias)
        conteudo.push(b.empates)
        conteudo.push(b.derrotas)
        conteudo.push(b.gols_pro)
        conteudo.push(b.gols_contra)
        conteudo.push(b.saldo_gols)
        conteudo.push(b.aproveitamento)

        $(b.ultimos_jogos).each(function(y,z){
            switch (z){
                case 'v':
                    ultimosj += '<span class="ult vit"></span>'
                break;
                case 'd':
                    ultimosj += '<span class="ult der"></span>'
                break;
                case 'e':
                    ultimosj += '<span class="ult emp"></span>'
                break;
            }
        })
        conteudo.push(ultimosj)

        conteudo.push()

        populaTabela(conteudo)

    });

    Selectrd(listaJogos, classificacao.rodada.atual);


    $(listaJogos).each(function(a,b){

        var div, divSec, span, spanSec, img, conteudo, dt;

        div = document.createElement('div')
        $(div).addClass('jogo')


            span = document.createElement('span')
                $(span).addClass('tempo')

                dt = '<b>'
                dt += new Date(b.data_realizacao).toLocaleDateString('pt-BR')
                dt += ' </b> '  + b.sede.nome_popular
                dt += '<b> ' + b.data_realizacao.split('T')[1] + ' </b>'

                $(span).html(dt)

        div.appendChild(span)


        //TIME2
        divSec = document.createElement('div')
        $(divSec).addClass('time')

        img = document.createElement('img')
        $(img).attr('src', b.equipes.visitante.escudo)
        divSec.appendChild(img)

        span = document.createElement('span')
        $(span).text(b.equipes.visitante.sigla)
        divSec.appendChild(span)

        div.appendChild(divSec)


        //PLACAR
            span = document.createElement('span')
            $(span).addClass('gols')

                spanSec = document.createElement('span')
                    $(spanSec).text(b.placar_penaltis_mandante != null ? b.placar_penaltis_mandante : '')
                span.appendChild(spanSec)

                    conteudo = document.createTextNode((b.placar_oficial_mandante != null ? b.placar_oficial_mandante : '') + " x ");
                    span.appendChild(conteudo)

                    conteudo = document.createTextNode(b.placar_oficial_visitante != null ? b.placar_oficial_visitante : '');
                    span.appendChild(conteudo)

                spanSec = document.createElement('span')
                    $(spanSec).text(b.placar_penaltis_visitante != null ? b.placar_penaltis_visitante : '')
                span.appendChild(spanSec)

        div.appendChild(span)


        //TIME1
        divSec = document.createElement('div')
        $(divSec).addClass('time')

        img = document.createElement('img')
        $(img).attr('src', b.equipes.mandante.escudo)
        divSec.appendChild(img)

        span = document.createElement('span')
        $(span).text(b.equipes.mandante.sigla)
        divSec.appendChild(span)

        div.appendChild(divSec)

        if( $(".jogo").length < 11 ){
            document.getElementById('placar').insertBefore(div, null)
        }


    })

})
