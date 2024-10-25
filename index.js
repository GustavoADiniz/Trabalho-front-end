$(document).ready(function () {
    $('#ddd-message').text("").hide();
    $('#state-name-span').hide();
    $('#company-city-span').hide();

    $('#ddd-value').on('input', function () {
        const value = $(this).val();
        $(this).removeClass('border-danger').addClass('border-success'); // Adiciona a borda de sucesso

        if (!value) {
            $('#ddd-message').text("").hide();
            $('#state-name-span').hide();
            $('#company-city-span').hide();
            $(this).removeClass('border-success border-danger');
        }
    });

    $('#ddd-form').on('submit', async function (event) {
        event.preventDefault();
        const ddd = $('#ddd-value').val().replace(/\D/g, ''); // Remove tudo que não é número

        const dddData = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`) // URL corrigida
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .catch(error => {
                $('#ddd-message').text("").hide();
                $('#ddd-value').removeClass('border-success').addClass('border-danger'); // Adiciona a borda de erro

                if (error.status === 404) {
                    Swal.fire({
                        title: "Erro",
                        text: "DDD não foi encontrado",
                        icon: "error"
                    });
                } else if (error.status === 400) {
                    Swal.fire({
                        title: "Erro",
                        text: "O DDD foi digitado de maneira incorreta",
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

        if (dddData) {
            $('#ddd-value').removeClass('border-danger').addClass('border-success'); // Adiciona a borda de sucesso

            $('#state-name-span').show();
            $('#state-name').text(dddData.state);

            $('#company-city-span').show();
            $('#company-city').text(dddData.cities.join(", "));
        }
    });
});
