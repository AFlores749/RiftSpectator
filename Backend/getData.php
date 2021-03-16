<?php
/* RiftSpectator

Limites:

20 requests every 1 seconds
100 requests every 2 minutes

*/

// Constantes
set_time_limit(0);
$Region = "";
$Reg = "";
$headers = [
	'Accept-Charset: application/json; charset=UTF-8',
    'X-Riot-Token: RGAPI-9d6de831-f89e-4ab3-8c6e-38aeabba1d90',
	'Accept-Language: es-419,es;q=0.8'
];

// Funcion que valida la entrada del metodo POST
function validate($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

// Funcion que recibe el metodo POST del HTML
if($_SERVER["REQUEST_METHOD"] == "POST") {

    $Summname = validate($_POST['Summname']);
    if (!preg_match("^[0-9\\p{L} _\\.]+$^",$Summname)) {
	    $summErr = "El Nombre de Invocador es invalido";
	    exit(0);
	}

    $RegId = validate($_POST['Region']);
    

    switch ($RegId) {
    	case '1':
    		$Reg = "Brazil";
    		$Region = "br1";
    		break;
    	case '2':
    		$Reg = "EU Nórdica & Este";
        	$Region = "eun1";
    		break;
    	case '3':
    		$Reg = "EU Oeste";
        	$Region = "euw1";
    		break;
    	case '4':
    		$Reg = "Japón";
        	$Region = "jp1";
    		break;
    	case '5':
    		$Reg = "República de Corea";
        	$Region = "kr";
    		break;
    	case '6':
    		$Reg = "Latinoamerica Norte";
        	$Region = "la1";
    		break;
    	case '7':
    		$Reg = "Latinoamerica Sur";
        	$Region = "la2";
    		break;
    	case '8':
    		$Reg = "Norteamérica";
        	$Region = "na1";
    		break;
    	case '9':
    		$Reg = "Oceanía";
        	$Region = "oc1";
    		break;
    	case '10':
    		$Reg = "Turquia";
        	$Region = "tr1";
    		break;
    	case '11':
    		$Reg = "Rusia";
        	$Region = "ru";
    		break;
    	default:
    		exit(0);
    		break;
    }

//	Creacion de la constante url
	$url = "https://" . $Region . ".api.riotgames.com/lol/";


// Creacion de las constantes SP y CP en base a archivos JSON
	$Spells = file_get_contents("Data/SP.json");
	$SP = json_decode($Spells, true);

	$Champions = file_get_contents("Data/CP.json");
	$CP = json_decode($Champions, true);			

// --------------------------------------------------------------------------------------------------
	
	// Inicio de las peticiones a los endpoints
    // 1.- Envia SummName y recibe SummID y AccID

	$endpoint = $url . "summoner/v3/summoners/by-name/" . $Summname;
	
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	$SummonerByName = curl_exec($ch);
	$SBN = json_decode($SummonerByName, true);
	
	if(array_key_exists("status", $SBN)){
		echo "Status code: " . $SBN["status"]["status_code"].", Message: ".$SBN["status"]["message"];
		exit(0);
	} else {
		$SummID = $SBN['id'];
	}
	curl_close ($ch);


	// 2.- Envia summId y recibe partida
	$endpoint = $url . "spectator/v3/active-games/by-summoner/" . $SummID;
	
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	$Game = curl_exec($ch);
	curl_close ($ch);

	$Part = json_decode($Game, true);

	if(array_key_exists("status", $Part)){
		echo "Status code: " . $Part["status"]["status_code"].", Message: ".$Part["status"]["message"];
		exit(0);
	} else {
		// Creamos el array que se enviará a index.html al finalizar
		$Partida = array();
		$Partida['Region'] = $Reg;
		switch ($Part["gameQueueConfigId"]) {
			case '400':
				$Partida['Modo'] = "Grieta del Invocador | 5v5 | Draft Pick";
				break;
			case '420':
				$Partida['Modo'] = "Grieta del Invocador | 5v5 | Ranked Solo";
				break;
			case '430':
				$Partida['Modo'] = "Grieta del Invocador | 5v5 | Blind Pick";
				break;
			case '440':
				$Partida['Modo'] = "Grieta del Invocador | 5v5 | Ranked Flex";
				break;
			case '450':
				$Partida['Modo'] = "Abismo de los Lamentos | 5v5 | ARAM";
				break;
			case '460':
				$Partida['Modo'] = "Bosque Retorcido | 3v3 | Blind Pick";
				break;
			case '470':
				$Partida['Modo'] = "Bosque Retorcido | 3v3 | Ranked Flex";
				break;			
			default:
				$Partida['Modo'] = "No definido";
				break;
		}
		$Partida['KeyEspectador'] = $Part["observers"]["encryptionKey"];
		// TiempOActual no da el tiempo correcto
		$Partida['TiempoActual'] = $Part["gameLength"]; 

		for ($i = 0; $i < 10; $i++) {
			$Liga=0;
			$Div=0;
			$LigaYDiv=0;

			// Sleep de 2 segundos para no llegar al limite de peticiones. [Rate limit]
			sleep(1);

			$Partida['Participantes'][$i]['Nombre'] = $Part["participants"][$i]["summonerName"];
			$Partida['Participantes'][$i]['IdIcono'] = $Part["participants"][$i]["profileIconId"];
			$Champ = $Part["participants"][$i]["championId"];
			$Partida['Participantes'][$i]['Campeon'] = $CP["data"][$Champ]["name"];
			$Partida['Participantes'][$i]['KeyCampeon'] = $CP["data"][$Champ]["key"];

			// Creacion de la Key Tips
			$Partida['Participantes'][$i]['TipsAliado'] = $CP["data"][$Champ]["allytips"];
			$Partida['Participantes'][$i]['TipsEnemigo'] = $CP["data"][$Champ]["enemytips"];


			$SP1 = $Part["participants"][$i]["spell1Id"];
			$SP2 = $Part["participants"][$i]["spell2Id"];


			// Creacion de la Key Spells
			$Partida['Participantes'][$i]['SpellId1'] = $SP["data"][$SP1]["key"];
			$Partida['Participantes'][$i]['SpellId2'] = $SP["data"][$SP2]["key"];


			$Partida['Participantes'][$i]['SpellName1'] = $SP["data"][$SP1]["name"];
			$Partida['Participantes'][$i]['SpellName2'] = $SP["data"][$SP2]["name"];


			$Partida['Participantes'][$i]['RunaClaveId'] = $Part["participants"][$i]["perks"]["perkIds"][0];
			$Partida['Participantes'][$i]['RunaSecundariaId'] = $Part["participants"][$i]["perks"]["perkSubStyle"];
						
			
			if(!empty($Part["bannedChampions"])){
				$BanChamp = $Part["bannedChampions"][$i]["championId"];
				$Partida['Participantes'][$i]['PersonajeBaneado'] = $CP["data"][$BanChamp]["name"];		
			}

			//3.- Envia summId y recibe summoner 1 vez por iteración.
			$endpoint = $url . "summoner/v3/summoners/" . $Part["participants"][$i]["summonerId"];
	
			$ch = curl_init();
		    curl_setopt($ch, CURLOPT_URL, $endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

			$SummonerByID = curl_exec($ch);
			$SBID = json_decode($SummonerByID, true);
			
			if(array_key_exists("status", $SBID)){
				echo "Status code: " . $SBN["status"]["status_code"].", Message: ".$SBN["status"]["message"];
				exit(0);
			} else {
				$Partida['Participantes'][$i]["Level"] = $SBID["summonerLevel"];
			}
			curl_close ($ch);

			
			// 4.- Envia summId, champId y recibe maestry 1 vez por iteracion.
			$endpoint = $url . "champion-mastery/v3/champion-masteries/by-summoner/". $Part["participants"][$i]["summonerId"] ."/by-champion/" . $Part["participants"][$i]["championId"];
			
			
			$ch = curl_init();
		    curl_setopt($ch, CURLOPT_URL, $endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

			$Maestry = curl_exec($ch);
			curl_close ($ch);

			$M = json_decode($Maestry, true);

			if(array_key_exists("status", $M)){
				echo "Status code: " . $M["status"]["status_code"].", Message: ".$M["status"]["message"];
							exit(0);
				}

			$Partida['Participantes'][$i]['NivelMaestria'] = $M["championLevel"];
//			$Partida['Participantes'][$i]['PuntosMaestria'] = $M["championPoints"];

			// 5.- Envia summId y recibe positions 1 vez por iteracion
			$endpoint = $url . "league/v3/positions/by-summoner/" . $Part["participants"][$i]["summonerId"];
	
			$ch = curl_init();
		    curl_setopt($ch, CURLOPT_URL, $endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

			$Positions = curl_exec($ch);
			curl_close ($ch);

			$Pos = json_decode($Positions, true);

			if(array_key_exists("status", $Pos)){
				echo "Status code: " . $Pos["status"]["status_code"].", Message: ".$Pos["status"]["message"];
				exit(0);
			}

//Debuggear desde aqui
			if(!empty($Pos)){
				$b = count($Pos);

				for($a = 0; $a < count($Pos); $a++){
				// Pregunta si tiene Rank en la queue RANKED_SOLO_5X5
					if($Pos[$a]["queueType"] = "RANKED_SOLO_5x5"){
						$Partida['Participantes'][$i]['LigaYDiv'] = $Pos[$a]["tier"] . " " . $Pos[$a]["rank"];
						$Partida['Participantes'][$i]['Winrate'] = ($Pos[$a]["wins"] / ($Pos[$a]["wins"] + $Pos[$a]["losses"]))*100;
						switch ($Pos[$a]["tier"]) {
							case 'BRONZE':
								$Liga = 15;
								$divisor = 0.1;
								break;
							case 'SILVER':
								$Liga = 30;
								$divisor = 0.2;
								break;
							case 'GOLD':
								$Liga = 45;
								$divisor = 0.4;;
								break;
							case 'PLATINUM':
								$Liga = 60;
								$divisor = 0.6;
								break;
							case 'DIAMOND':
								$Liga = 75;
								$divisor = 0.8;
								break;
							case 'MASTER':
								$Liga = 90;
								$divisor = 1;
								break;
							default:
								$Liga = 0;
								$divisor = 0.01;
								break;				
						}

						switch ($Pos[$a]["rank"]) {
							case 'V':
								$Div = 2;
								break;
							case 'IV':
								$Div = 4;
								break;
							case 'III':
								$Div = 6;
								break;
							case 'II':
								$Div = 8;
								break;
							case 'I':
								$Div = 10;
								break;
							default:
								$Div = 0;
								break;
						}
					} else {
						$Partida['Participantes'][$i]['LigaYDiv'] = "Unranked";
						$Partida['Participantes'][$i]['Winrate'] = 40;
						$Liga = 0;
						$Div = 0;
						$divisor = 0.01;
					}
				}

			} else {
				$Partida['Participantes'][$i]['LigaYDiv'] = "Unranked";
				$Partida['Participantes'][$i]['Winrate'] = 40;
				$Liga = 0;
				$Div = 0;
				$divisor = 0.01;
			}

			// Se realizan los calculos con respecto al porcentaje de victoria de todos los jugadores.
			$LvlMaestria = $Partida['Participantes'][$i]['NivelMaestria'];
			$PuntosMaestria = $M["championPoints"] / 10000;
			$LigaYDiv = $Liga + $Div;
			//$Partida['Participantes'][$i]['PuntajeLigaDiv'] = $LigaYDiv;
			$Winrate = $Partida['Participantes'][$i]['Winrate'] * $divisor;

/*			$Partida['Estadisticas'][$i]['lvlMaestria'] = $LvlMaestria;
			$Partida['Estadisticas'][$i]['PuntosMaestria'] = $PuntosMaestria;
			$Partida['Estadisticas'][$i]['LigaYDiv'] = $LigaYDiv;
			$Partida['Estadisticas'][$i]['winrate'] = $Winrate;
			$Partida['Estadisticas'][$i]['Puntaje'] =  $LvlMaestria + $PuntosMaestria + $LigaYDiv + $Winrate;
			*/
			$Partida['Participantes'][$i]['Puntaje'] = $LvlMaestria + $PuntosMaestria + $LigaYDiv + $Winrate;
		}

		$PuntajeEquipo1 = $Partida['Participantes'][0]['Puntaje'] + $Partida['Participantes'][1]['Puntaje'] + $Partida['Participantes'][2]['Puntaje'] + $Partida['Participantes'][3]['Puntaje'] + $Partida['Participantes'][4]['Puntaje'];

		$PuntajeEquipo2 = $Partida['Participantes'][5]['Puntaje'] + $Partida['Participantes'][6]['Puntaje'] + $Partida['Participantes'][7]['Puntaje'] + $Partida['Participantes'][8]['Puntaje'] + $Partida['Participantes'][9]['Puntaje'];

		$Partida['PorcentajeVictoria1'] = ($PuntajeEquipo1 / ($PuntajeEquipo1 + $PuntajeEquipo2)*100);
		$Partida['PorcentajeVictoria2'] = ($PuntajeEquipo2 / ($PuntajeEquipo1 + $PuntajeEquipo2)*100);


// Envio del objeto JSON a la petición AJAX de javascript
		echo json_encode($Partida, JSON_PRETTY_PRINT);
	}
}

?>