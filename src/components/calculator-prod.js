export default function(input, debug = false) {
//---------------
// Исходные данные
//---------------

	// (C8) Пол
	// const C8 = 'Женщина';
	const C8 = input.C8;
	// Мужчина
	// Женщина

	// (C9) Возраст
	const C9 = input.C9;
	// (C10) Период накопления от 15 лет или до достижения возраста 55 лет для женщин или 60 лет для мужчин, лет
	const C10 = input.C10;

	// (D12) Ваш официальный доход, руб.
	const D12 = input.D12;
	// 1: До 80 000 руб.
	// 2: От 80 000 руб. до 150 000 руб.
	// 3: От 150 000 руб.

	// C13 Доступные клиенту варианты софинансирования исходя из выбранной заработной платы.
	let C13;

	// return;
	if (D12 == 1) {
		C13 = 'Государственное софинансирование осуществляется в течение 10 лет. \
    При выбранном доходе полагается доплата из расчёта 1:1. Для получения максимального софинансирования в размере 36 000 р. в год, вложите 36 000 р. (3 тыс. в мес.)';
	} else if (D12 == 2) {
		C13 = 'Государственное софинансирование осуществляется в течение 10 лет. \
    При выбранном доходе полагается доплата из расчёта 1:2. Для получения максимального софинансирования в размере 36 000 р. в год, вложите 72 000 р. (6 тыс. в мес.)';
	} else {
		C13 = 'Государственное софинансирование осуществляется в течение 10 лет. \
При выбранном доходе полагается доплата из расчёта 1:4. Для получения максимального софинансирования в размере 36 000 р. в год, вложите 144 000 р. (12 тыс. в мес.)';
	}

	//
	// (C15) Сумма взносов в месяц, руб.
	const C15 = input.C15;
	//
	// (D17) Переводить свои пенсионные накопления из ОПС в ПДС? 1 да, 0 нет
	const D17 = input.D17;
	//
	// (C18)Сумма пенсионных накоплений по ОПС, руб.
	const C18 = input.C18;
	//
	// (D19) Перечислять полученный налоговый вычет в программу?
	const D19 = input.D19;
	//
	// (C20)Срок срочной выплаты
	const C20 = input.C20;
	//
	//
	//
	// (C52) Продолжительность внесения взносов (по-умолчанию = периоду накопления для упрощения):
	const C52 = C10;
	//
	//
	//
	// //(C27) Период накоплений по умолчанию
	const C31 = C10;
	// (C39) Периодичность внесения второго и последующих взносов:
	const periodichnost_vnesenia_vtorogo_vznosov_text = 'Ежемесячно';
	// Ежемесячно
	// Ежеквартально
	// Раз в полгода
	// Ежегодно
	// (D39)
	let D39;
	switch (periodichnost_vnesenia_vtorogo_vznosov_text) {
		case 'Ежемесячно':
			D39 = 12;
			break;
		case 'Ежеквартально':
			D39 = 4;
			break;
		case 'Раз в полгода':
			D39 = 2;
			break;
		case 'Ежегодно':
			D39 = 1;
			break;
	}

	// (D51) Периодичность выплаты средств:
	const period_viplaty_sredstv = 1;
	// 1 Ежемесячно
	// 2 Ежеквартально
	// 3 Раз в полгода

	//---------
	// Константы
	//---------

	const max_period_uplaty_vznosov = 15;
	// (C30) Ожидаемая годовая доходность
	const C30 = 8; // В процентах
	// Предельный размер софинансирования от государства в год (статичное значение по закону)
	const G30 = 36000;
	// Таблица Аннуитет без заголовка. Индекс, Женщимы, Мужчины
	const anuitent_text = `0	948,0	833,77
1	939,7	825,72
2	927,9	813,94
3	916,1	802,15
4	904,3	790,35
5	892,4	778,51
6	880,6	766,68
7	868,7	754,84
8	856,8	742,99
9	844,9	731,13
10	833,0	719,28
11	821,2	707,45
12	809,3	695,64
13	797,4	683,85
14	785,6	672,09
15	773,7	660,39
16	761,9	648,72
17	750,2	637,12
18	738,4	625,57
19	726,6	614,08
20	714,9	602,65
21	703,2	591,27
22	691,5	579,95
23	679,8	568,66
24	668,1	557,42
25	656,4	546,22
26	644,7	535,07
27	633,1	524,00
28	621,5	512,98
29	610,0	502,06
30	598,5	491,24
31	587,0	480,52
32	575,6	469,91
33	564,2	459,41
34	552,9	449,04
35	541,7	438,78
36	530,5	428,64
37	519,4	418,63
38	508,3	408,72
39	497,3	398,93
40	486,3	389,24
41	475,3	379,64
42	464,4	370,12
43	453,5	360,66
44	442,7	351,26
45	431,9	341,91
46	421,1	332,61
47	410,4	323,37
48	399,6	314,18
49	388,9	305,06
50	378,3	296,01
51	367,7	287,06
52	357,1	278,21
53	346,6	269,48
54	336,2	260,88
55	325,8	252,41
56	315,5	244,09
57	305,2	235,94
58	295,1	227,95
59	285,0	220,15
60	275,0	212,55
61	265,0	205,15
62	255,2	197,93
63	245,5	190,91
64	235,9	184,06
65	226,4	177,38
66	217,0	170,86
67	207,8	164,49
68	198,7	158,27
69	189,7	152,17
70	180,9	146,19
71	172,3	140,32
72	163,8	134,56
73	155,4	128,89
74	147,3	123,34
75	139,3	117,91
76	131,6	112,65
77	124,1	107,58
78	116,8	102,70
79	109,9	98,04
80	103,2	93,58
81	96,8	89,49
82	90,8	85,50
83	85,1	81,62
84	79,8	77,83
85	74,7	74,13
86	70,1	70,50
87	65,7	66,95
88	61,8	63,45
89	57,9	59,98
90	54,1	56,54
91	50,4	53,07
92	46,8	49,57
93	43,1	45,96
94	39,4	42,18
95	35,6	38,14
96	31,5	33,70
97	26,9	28,69
98	21,6	22,79
99	15,1	15,60
100	6,5	6,50`;

	// Преобразуем текст в массив
	const anuitent_lines = anuitent_text.split('\n');
	const anuitent = {};

	for (const i in anuitent_lines) {
		const string = anuitent_lines[i];
		const word = string.replaceAll(',', '.').split('\t');
		anuitent[parseInt(word[0])] = [word[1], word[2]];
	}

	/// /////////////
	// Расчеты
	/// /////////////

	// Доступные клиенту варианты софинансирования исходя из выбранной заработной платы.
	const variant_sofinansirovaniya_text = [
		'Государственное софинансирование осуществляется в течение 10 лет.  При выбранном доходе полагается доплата из расчёта 1:1. Для получения максимального софинансирования в размере 36 000 р. в год, вложите 36 000 р. (3 тыс. в мес.)',
		'Государственное софинансирование осуществляется в течение 10 лет.  При выбранном доходе полагается доплата из расчёта 1:2. Для получения максимального софинансирования в размере 36 000 р. в год, вложите 72 000 р. (6 тыс. в мес.)',
		'Государственное софинансирование осуществляется в течение 10 лет.  При выбранном доходе полагается доплата из расчёта 1:4. Для получения максимального софинансирования в размере 36 000 р. в год, вложите 144 000 р. (12 тыс. в мес.)',
	];

	let variant_sofinansirovaniya;
	if (D12 == 1) {
		variant_sofinansirovaniya = variant_sofinansirovaniya_text[0];
	} else if (D12 == 2) {
		variant_sofinansirovaniya = variant_sofinansirovaniya_text[1];
	} else {
		variant_sofinansirovaniya = variant_sofinansirovaniya_text[2];
	}

	// Возраст окончания участия
	const G9 = C9 + C10;

	// (C40) Кол-во периодических взносов за весь период уплаты взносов
	let C40;
	if (C52 < C31) {
		C40 = C52 * D39;
	} else {
		C40 = C52 * D39;
	}

	// (G13) Ваши личные взносы
	const G13 = C15 * C40;

	// (C33) Период накопления минимальный, лет

	let temp_let;

	if (C8 == 'Мужчина' && C9 >= 59) {
		temp_let = 1;
	} else if (C8 == 'Женщина' && C9 >= 54) {
		temp_let = 1;
	} else if (C8 == 'Мужчина') {
		temp_let = 60 - C9;
	} else {
		temp_let = 60 - C9 - 5;
	}

	const C33 = Math.min(15, temp_let);

	// (G62) Ставка в 1-й год поступления софинансирования на счёт
	const G62 = (1 + C30 / 100) ** (1 / 2) - 1;

	// Итого общая сумма софинансирования
	// (G14) Софинансирование от государства
	let G14 = 0;
	// (G73) Результат инвестирования с 1 по 10-й потока средств софинансирования
	let G73 = 0;
	for (let god = 0; god < Math.min(C31, 10); god++) {
		let G32, G33;
		// (G31) Сумма личных сберегательных взносов в 1-й год участия в ПДС
		const G31 = C15 * D39;

		if (G31 < 2000) {
			G32 = 0;
		} else if (D12 == 1) {
			G32 = G31 / 1;
		} else if (D12 == 2) {
			G32 = G31 / 2;
		} else {
			G32 = G31 / 4;
		}

		if (G32 > G30) {
			G33 = G30;
		} else {
			G33 = G32;
		}
		G14 += G33;

		let rez_invest;
		if (C30 == 0) {
			rez_invest = G33;
		} else {
			rez_invest = G33 * (1 + G62) * (1 + C30 / 100) ** (C31 - god - 1);
		}

		G73 += rez_invest;
	}

	// (G10) Итоговая сумма накоплений в Программе
	let J35;

	if (D17) {
		J35 = C18;
	} else {
		J35 = 0;
	}

	// (C43) Ставка за период
	const C43 = (1 + C30 / 100) ** (1 / (D39 == 0 ? 1 : D39)) - 1;
	// let C43=(1+C30/100)**(1/(1 if D39==0 else D39))-1;

	// (C45) Накопления при периодических взносах на дату последнего взноса
	let C45;
	if (C33 == 0) {
		C45 = G13;
	} else {
		C45 = C15 * ((1 + C43) ** C40 - 1) / C43;
	}

	C45 *= (1 + C43);

	// (C46) +Чистое инвестирование, с момента окончания внесения взносов до выхода из ПДС
	const C46 = C45 * (1 + C30 / 100) ** (C31 - C52);

	// (J33) НВ со взносов 1-го и последующих лет, в год

	let J33;
	if (C31 <= 1) {
		J33 = 0;
	} else if ((C15 * D39) <= 400000) {
		J33 = (C15 * D39) * 13 / 100;
	} else {
		J33 = 52000;
	}

	// (J30) Maксимальный период получения НВ, лет !!!СТРАННАЯ ПРОВЕРКА В КОНЦЕ УСЛОВИЯ

	let J30;

	if (C31 <= 1) {
		J30 = 0;
	} else if (C31 == C52) {
		J30 = C52;
	} else {
		J30 = C52;
	}

	// (J31) Ставка в 1-й год поступления НВ на счёт
	J35 = (1 + C30 / 100) ** (1 / 2) - 1;

	// (J35) Сумма всех НВ и их инвестирования за период уплаты взносов= период получения НВ

	if (D19) {
		J35 = J33 * ((1 + J35) ** J30 - 1) / J35 * (1 + J35);
	} else {
		J35 = 0;
	}

	// (J36) Результат инвестирования НВ по окончанию уплаты взносов до момента назначения выплат
	const J36 = J35 * (1 + C30 / 100) ** (C31 - C52);

	// (J39) Сумма ед. взноса за счёт средств ОПС

	let J39;

	if (D17 == 1) {
		J39 = C18;
	} else {
		J39 = 0;
	}

	// (J40) Maксимальный период инвестирования ОПС

	let J40;

	if (D17 == 0 || C31 <= 1) {
		J40 = 0;
	} else {
		J40 = C31 - 1;
	}

	// (J41) Ставка в 1-й год поступления ОПС на счёт
	const J41 = (1 + C30 / 100) ** (9 / 12) - 1;

	// (J42) Результат инвестирования средств ОПС
	const J42 = J39 * (1 + J41) * (1 + C30 / 100) ** (J40 - 1);

	// (G12) Перевод пенсионных накоплений из ОПС
	const G12 = J39;
	//
	// (G10) Итоговая сумма накоплений в Программе
	let G10;
	if (C31 == 0) {
		G10 = G13 + G14 + G12;
	} else if (D19) {
		G10 = C46 + G73 + J36 + J42;
	} else {
		G10 = C46 + G73 + J42;
	}

	// (G17) Налоговый вычет
	const G17 = J33 * J30;

	// (G15) Инвестиционный доход
	let G15;

	if (D19) {
		G15 = G10 - G13 - G14 - G12 - G17;
	} else {
		G15 = G10 - G13 - G14 - G12;
	}

	// (C38) Аннуитет (срочн) - ежемес, ежекварт, полугодовые

	let C38;
	switch (period_viplaty_sredstv) {
		case 1:
			C38 = C20 * 12 / 1;
			break;
		case 2:
			C38 = C20 * 12 / 3;
			break;
		case 3:
			C38 = C20 * 12 / 6;
			break;
	}

	// (G20) Единовременная
	const G20 = G10;

	// (C44) Срочная выплата
	const G21 = G10 / C38;

	// (C37)Аннуитет (пожизн) - ежемесячные

	let C37;
	console.log(G9)
	if (C8 == 'Мужчина') {
		if (typeof anuitent[G9] === 'undefined') {
			C37 = anuitent[100][1];
		} else {
			C37 = anuitent[G9][1];
		}
	} else {
		if (typeof anuitent[G9] === 'undefined') {
			C37 = anuitent[100][0];
		} else {
			C37 = anuitent[G9][0];
		}
	}

	// ( ) Пожизненная ежемесячная выплата
	let G22;
	switch (period_viplaty_sredstv) {
		case 1:
			G22 = G10 / C37 * 1;
			break;
		case 2:
			G22 = G10 / C37 * 3;
			break;
		case 3:
			G22 = G10 / C37 * 6;
			break;
	}

	/// /////////////////////////////////
	// Вывод результатов
	/// /////////////////////////////////

	if (debug) {
		console.log('ИСХОДНЫЕ ДАННЫЕ');
		console.log('----------------------------------------');
		console.log('Пол: ', C8);
		console.log('Возраст: ', C9);
		console.log('Период накопления: ', C10);
		console.log('Ваш официальный доход, руб.: ', D12);
		console.log(C13);

		console.log('Сумма взносов в месяц, руб.: ', C15);
		console.log('Переводить свои пенсионные накопления из ОПС в ПДС?: ', D17);
		console.log('Сумма пенсионных накоплений по ОПС, руб.: ', C18);
		console.log('Перечислять полученный налоговый вычет в программу? ', D19);
		console.log('Срок срочной выплаты ', C20);
		console.log();
		console.log('----------------------------------------');
		console.log('РЕЗУЛЬТАТ РАСЧЕТА');
		console.log('----------------------------------------');
		console.log('Возраст окончания участия: ', G9);
		console.log('Итоговая сумма накоплений в Программе: ', G10);
		console.log('Перевод пенсионных накоплений из ОПС: ', G12);
		console.log('Ваши личные взносы: ', G13);
		console.log('Софинансирование от государства: ', G14);
		console.log('Инвестиционный доход: ', G15);
		console.log('Налоговый вычет: ', G17);
		console.log('Ежемесячный размер выплат, получаемый вами в течение ', C20, ' лет: ');
		console.log('Единовременная: ', G20);
		console.log('Срочная: ', G21);
		console.log('Пожизненная ежемесячная выплата: ', G22);
	}

	return {
		C10,
		C20,
		G9,
		G10,
		G12,
		G13,
		G14,
		G15,
		G17,
		G20,
		G21,
		G22,
	};
}