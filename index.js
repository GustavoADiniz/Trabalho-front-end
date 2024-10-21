$(document).ready(function () {
    $('#cep-message').text("").hide();
    $('#company-name-span').hide();
    $('#company-city-span').hide();
    $('#company-place-span').hide();
    $('#company-zip-span').hide();

    $('#cep-value').on('input', function () {
        const value = $(this).val();

        $(this).removeClass('border-danger').addClass('border-success'); // Adiciona a borda de sucesso

        if (!value) {
            $('#cep-message').text("").hide();
            $('#company-name-span').hide();
            $('#company-city-span').hide();
            $('#company-place-span').hide();
            $('#company-zip-span').hide();
            $(this).removeClass('border-success border-danger');
        }
    });

    $('#cep-form').on('submit', async function (event) {
        event.preventDefault();

        const cep = $('#cep-value').val().replace(/\D/g, ''); // Remove tudo que não é número

        const cepData = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .catch(error => {
                // Limpa mensagens anteriores e define uma borda de erro
                $('#cep-message').text("").hide();
                $('#cep-value').removeClass('border-success').addClass('border-danger'); // Adiciona a borda de erro

                if (error.status === 404) {
                    Swal.fire({
                        title: "Erro",
                        text: "CEP não foi encontrado",
                        icon: "error"
                    });
                } else if (error.status === 400) {
                    Swal.fire({
                        title: "Erro",
                        text: "O CEP foi digitado de maneira incorreta",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Erro",
                        text: "Ocorreu algum erro desconhecido",
                        icon: "error"
                    });
                }
            });

        if (cepData) {
            $('#cep-value').removeClass('border-danger').addClass('border-success'); // Adiciona a borda de sucesso

            $('#company-name-span').show();
            $('#company-name').text(cepData.state);

            $('#company-city-span').show();
            $('#company-city').text(cepData.city);

            $('#company-place-span').show();
            $('#company-place').text(cepData.neighborhood);

            $('#company-zip-span').show();
            $('#company-zip').text(cepData.street);
        }
    });
});
