$(document).ready(function() {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=100', 
        method: 'GET',
        success: function(response) {
            var pokemonData = response.results;

            var dataTableData = [];

            pokemonData.forEach(function(pokemon) {
                $.ajax({
                    url: pokemon.url,
                    method: 'GET',
                    async: false, 
                    success: function(details) {
                        var pokemonInfo = {
                            'id': details.id,
                            'name': pokemon.name,
                            'types': details.types.map(function(type) {
                                return type.type.name;
                            }).join(', '),
                            'abilities': details.abilities.map(function(ability) {
                                return ability.ability.name;
                            }).join(', '),
                            'height': details.height+" m.",
                            'weight': details.weight+" kg."
                        };
                        dataTableData.push(pokemonInfo);
                    },
                    error: function(error) {
                        console.error('Wystąpił błąd podczas pobierania szczegółowych danych dla pokemona:', error);
                    }
                });
            });

            $('#pokemonTable').DataTable({
                data: dataTableData,
                columns: [
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'types' },
                    { data: 'abilities' },
                    { data: 'height' },
                    { data: 'weight' }
                ],
                paging: true,
                pageLength: 10,
                lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, 'All'] ],
                searching: true,
                order: [[0, 'asc']],
                responsive: true
            });
        },
        error: function(error) {
            console.error('Wystąpił błąd podczas pobierania danych z API Pokemon:', error);
        }
    });
});
