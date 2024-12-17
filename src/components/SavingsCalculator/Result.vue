<template>
	<div>
		<div class="result-top-box theme-light">
			<div class="flex justify-between items-center gap-x-3 mb-5">
				<div class="text-left result-title">
					Итоговая сумма накоплений в программе
				</div>
				<div class="ml-3 fs-3 text-primary">
					{{ formatNumberToCurrency(data.G10) }}
				</div>
			</div>
			<h2 class="text-left font-bold">Из чего состоит итоговая сумма?</h2>
			<div class="mt-5">
				<div class="flex justify-between items-center gap-x-3 mb-5">
					<div class="text-left result-title">
						Ваши личные взносы
					</div>
					<div class="ml-3">
						{{ formatNumberToCurrency(data.G13) }}
					</div>
				</div>
				<div class="flex justify-between items-center gap-x-3 mb-5">
					<div class="text-left result-title">
						Перевод пенсионных накоплений (ОПС)
					</div>
					<div class="ml-3">
						{{ formatNumberToCurrency(data.G12) }}
					</div>
				</div>
				<div class="flex justify-between items-center gap-x-3 mb-5">
					<div class="text-left result-title">
						Софинансирование от государства
					</div>
					<div class="ml-3">
						{{ formatNumberToCurrency(data.G14) }}
					</div>
				</div>
				<div class="flex justify-between items-center gap-x-3 mb-5">
					<div class="text-left result-title">
						Инвестиционный доход
					</div>
					<div class="ml-3">
						{{ formatNumberToCurrency(data.G15) }}
					</div>
				</div>
				<div class="flex justify-between items-center gap-x-3 mb-5">
					<div class="text-left result-title">
						Налоговый вычет
					</div>
					<div class="ml-3">
						{{ formatNumberToCurrency(data.G17) }}
					</div>
				</div>
				<div ref="scrollTarget2" />
			</div>
		</div>

		<h2 class="text-left font-bold">Вы сможете выбрать один из видов выплат в {{ data.G9 }} лет</h2>

		<div class="mt-5">
			<div class=" mb-5">
				<div class="flex justify-between items-center gap-x-3 mb-1">
					<div class="text-left result-title text-lg">
						Срочная
					</div>
					<div class="ml-3 text-lg text-primary">
						{{ formatNumberToCurrency(data.G21) }}
					</div>
				</div>
				<div class="text-left text-sm">
					Ежемесячный размер выплат, получаемый Вами в течение {{ data.C20 }} {{ data.C20 == 1 ? 'года' : 'лет' }}
				</div>
			</div>
			<div class="mb-5">
				<div class="flex justify-between items-center gap-x-3 mb-1">
					<div class="text-left result-title text-lg">
						Единовременная
					</div>
					<div class="ml-3 text-lg text-primary">
						{{ formatNumberToCurrency(data.G20) }}
					</div>
				</div>
				<div v-if="data.C10 < 15" class="text-left text-sm">
					Выплачивается в случае, если рассчитанная пожизненная пенсия составит менее 10% прожиточного минимума пенсионера РФ
				</div>
			</div>
			<div class="mb-5">
				<div class="flex justify-between items-center gap-x-3 mb-1">
					<div class="text-left result-title text-lg">
						Пожизненная
					</div>
					<div class="ml-3 text-lg text-primary">
						{{ formatNumberToCurrency(data.G22) }}
					</div>
				</div>
				<div class="text-left text-sm">
					Ежемесячный размер выплат, получаемый Вами в течение всей жизни после назначения выплаты
				</div>
			</div>
		</div>
		<template v-if="showDisclaimer">
			<div class="mt-8 text-left text-sm text-gray-500">
				Не является офертой и не гарантирует доходность в будущем. Ожидаемая доходность в размере 8% годовых. Расчеты
				срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат. Расчеты
				пожизненных периодических выплат и единовременной выплаты осуществляется осуществляются исходя из выбранного при
				расчете пола и возраста начала получения выплат.
				Расчет налогового вычета произведен с учетом изменений в Налоговом кодексе, которые вступили в силу в 2024 году
				<br>
				<p>&nbsp;</p>
			</div>
		</template>

	</div>
</template>

<script>
export default {
	props: {
		data: {},
		showDisclaimer: {
			default: true,
		},
	},
	methods: {
		scrollToPayments() {
			this.$refs.scrollTarget2.scrollIntoView({
				block: 'start',
				behavior: 'smooth',
			});
		},
		formatNumberToCurrency(t) {
			const e = arguments.length > 1 && void 0 !== arguments[1]
				? arguments[1]
				: 'ru-RU';
			const
				n = arguments.length > 2 && void 0 !== arguments[2]
					? arguments[2]
					: 'RUB';
			return new Intl.NumberFormat(e, {
				style: 'currency',
				currency: n,
				useGrouping: !0,
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			}).format(t);
		},
	},
};
</script>

<style lang="scss" scoped>
	.result-top-box {
		margin: 0 -1.25rem 2rem;
		padding: 1.5rem 1.25rem 0.5rem;

		@screen lg {
			margin: 0 -4rem 2rem;
			padding: 1.5rem 4rem 0.5rem;
		}
	}
  .text-primary {
    color: #31b7bc;
  }
</style>
