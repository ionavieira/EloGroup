function habilitar() {
    if (document.getElementById("possui_rede").value == "Sim")
        document.getElementById('redeSocialCtn').style.display = 'block';
    else
        document.getElementById('redeSocialCtn').style.display = 'none';
}


function DoSubmit() {
    var redes_sociais = $("#form-contato input[name='redeSociais[]']");
    caixa_redeSocial = document.querySelector('.msg_redeSocial');
    var checkados = 0;
    redes_sociais.each(function () {
        if ($(this).is(':checked')) {
            checkados++;
        }
    });


    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8080/";

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            result.innerHTML = this.responseText;
        }
    }

    var data = JSON.stringify({ "nome": name.value, "telefone": email.value, "conheceu": conheceu.value, "possui_rede": possui_rede.value, "redesSociais": redes_sociais });

    xhr.send(data);

};

function validaCadastro() {

    var nome = document.getElementById('nome');
    var telefone = document.getElementById('telefone');
    var conheceu = document.getElementById('conheceu');
    var possui_rede = document.getElementById('possui_rede');
    var redeSocial = document.getElementById('redeSocial');
    var filtro = /^\d{4,5}\-?\d{4}$/g;
    var contErro = 0;


    /* Validação do campo nome */
    caixa_nome = document.querySelector('.msg-nome');
    if (nome.value.includes(' ')) {
        caixa_nome.style.display = 'none';
    } else {

        caixa_nome.innerHTML = "Favor preencher o Sobrenome";
        caixa_nome.style.display = 'block';
        contErro += 1;
    }

    /* Validação do telefone */
    caixa_telefone = document.querySelector('.msg-telefone');
    if (telefone.value == "") {
        caixa_telefone.innerHTML = "Favor preencher o Telefone";
        caixa_telefone.style.display = 'block';
        contErro += 1;
    } else if (filtro.test(telefone.value)) {
        caixa_telefone.style.display = 'none';
    } else {
        caixa_telefone.innerHTML = "Formato do telefone inválido";
        caixa_telefone.style.display = 'block';
        contErro += 1;
    }

    if (contErro > 0) {
        return false;
    }

    return true;


}