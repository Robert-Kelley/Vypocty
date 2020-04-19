
//Vstupy
const brutto = document.getElementById("input-hruba");
const trinasty = document.getElementById("input-trinasty");
let podmienka13;
const nadcasy = document.getElementById("input-nadcasy");
const nocne = document.getElementById("input-nocne");
const soboty = document.getElementById("input-soboty");
const nedele = document.getElementById("input-nedele");
let riziko;
let sviatok;
let nad32r;

//document.querySelector('input[name="selectedChoice"]:checked').value; --pomocka

//Výstupy
const sum = document.getElementById("output-sum");

function calc() {

//PREMENNÉ v roku 2018 (1.5.)
const ZivotneMinimum = 199.48;
const MinimalnaMzda = 480;
const PriemernaMzda = 912; 	//-2r
const DanovyBonus = 21.56;
const NezdanitelnaCastZakladuDane = Math.round((19.2 * ZivotneMinimum)*100) / 100;
const OdvodovaOdpocitatelnaPolozka = 380.00;	//(strop 570)
const RocnyFondPracCasu = 2088; 		//aj sviatky
const MesacnyFondPracCasu = RocnyFondPracCasu/12;
const NocnaPracaHod = 0.82;
const NocnaPracaRiziko = 0.14;
const SobotaHodPriplatok = 0.69; 	//práca v sobotu hodinový príplatok
const NedelaHodPriplatok = 1.38;	//práca v nedelu hodinový príplatok
const HodBrutto = parseFloat(brutto.value)/MesacnyFondPracCasu;
const PracaNadcas = HodBrutto*0.25;
const PracaNadcasRiziko = HodBrutto*0.1;
const SviatkyMimoNedelu = 11;
const pohreb = 0.13;
const lekarskeOsetrenie = 3.5;
const sprevadzanieKLekarovi = 3.5; 	//2x2 dni rodic +1 den niekto iny za 40 rokov
const dovolenkaZaklad = 20;
const OdpocetZO13plat  = 64.40; //(do 500e)
const dovolenkaNad33r = 5;



//Výpočty

	//input-riziko
	let radios2 = document.getElementsByName('selectedChoice8');
	for (let i = 0; i < radios2.length; i++) {
		if (radios2[i].checked)
		{
			console.log(radios2[i].value);
			riziko = (radios2[i].value);
			break;
		}
	}

	//input-sviatok
	let radios3 = document.getElementsByName('selectedChoice9');
	for (let i = 0; i < radios3.length; i++) {
		if (radios3[i].checked)
		{
			console.log(radios3[i].value);
			sviatok = (radios3[i].value);
			break;
		}
	}

	//input-nad32r
	let radios4 = document.getElementsByName('selectedChoice10');
	for (let i = 0; i < radios4.length; i++) {
		if (radios4[i].checked)
		{
			console.log(radios4[i].value);
			nad32r = (radios4[i].value);
			break;
		}
	}




	let sumrfp= RocnyFondPracCasu - (pohreb * 8) - (lekarskeOsetrenie * 8) - (sprevadzanieKLekarovi * 8) - (8*dovolenkaZaklad+ nad32r*8*dovolenkaNad33r) - (SviatkyMimoNedelu*8) + (parseFloat(nadcasy.value)*12);
	let mvz = 7*PriemernaMzda;
	let nakladyNoc = parseFloat(nocne.value) * 0.82 + parseFloat(nocne.value) * riziko * 0.14;
	let nakladySob = parseFloat(soboty.value) * SobotaHodPriplatok;
	let nakladyNed = parseFloat(nedele.value) * NedelaHodPriplatok;
	let nakladyNadcas = (parseFloat(nadcasy.value) * PracaNadcas) + (riziko * PracaNadcasRiziko) * parseFloat(nadcasy.value) + (parseFloat(nadcasy.value) * HodBrutto);

	let priplatkybezsviatkov = nakladyNoc + nakladySob + nakladyNed + nakladyNadcas;
	let odhadPriemMzdy = parseFloat(brutto.value) + priplatkybezsviatkov;
	const sviatokHodPriplatok = odhadPriemMzdy/(MesacnyFondPracCasu+parseFloat(nadcasy.value));
	let nakladySviatok = sviatok*sviatokHodPriplatok*4;		//práca vo sviatok hodinový príplatok
	let priplatkySpolu = priplatkybezsviatkov + nakladySviatok;
	let hmpn = parseFloat(brutto.value) + priplatkySpolu;	//Hrubá mzda s príplatkami a nadcasmi v EUR = hmpn

console.log("hmpn: " + hmpn);
console.log("pohreb * 8: " + pohreb * 8);
console.log("lekarskeOsetrenie * 8: " +lekarskeOsetrenie * 8);
console.log("8*dovolenkaZaklad- nad32r*8*dovolenkaNad33r: "+ (8*dovolenkaZaklad- nad32r*8*dovolenkaNad33r));
console.log("SviatkyMimoNedelu*8: "+SviatkyMimoNedelu*8);
console.log("nakladyNadcas: " +nakladyNadcas);
console.log("sumrfp: "+sumrfp);


//odvody realna mzda

	function  getOdvodyRM() {

let cond;
let surrogate = (hmpn > mvz) ? cond = mvz : cond = hmpn;
	let starobne = cond*0.14;
	let nemocenske = cond*0.014;
	let nezamestnanost = cond*0.01;
	let invalidne = cond*0.03;
	let garancne = cond*0.0025;
	let urazove = hmpn*0.008;
	let rezervnyfond = cond*0.0475;
	let zdravotne = hmpn*0.1;

	let odvodyVysledok= starobne+nemocenske+nezamestnanost+invalidne+urazove+garancne+rezervnyfond+zdravotne;

return odvodyVysledok;
}

	//let VOZr = starobne+nemocenske+nezamestnanost+invalidne+urazove+garancne+rezervnyfond+zdravotne;

	let VOZr = getOdvodyRM();

	let cenaPrace = hmpn+VOZr;
	let mzy = cenaPrace*12;


//vstup3
let radios1 = document.getElementsByName('selectedChoice3');
for (let i = 0; i < radios1.length; i++) {
	if (radios1[i].checked)
	{
		console.log(radios1[i].value);
		podmienka13 = (radios1[i].value);
		break;
	}
}

//odvody 13. plat
//let cond2= parseFloat(trinasty.value) > mvz;

function  getOdvody13() {

let cond2;
let surrogate2 = (parseFloat(trinasty.value) > mvz) ? cond2 = mvz : cond2 = parseFloat(trinasty.value);

	let sta=cond2*0.14;
	let nemo=cond2*0.014;
	let neza=cond2*0.01;
	let inva=cond2*0.03;
	let uraz=parseFloat(trinasty.value)*0.008;
	let gar=cond2*0.0025;
	let rez=cond2*0.0475;
	let zdr=parseFloat(trinasty.value)*0.1;

	let odvody13Vysledok = sta+nemo+neza+inva+uraz+gar+rez+zdr;

	return odvody13Vysledok;

}

let VOZ13= getOdvody13();

	let mzx = mzy + parseFloat(trinasty.value) + VOZ13 - podmienka13*OdpocetZO13plat;
	const VystupA = Math.round((mzx/sumrfp)*100) / 100;;
	console.log("VystupA: " + VystupA);
document.getElementById('VystupA').innerHTML = VystupA;


//let cond3= parseFloat(trinasty.value) > mvz;

function  getOdvodyZ() {

	let cond3;
let surrogate3 = (parseFloat(brutto.value) > mvz) ? cond3 = mvz : cond3 = parseFloat(brutto.value);

	let staZZ=cond3*0.14;
	let nemoZZ=cond3*0.014;
	let nezaZZ=cond3*0.01;
	let invaZZ=cond3*0.03;
	let urazZZ=parseFloat(brutto.value)*0.008;
	let garZZ=cond3*0.0025;
	let rezZZ=cond3*0.0475;
	let zdrZZ=parseFloat(brutto.value)*0.1;

	let odvodyZVysledok = staZZ+nemoZZ+nezaZZ+invaZZ+urazZZ+garZZ+rezZZ+zdrZZ;

	return odvodyZVysledok;

}



	function vystupBcalc() {
		const vozz = getOdvodyZ();
		const cenaPraceS13Platom = parseFloat(brutto.value)+vozz+(parseFloat(trinasty.value)/12);
		const vystupB = Math.round((cenaPraceS13Platom*12/RocnyFondPracCasu)*100) / 100;

		return vystupB;
	}

document.getElementById('VystupB').innerHTML = vystupBcalc();
}
