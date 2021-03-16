$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 
    $("#tabla").hide();
    $("#boton").click(function() {
        var summname = $('#Summname').val();
        var region = $('#Region').val();

        $.post("Backend/getData.php", "Summname="+summname+"&Region="+region, function(data){	
            console.log(data);
            try{
                var info = JSON.parse(data);
            } catch(e){
                alert(data);
                return;
            }
            var mayor1 = 0;
            var mayor1Id = null;
            for(i=0; i<=4; i++){
                if(info.Participantes[i].Puntaje > mayor1){
                    mayor1 = info.Participantes[i].Puntaje;
                    mayor1Id = i;
                }
            }

            var mayor2 = 0;
            var mayor2Id = null;
            for(i=5; i<=9; i++){
                if(info.Participantes[i].Puntaje > mayor2){
                    mayor2 = info.Participantes[i].Puntaje;
                    mayor2Id = i;
                }
            }

            $('#Z' + mayor1Id).attr("class", "table-danger");

            $('#Z' + mayor2Id).attr("class", "table-danger");

            $('#modal-title').html("Partida actual de: " + summname);
            $('#A1').html(info.Region + " | " + info.Modo);
            
            $('#G2').html("Probabilidad de <br>victoria: " + Math.round(info.PorcentajeVictoria1) + "%");
            
            var profileIconID1 = info.Participantes[0].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A3').html(profileIcon);
            $('#A3').append("<br>" + info.Participantes[0].Nombre);
            $('#A3').append("<br>" + "Nivel: " + info.Participantes[0].Level);

            var summonerName1 = info.Participantes[0].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[0].SpellId1}" title="${info.Participantes[0].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[0].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[0].SpellId2}" title="${info.Participantes[0].SpellName2}"height="30" width="30"/>`);
            $('#B3').html(summ1);
            $('#B3').append(summ2);
            
            var r1 = info.Participantes[0].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[0].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C3').html(rune1);
            $('#C3').append(rune2);
            
            var champion = info.Participantes[0].Campeon;
            var champKey = info.Participantes[0].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D3').html(champ);

            var lvl = info.Participantes[0].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D3').append(mastery);
            
            $('#E3').html(info.Participantes[0].LigaYDiv);
            $('#F3').html(Math.round(info.Participantes[0].Winrate) + "%");
            $('#G3A').attr("title", "Jugar con: " + info.Participantes[0].Campeon);
            $('#G3A').attr("data-content", info.Participantes[0].TipsAliado);
            $('#H3A').attr("title", "Jugar contra: " + info.Participantes[0].Campeon);
            $('#H3A').attr("data-content", info.Participantes[0].TipsEnemigo);



            var profileIconID1 = info.Participantes[1].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A4').html(profileIcon);
            $('#A4').append("<br>" + info.Participantes[1].Nombre);
            $('#A4').append("<br>" + "Nivel: " + info.Participantes[1].Level);

            var summonerName1 = info.Participantes[1].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[1].SpellId1}" title="${info.Participantes[1].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[1].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[1].SpellId2}" title="${info.Participantes[1].SpellName2}"height="30" width="30"/>`);
            $('#B4').html(summ1);
            $('#B4').append(summ2);
            
            var r1 = info.Participantes[1].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/>`);

            var r2 = info.Participantes[1].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C4').html(rune1);
            $('#C4').append(rune2);
            
            var champion = info.Participantes[1].Campeon;
            var champKey = info.Participantes[1].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D4').html(champ);

            var lvl = info.Participantes[1].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D4').append(mastery);
            
            $('#E4').html(info.Participantes[1].LigaYDiv);
            $('#F4').html(Math.round(info.Participantes[1].Winrate) + "%");
            $('#G4A').attr("title", "Jugar con: " + info.Participantes[1].Campeon);
            $('#G4A').attr("data-content", info.Participantes[1].TipsAliado);
            $('#H4A').attr("title", "Jugar contra: " + info.Participantes[1].Campeon);
            $('#H4A').attr("data-content", info.Participantes[1].TipsEnemigo);



            var profileIconID1 = info.Participantes[2].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/><br>`);
            $('#A5').html(profileIcon);
            $('#A5').append("<br>" + info.Participantes[2].Nombre);
            $('#A5').append("<br>" + "Nivel: " + info.Participantes[2].Level);

            var summonerName1 = info.Participantes[2].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[2].SpellId1}" title="${info.Participantes[2].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[2].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[2].SpellId2}" title="${info.Participantes[2].SpellName2}"height="30" width="30"/>`);
            $('#B5').html(summ1);
            $('#B5').append(summ2);
            
            var r1 = info.Participantes[2].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[2].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C5').html(rune1);
            $('#C5').append(rune2);
            
            var champion = info.Participantes[2].Campeon;
            var champKey = info.Participantes[2].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D5').html(champ);

            var lvl = info.Participantes[2].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D5').append(mastery);
            
            $('#E5').html(info.Participantes[2].LigaYDiv);
            $('#F5').html(Math.round(info.Participantes[2].Winrate) + "%");
            $('#G5A').attr("title", "Jugar con: " + info.Participantes[2].Campeon);
            $('#G5A').attr("data-content", info.Participantes[2].TipsAliado);
            $('#H5A').attr("title", "Jugar contra: " + info.Participantes[2].Campeon);
            $('#H5A').attr("data-content", info.Participantes[2].TipsEnemigo);



            var profileIconID1 = info.Participantes[3].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A6').html(profileIcon);
            $('#A6').append("<br>" + info.Participantes[3].Nombre);
            $('#A6').append("<br>" + "Nivel: " + info.Participantes[3].Level);

            var summonerName1 = info.Participantes[3].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[3].SpellId1}" title="${info.Participantes[3].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[3].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[3].SpellId2}" title="${info.Participantes[3].SpellName2}"height="30" width="30"/>`);
            $('#B6').html(summ1);
            $('#B6').append(summ2);
            
            var r1 = info.Participantes[3].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[3].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C6').html(rune1);
            $('#C6').append(rune2);
            
            var champion = info.Participantes[3].Campeon;
            var champKey = info.Participantes[3].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D6').html(champ);

            var lvl = info.Participantes[3].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D6').append(mastery);
            
            $('#E6').html(info.Participantes[3].LigaYDiv);
            $('#F6').html(Math.round(info.Participantes[3].Winrate) + "%");
            $('#G6A').attr("title", "Jugar con: " + info.Participantes[3].Campeon);
            $('#G6A').attr("data-content", info.Participantes[3].TipsAliado);
            $('#H6A').attr("title", "Jugar contra: " + info.Participantes[3].Campeon);
            $('#H6A').attr("data-content", info.Participantes[3].TipsEnemigo);



            var profileIconID1 = info.Participantes[4].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A7').html(profileIcon);
            $('#A7').append("<br>" + info.Participantes[4].Nombre);
            $('#A7').append("<br>" + "Nivel: " + info.Participantes[4].Level);

            var summonerName1 = info.Participantes[4].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[4].SpellId1}" title="${info.Participantes[4].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[4].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[4].SpellId2}" title="${info.Participantes[4].SpellName2}"height="30" width="30"/>`);
            $('#B7').html(summ1);
            $('#B7').append(summ2);
            
            var r1 = info.Participantes[4].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[4].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C7').html(rune1);
            $('#C7').append(rune2);
            
            var champion = info.Participantes[4].Campeon;
            var champKey = info.Participantes[4].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D7').html(champ);

            var lvl = info.Participantes[4].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D7').append(mastery);
            
            $('#E7').html(info.Participantes[4].LigaYDiv);
            $('#F7').html(Math.round(info.Participantes[4].Winrate) + "%");
            $('#G7A').attr("title", "Jugar con: " + info.Participantes[4].Campeon);
            $('#G7A').attr("data-content", info.Participantes[4].TipsAliado);
            $('#H7A').attr("title", "Jugar contra: " + info.Participantes[4].Campeon);
            $('#H7A').attr("data-content", info.Participantes[4].TipsEnemigo);


            $('#G8').html("Probabilidad de <br>victoria: " + Math.round(info.PorcentajeVictoria2) + "%");
            

            var profileIconID1 = info.Participantes[5].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A9').html(profileIcon);
            $('#A9').append("<br>" + info.Participantes[5].Nombre);
            $('#A9').append("<br>" + "Nivel: " + info.Participantes[5].Level);

            var summonerName1 = info.Participantes[5].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[5].SpellId1}" title="${info.Participantes[5].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[5].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[5].SpellId2}" title="${info.Participantes[5].SpellName2}"height="30" width="30"/>`);
            $('#B9').html(summ1);
            $('#B9').append(summ2);
            
            var r1 = info.Participantes[5].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[5].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C9').html(rune1);
            $('#C9').append(rune2);
            
            var champion = info.Participantes[5].Campeon;
            var champKey = info.Participantes[5].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D9').html(champ);

            var lvl = info.Participantes[5].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D9').append(mastery);
            
            $('#E9').html(info.Participantes[5].LigaYDiv);
            $('#F9').html(Math.round(info.Participantes[5].Winrate) + "%");
            $('#G9A').attr("title", "Jugar con: " + info.Participantes[5].Campeon);
            $('#G9A').attr("data-content", info.Participantes[5].TipsAliado);
            $('#H9A').attr("title", "Jugar contra: " + info.Participantes[5].Campeon);
            $('#H9A').attr("data-content", info.Participantes[5].TipsEnemigo);



            var profileIconID1 = info.Participantes[6].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A10').html(profileIcon);
            $('#A10').append("<br>" + info.Participantes[6].Nombre);
            $('#A10').append("<br>" + "Nivel: " + info.Participantes[6].Level);

            var summonerName1 = info.Participantes[6].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[6].SpellId1}" title="${info.Participantes[6].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[6].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[6].SpellId2}" title="${info.Participantes[6].SpellName2}"height="30" width="30"/>`);
            $('#B10').html(summ1);
            $('#B10').append(summ2);
            
            var r1 = info.Participantes[6].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[6].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C10').html(rune1);
            $('#C10').append(rune2);
            
            var champion = info.Participantes[6].Campeon;
            var champKey = info.Participantes[6].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D10').html(champ);

            var lvl = info.Participantes[6].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D10').append(mastery);
            
            $('#E10').html(info.Participantes[6].LigaYDiv);
            $('#F10').html(Math.round(info.Participantes[6].Winrate) + "%");
            $('#G10A').attr("title", "Jugar con: " + info.Participantes[6].Campeon);
            $('#G10A').attr("data-content", info.Participantes[6].TipsAliado);
            $('#H10A').attr("title", "Jugar contra: " + info.Participantes[6].Campeon);
            $('#H10A').attr("data-content", info.Participantes[6].TipsEnemigo);



            var profileIconID1 = info.Participantes[7].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A11').html(profileIcon);
            $('#A11').append("<br>" + info.Participantes[7].Nombre);
            $('#A11').append("<br>" + "Nivel: " + info.Participantes[7].Level);

            var summonerName1 = info.Participantes[7].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[7].SpellId1}" title="${info.Participantes[7].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[7].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[7].SpellId2}" title="${info.Participantes[7].SpellName2}"height="30" width="30"/>`);
            $('#B11').html(summ1);
            $('#B11').append(summ2);
            
            var r1 = info.Participantes[7].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[7].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C11').html(rune1);
            $('#C11').append(rune2);
            
            var champion = info.Participantes[7].Campeon;
            var champKey = info.Participantes[7].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D11').html(champ);

            var lvl = info.Participantes[7].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D11').append(mastery);
            
            $('#E11').html(info.Participantes[7].LigaYDiv);
            $('#F11').html(Math.round(info.Participantes[7].Winrate) + "%");
            $('#G11A').attr("title", "Jugar con: " + info.Participantes[7].Campeon);
            $('#G11A').attr("data-content", info.Participantes[7].TipsAliado);
            $('#H11A').attr("title", "Jugar contra: " + info.Participantes[7].Campeon);
            $('#H11A').attr("data-content", info.Participantes[7].TipsEnemigo);



            var profileIconID1 = info.Participantes[8].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A12').html(profileIcon);
            $('#A12').append("<br>" + info.Participantes[8].Nombre);
            $('#A12').append("<br>" + "Nivel: " + info.Participantes[8].Level);

            var summonerName1 = info.Participantes[8].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[8].SpellId1}" title="${info.Participantes[8].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[8].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[8].SpellId2}" title="${info.Participantes[8].SpellName2}"height="30" width="30"/>`);
            $('#B12').html(summ1);
            $('#B12').append(summ2);
            
            var r1 = info.Participantes[8].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[8].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C12').html(rune1);
            $('#C12').append(rune2);
            
            var champion = info.Participantes[8].Campeon;
            var champKey = info.Participantes[8].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D12').html(champ);

            var lvl = info.Participantes[8].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D12').append(mastery);
            
            $('#E12').html(info.Participantes[8].LigaYDiv);
            $('#F12').html(Math.round(info.Participantes[8].Winrate) + "%");
            $('#G12A').attr("title", "Jugar con: " + info.Participantes[8].Campeon);
            $('#G12A').attr("data-content", info.Participantes[8].TipsAliado);
            $('#H12A').attr("title", "Jugar contra: " + info.Participantes[8].Campeon);
            $('#H12A').attr("data-content", info.Participantes[8].TipsEnemigo);



            var profileIconID1 = info.Participantes[9].IdIcono;
            var profileIcon = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/profileicon/${profileIconID1}.png" alt="Icono" height="30" width="30" align="center"/>`);
            $('#A13').html(profileIcon);
            $('#A13').append("<br>" + info.Participantes[9].Nombre);
            $('#A13').append("<br>" + "Nivel: " + info.Participantes[9].Level);

            var summonerName1 = info.Participantes[9].SpellId1;
            var summ1 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName1}.png" alt="${info.Participantes[9].SpellId1}" title="${info.Participantes[9].SpellName1}" height="30" width="30"/><br>`);
            var summonerName2 = info.Participantes[9].SpellId2;
            var summ2 = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/spell/${summonerName2}.png" alt="${info.Participantes[9].SpellId2}" title="${info.Participantes[9].SpellName2}"height="30" width="30"/>`);
            $('#B13').html(summ1);
            $('#B13').append(summ2);
            
            var r1 = info.Participantes[9].RunaClaveId;
            var rune1 = $(`<img src="Media/perk/${r1}.png" alt="summ2" height="30" width="30"/><br>`);

            var r2 = info.Participantes[9].RunaSecundariaId;
            var rune2 = $(`<img src="Media/perkStyle/${r2}.png" alt="summ2" height="30" width="30"/>`);
            $('#C13').html(rune1);
            $('#C13').append(rune2);
            
            var champion = info.Participantes[9].Campeon;
            var champKey = info.Participantes[9].KeyCampeon;
            var champ = $(`<img src="http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/${champKey}.png" alt="${champion}" title="${champion}" height="30" width="30"/>`);
            $('#D13').html(champ);

            var lvl = info.Participantes[9].NivelMaestria;
            var mastery = $(`<img src="Media/mastery/${lvl}.png" alt="0" title="Nivel ${lvl}" height="50" width="50"/>`);
            $('#D13').append(mastery);
            
            $('#E13').html(info.Participantes[9].LigaYDiv);
            $('#F13').html(Math.round(info.Participantes[9].Winrate) + "%");
            $('#G13A').attr("title", "Jugar con: " + info.Participantes[9].Campeon);
            $('#G13A').attr("data-content", info.Participantes[9].TipsAliado);
            $('#H13A').attr("title", "Jugar contra: " + info.Participantes[9].Campeon);
            $('#H13A').attr("data-content", info.Participantes[9].TipsEnemigo);

            $("#tabla").show();
            $("#MyModal").modal();	
        });
    });
});