<template>
  <div class="form">

    <div class="">
      <div ref="scrollTarget"/>
      <div class="flex-1">
        <header class="form-header flex justify-between items-center mb-6 md:mb-10">
          <img class="mr-6 md:mr-10" :src="logoImg" alt="Калькулятор накоплений">
          <h2 class="form-title">
            Калькулятор накоплений по Программе долгосрочных сбережений.
          </h2>
        </header>

        <div v-if="currentStep === 5" class="steps-counter mb-10 flex justify-start items-center">
          <img class="mr-3" :src="greenMarkerImg" alt="">
          Расчет произведен
        </div>
        <Form ref="feedbackForm" name="feedbackFrom" class="mb-10" v-slot="{ errors }">
          <div class="">
            <template v-if="!isCalculated">
              <div class="flex-grow mt-1 mb-6">
                <div class="mb-2 text-left">
                  <span class="font-bold">Пол</span>
                </div>
                <div class="flex justify-start items-center gap-x-3">
                  <input id="man" v-model="form.gender" type="radio" value="m">
                  <label for="man">Мужчина</label>
                  <input id="woman" v-model="form.gender" type="radio" value="w">
                  <label for="woman">Женщина</label>
                </div>
              </div>

              <div class="flex-grow mt-1 mb-5">
                <div class="grid grid-cols-12 gap-x-4">
                  <div class="col-span-12 md:col-span-12">
                    <p class="mt-3 mb-2 md:text-left leading-tight">
                      <label for="pds-form-income"><b>Ежемесячный доход</b></label>
                    </p>
                  </div>
                  <div class="col-span-12 md:col-span-12">
                    <Field
                        as="select"
                        id="pds-form-income"
                        v-model="form.income"
                        name="income"
                        label="Ежемесячный доход"
                        class="form-control block w-full"
                        required
                    >
                      <option value="0">
                        До 80 тыс. руб
                      </option>
                      <option value="1">
                        От 80 тыс. до 150 тыс. руб
                      </option>
                      <option value="2">
                        Более 150 тыс. руб
                      </option>
                    </Field>
                  </div>
                </div>
              </div>
              <div :key="form.age">
                <text-input
                    v-model="form.age"
                    name="Текущий возраст"
                    label="Текущий возраст (лет)"
                    placeholder="Текущий возраст (лет)"
                    wrapper-class="flex-grow mt-1 mb-2"
                    :min="18"
                    :max="85"
                />
              </div>

              <div class="range-selector mt-2 pt-1">
                <div class="range-selector-label range-selector-min text-secondary">
                  18 лет
                </div>
                <div class="range-selector-label range-selector-max text-secondary">
                  85 лет
                </div>
                <input
                    v-model="form.age"
                    type="range"
                    min="18"
                    max="85"
                    step="1"
                    class="range-selector-input"
                >
              </div>

              <div :key="form.accumulationPeriod">
                <text-input
                    v-model="form.accumulationPeriod"
                    wrapper-class="flex-grow mt-5"
                    name="Период накопления"
                    label="Период накопления (лет)"
                    placeholder="Период накопления (лет)"
                    :min="accumulationPeriodField.min"
                    :max="accumulationPeriodField.max"
                    :is-disabled="true"
                />
              </div>
              <div class="range-selector mt-2 pt-1">
                <div class="range-selector-label range-selector-min text-secondary">
                  {{ accumulationPeriodField.min }} лет
                </div>
                <div class="range-selector-label range-selector-max text-secondary">
                  {{ accumulationPeriodField.max }} лет
                </div>
                <input
                    v-model="form.accumulationPeriod"
                    type="range"
                    :min="accumulationPeriodField.min"
                    :max="accumulationPeriodField.max"
                    step="1"
                    class="range-selector-input"
                >
              </div>

              <div :key="form.period">
                <text-input
                    v-model="form.period"
                    wrapper-class="flex-grow mt-5"
                    name="Срок ежемесячных выплат"
                    label="Срок срочной выплаты (лет)"
                    placeholder="Введите количество лет"
                    :max="30"
                    :min="2"
                />
              </div>
              <div class="range-selector mt-2 pt-1">
                <div class="range-selector-label range-selector-min text-secondary">
                  2 года
                </div>
                <div class="range-selector-label range-selector-max text-secondary">
                  30 лет
                </div>
                <input
                    v-model="form.period"
                    type="range"
                    :min="2"
                    :max="30"
                    step="1"
                    class="range-selector-input"
                >
              </div>

              <text-input
                  v-model="form.sum"
                  name="Сумма взносов в месяц"
                  label="Сумма взносов в месяц (руб)"
                  placeholder="Введите сумму взноса в месяц (руб)"
                  :min="1000"
                  :max="1000000"
              />

              <text-input
                  v-model="form.sumAccount"
                  wrapper-class="flex-grow mt-5 mb-6"
                  name="Сумма со счёта ОПС"
                  label="Сумма пенсионных накоплений по ОПС (руб)"
                  placeholder="Введите сумму"
                  :max="5000000"
                  :min="0"
                  :is-required="false"
              />

              <div class="flex-grow mt-1 mb-4">
                <div class="flex justify-start items-center gap-x-3">
                  <input id="ops" v-model="form.ops" type="checkbox">
                  <label for="ops">Переводить свои пенсионные накопления из ОПС в ПДС</label>
                </div>
              </div>

              <div class="flex-grow mt-1 mb-6">
                <div class="flex justify-start items-center gap-x-3">
                  <input id="tax" v-model="form.taxDeduction" type="checkbox">
                  <label for="tax">Перечислять полученный налоговый вычет в программу</label>
                </div>
              </div>

              <button :disabled="Object.keys(errors).length" class="right-btn" @click.prevent="calculate">
                Рассчитать
              </button>
            </template>
            <template v-if="isCalculated">
              <div class="pb-5">
                <Result
                    ref="calculationResult"
                    :show-disclaimer="false"
                    :data="result"
                />
                <div class="text-left text-sm italic">
                  Точные параметры можно просчитать только в НПФ при заключении договора
                </div>
              </div>
              <div class="flex justify-between gap-2 pb-6">
                <button class="right-btn" @click.prevent="getData">
                  Распечатать сейчас (pdf)
                </button>
                <button class="transparent-btn" @click.prevent="editForm">
                  Изменить параметры расчета
                </button>
              </div>
              <div for="name" class="mb-2 text-left">
                <span class="font-bold">Отправить мне на электронную почту</span>
              </div>
              <Field
                  id="email"
                  name="email"
                  v-model="sendingData.email"
                  type="input"
                  placeholder="Email"
                  class="text-input block w-full"
                  :rules="{
                    email: true,
                  }"
              />
              <ErrorMessage
                  name="email"
                  v-slot="{ message }"
              >
                <p class="text-left text-red-500 text-xs italic mt-1">
                  {{ message }}
                </p>
              </ErrorMessage>
              <button
                  :disabled="!sendingData.email || Object.keys(errors).length"
                  class="right-btn flex justify-center p-1 mt-4"
                  @click.prevent="sendDocument"
              >
                <template v-if="loading && preloaderHTML">
                  <div v-html="preloaderHTML"/>
                </template>
                Отправить
              </button>
              <div class="mt-10 text-left text-sm text-gray-500 mb-5">
                Не является офертой и не гарантирует доходность в будущем. Ожидаемая доходность в размере 8% годовых.
                Расчеты
                срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат.
                Расчеты
                пожизненных периодических выплат и единовременной выплаты осуществляется исходя из
                выбранного при
                расчете пола и возраста начала получения выплат.
                Расчет налогового вычета произведен с учетом изменений в Налоговом кодексе, которые вступили в силу в 2024 году
              </div>
            </template>
          </div>
        </Form>
      </div>
      <vue-html2pdf
          ref="html2Pdf"
          class="hidden"
          :show-layout="false"
          :float-layout="false"
          :preview-modal="false"
          :manual-pagination="true"
          :pdf-quality="2"
          pdf-content-width="690px"
      >
        <template v-slot:pdf-content>
          <div class="relative text-center">
            <div class="text-left pt-10">
              <img :src="calculatorResutImg" alt="Калькулятор" class="max-height-img">
            </div>
            <div class="pl-32">
              <Result
                  :data="result"
              />
            </div>
          </div>
        </template>
      </vue-html2pdf>
    </div>
  </div>

  <CustomModal v-model="modalState" />
</template>

<script>
import Swal from 'sweetalert2';
import TextInput from './SavingsCalculator/TextInput.vue';
import Result from './SavingsCalculator/Result.vue';
import VueHtml2pdf from '@/components/vue-html2pdf.vue';
import calculator from './calculator-prod.js';
import { configure, defineRule, ErrorMessage, Field, Form } from 'vee-validate';
import { email, integer, max, max_value, min, min_value, required } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';
import axios from 'axios';
import {useModal, CustomModal} from "@/components/CustomModal";

defineRule('required', required);
defineRule('integer', integer);
defineRule('email', email);
defineRule('min', min);
defineRule('min_value', min_value);
defineRule('max', max);
defineRule('max_value', max_value);
configure({
  generateMessage: localize({
    ru,
  }),
});
setLocale('ru');
export default {
  components: {
    ErrorMessage,
    Field,
    Form,
    TextInput,
    VueHtml2pdf,
    Result,
    CustomModal
  },
  props: {
    apiUrl: {
      type: String,
      default: 'https://app-dev.xn--80apaohbc3aw9e.xn--p1ai',
    },
  },
  setup() {
    const { state: modalState, openModal } = useModal();
    return {
      modalState, openModal
    }
  },
  data() {
    return {
      activeField: null,
      currentStep: 1,
      isCalculated: false,
      ROIOLD: 7,
      ROI: 0.07,
      calculator: {
        profit: 0.10,
        govermentMax: 36000,
        annuitete: [
          ['947,9556', '833,7736 '],
          ['939,7365', '825,7219 '],
          ['927,9333', '813,9443 '],
          ['916,1277', '802,1472 '],
          ['904,2922', '790,3472 '],
          ['892,4455', '778,5128 '],
          ['880,5791', '766,6758 '],
          ['868,7108', '754,8365 '],
          ['856,8149', '742,9871 '],
          ['844,9345', '731,1279 '],
          ['833,0441', '719,2812 '],
          ['821,1605', '707,4534 '],
          ['809,2834', '695,6370 '],
          ['797,4207', '683,8453 '],
          ['785,5719', '672,0911 '],
          ['773,7444', '660,3864 '],
          ['761,9375', '648,7229 '],
          ['750,1504', '637,1184 '],
          ['738,3826', '625,5707 '],
          ['726,6407', '614,0840 '],
          ['714,9020', '602,6497 '],
          ['703,1735', '591,2718 '],
          ['691,4616', '579,9480 '],
          ['679,7519', '568,6585 '],
          ['668,0646', '557,4188 '],
          ['656,3921', '546,2211 '],
          ['644,7336', '535,0744 '],
          ['633,1144', '523,9980 '],
          ['621,5202', '512,9834 '],
          ['609,9687', '502,0642 '],
          ['598,4518', '491,2363 '],
          ['586,9923', '480,5158 '],
          ['575,5817', '469,9079 '],
          ['564,2239', '459,4127 '],
          ['552,9278', '449,0396 '],
          ['541,6853', '438,7788 '],
          ['530,4993', '428,6439 '],
          ['519,3673', '418,6253 '],
          ['508,2867', '408,7223 '],
          ['497,2600', '398,9302 '],
          ['486,2745', '389,2402 '],
          ['475,3278', '379,6393 '],
          ['464,4225', '370,1154 '],
          ['453,5464', '360,6604 '],
          ['442,7069', '351,2629 '],
          ['431,8923', '341,9114 '],
          ['421,1093', '332,6140 '],
          ['410,3555', '323,3669 '],
          ['399,6369', '314,1773 '],
          ['388,9464', '305,0555 '],
          ['378,3017', '296,0076 '],
          ['367,6993', '287,0600 '],
          ['357,1432', '278,2110 '],
          ['346,6373', '269,4820 '],
          ['336,1884', '260,8774 '],
          ['325,8025', '252,4112 '],
          ['315,4850', '244,0907 '],
          ['305,2337', '235,9359 '],
          ['295,0629', '227,9515 '],
          ['284,9724', '220,1549 '],
          ['274,9648', '212,5524 '],
          ['265,0453', '205,1459 '],
          ['255,2180', '197,9328 '],
          ['245,4950', '190,9064 '],
          ['235,8785', '184,0614 '],
          ['226,3758', '177,3831 '],
          ['217,0007', '170,8630 '],
          ['207,7581', '164,4916 '],
          ['198,6571', '158,2655 '],
          ['189,7058', '152,1690 '],
          ['180,9046', '146,1924 '],
          ['172,2556', '140,3237 '],
          ['163,7677', '134,5567 '],
          ['155,4425', '128,8913 '],
          ['147,2902', '123,3377 '],
          ['139,3315', '117,9143 '],
          ['131,5874', '112,6532 '],
          ['124,0783', '107,5767 '],
          ['116,8298', '102,7023 '],
          ['109,8665', '98,0363 '],
          ['103,2013', '93,5776 '],
          ['96,8470', '89,4909 '],
          ['90,8166', '85,5030 '],
          ['85,1179', '81,6226 '],
          ['79,7550', '77,8290 '],
          ['74,7360', '74,1291 '],
          ['70,0628', '70,5036 '],
          ['65,7351', '66,9453 '],
          ['61,7627', '63,4450 '],
          ['57,8999', '59,9789 '],
          ['54,1294', '56,5362 '],
          ['50,4302', '53,0745 '],
          ['46,7742', '49,5663 '],
          ['43,1233', '45,9560 '],
          ['39,4144', '42,1784 '],
          ['35,5728', '38,1391 '],
          ['31,4633', '33,7003 '],
          ['26,9122', '28,6860 '],
          ['21,6068', '22,7866 '],
          ['15,0745', '15,5980 '],
          ['6,5000', '6,5000 '],
        ],
      },
      form: {
        gender: 'm',
        income: '1',
        age: '40',
        endAge: '55',
        accumulationPeriod: '15',
        sum: '10000',
        period: '10',
        sumAccount: '25000',
        ops: true,
        taxDeduction: true,
      },
      setYm: false,
      currentAge: 0,
      previousAge: 0,
      resultCalculations: {
        totalAmountOfSavings: 0,
        totalAmountOfSavingsPersonalPart: 0,
        totalAmountOfSavingsCoFinancing: 0,
        totalAmountOfSavingsTaxDeduction: 0,
        investmentProfit: 0,
        oneTimePaymentAtTheEnd: 0,
        totalAmountToPay: 0,
        toPayLifetime: 0,
        toPay10Years: 0,
        taxBenefit: 0,
      },
      sendingData: {
        username: null,
        email: null,
      },
      loading: false,
      rowNumber: null,
      ageEndField: {
        id: 'endAge',
        type: 'range',
        label: 'Ð’Ð¾Ð·Ñ€Ð°ÑÑ‚ Ð¾ÐºÐ¾Ð½Ñ‡Ð°Ð½Ð¸Ñ ÑƒÑ‡Ð°ÑÑ‚Ð¸Ñ Ð² Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð¼Ðµ',
        min: 55,
        max: 90,
        textLeft: '55 Ð»ÐµÑ‚',
        textRight: '90 Ð»ÐµÑ‚',
      },
      accumulationPeriodField: {
        id: 'accumulationPeriod',
        type: 'range',
        min: 15,
        max: 50,
        textLeft: '55 Ð»ÐµÑ‚',
        textRight: '90 Ð»ÐµÑ‚',
      },
      result: {},
    };
  },
  computed: {
    logoImg() {
      return (`src/assets/form-logo.svg`).replace('//', '/');
    },
    calculatorResutImg() {
      return (`src/assets/mf-calculator-result-04-2024.png`).replace('//', '/');
    },
    greenMarkerImg() {
      return (`/svg/mf-green-check-mark.svg`).replace('//', '/');
    },

    /**
     *
     *
     *
     *
     */
    preloaderHTML() {
      // return Themes.getThemePartial('button_preloader');
    },
  },
  watch: {
    'form': {
      handler(newValue, oldValue) {
        this.doCalculations();
      },
      deep: true,
    },
    'form.age': {
      handler(newValue, oldValue) {
        this.setYmEvent();
        if (parseInt(newValue) > 1000000) {
          this.form.age = 18;
          this.form.endAge = 33;
          return;
        }

        this.currentAge = parseInt(newValue);
        this.previousAge = parseInt(oldValue);
        this.calcAgeEndValue();
        this.calcAccumulationPeriodValue();

        this.form.accumulationPeriod = this.accumulationPeriodField.min;
      },
    },
    'form.income': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
    'form.gender': {
      handler(newValue, oldValue) {
        this.calcAgeEndValue();
        this.calcAccumulationPeriodValue();
        this.setYmEvent();

        this.form.accumulationPeriod = this.accumulationPeriodField.min;
      },
    },
    'form.endAge': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
    'form.sum': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
    'form.period': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
    'form.sumAccount': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
    'form.ops': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
    'form.taxDeduction': {
      handler(newValue, oldValue) {
        this.setYmEvent();
      },
    },
  },
  methods: {
    doCalculations() {
      const input = {};

      // (C8) Пол
      input.C8 = this.form.gender === 'm' ? 'Мужчина' : 'Женщина';

      // (C9) Возраст
      if (this.form.age && parseInt(this.form.age) > 0) {
        input.C9 = parseInt(this.form.age);
      } else {
        input.C9 = 18;
      }

      // (C10) Период накопления от 15 лет или до достижения возраста 55 лет для женщин или 60 лет для мужчин, лет
      if (this.form.accumulationPeriod && parseInt(this.form.accumulationPeriod) > 0) {
        input.C10 = parseInt(this.form.accumulationPeriod);
      } else {
        input.C10 = 15;
      }

      // (D12) Ваш официальный доход, руб.
      input.D12 = parseInt(this.form.income);

      // (C15) Сумма взносов в месяц, руб.
      if (this.form.sum && parseInt(this.form.sum) >= 0) {
        input.C15 = parseInt(this.form.sum);
      } else {
        input.C15 = 10000;
      }

      //
      // (D17) Переводить свои пенсионные накопления из ОПС в ПДС? 1 да, 0 нет
      input.D17 = this.form.ops ? 1 : 0;
      //
      // (C18)Сумма пенсионных накоплений по ОПС, руб.
      if (this.form.sumAccount && parseInt(this.form.sumAccount) >= 0) {
        input.C18 = parseInt(this.form.sumAccount);
      } else {
        input.C18 = 25000;
      }
      //
      // (D19) Перечислять полученный налоговый вычет в программу?
      input.D19 = this.form.taxDeduction ? 1 : 0;
      //
      // (C20)Срок срочной выплаты
      if (this.form.period && parseInt(this.form.period) > 0) {
        input.C20 = parseInt(this.form.period);
      } else {
        input.C20 = 10;
      }

      this.result = calculator(input, true);
    },
    setYmEvent() {
      if (!this.setYm) {
        this.setYm = true;
        if (typeof ym !== 'undefined') {
          ym(84939769, 'reachGoal', 'calculator_pds_start');
        }
      }
    },
    calcAccumulationPeriodValue() {
      let currentAge = this.currentAge;
      let minAge = 15;
      let maxAge = 50;
      if (this.form.age && parseInt(this.form.age) > 0) {
        maxAge = 90 - parseInt(this.form.age);
      }

      if (this.form.gender === 'm') {
        if (currentAge <= 45) {
          minAge = 15;
        } else if (currentAge > 45 && currentAge <= 59) {
          minAge = 60 - currentAge;
        } else if (currentAge > 59) {
          minAge = 1;
        }
      } else {
        if (currentAge <= 40) {
          minAge = 15;
        } else if (currentAge > 40 && currentAge <= 54) {
          minAge = 55 - currentAge;
        } else if (currentAge > 54) {
          minAge = 1;
        }
      }
      this.accumulationPeriodField['min'] = minAge;
      this.accumulationPeriodField['max'] = maxAge;

      // this.$set(this.accumulationPeriodField, 'min', minAge);
      // this.$set(this.accumulationPeriodField, 'max', maxAge);
    },
    calcAgeEndValue() {
      let t;
      let e;
      const
          n = this;
      this.form.gender === 'm'
          ? this.currentAge <= 45
              ? (t = this.currentAge + 15, e = 90)
              : this.currentAge > 45 && this.currentAge <= 55
                  ? (t = this.currentAge + 15, e = 90)
                  : this.currentAge > 55 && (t = this.currentAge + 15, e = 90)
          : this.form.gender === 'w' && (this.currentAge <= 40
          ? (t = this.currentAge + 15, e = 90)
          : this.currentAge > 40 && this.currentAge <= 50
              ? (t = this.currentAge + 15, e = 90)
              : this.currentAge > 50
              && (t = this.currentAge + 15, e = 90)), this.currentAge
      > this.previousAge
          ? (this.ageEndField['max'] = e, this.ageEndField['textRight'] =
              ''.concat(e, ' ').concat(this.getAgeEnding(e)), this.$nextTick(
              (() => {
                n.ageEndField['min'] = t, n.ageEndField['textLeft'] = ''.concat(t, ' ').
                    concat(n.getAgeEnding(t)), n.ageEndValue = t;

                this.form.endAge = t;
              }),
          ))
          : (this.ageEndField['min'] = t, this.ageEndField['textLeft'] =
              ''.concat(t, ' ').concat(this.getAgeEnding(t)), this.$nextTick(
              (() => {
                n.ageEndField['max'] = e, n.ageEndField['textRight'] = ''.concat(e, ' ').
                    concat(n.getAgeEnding(e)), n.ageEndValue = t;
              }),
          ));
    },
    async generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    calculate() {
      this.doCalculations();
      this.isCalculated = true;
      if (typeof ym !== 'undefined') {
        ym(84939769, 'reachGoal', 'calculator_pds_end');
      }
      setTimeout(() => {
        this.$refs.calculationResult.scrollToPayments();
      }, 50);
    },
    editForm() {
      if (typeof ym !== 'undefined') {
        ym(84939769, 'reachGoal', 'calculator_pds_change');
      }

      this.isCalculated = false;

      this.$refs.scrollTarget.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    },
    getData() {
      if (typeof ym !== 'undefined') {
        ym(84939769, 'reachGoal', 'pds_download_pdf');
      }
      this.generateReport();
    },
    async sendDocument() {
      if (typeof ym !== 'undefined') {
        ym(84939769, 'reachGoal', 'calculator_pds_send_email');
      }
      if (!this.isEditModeEnabled) {
        this.loading = true;

        const pdf = await this.$refs.html2Pdf.getPdfFile();
        const formData = new FormData();

        formData.append('method', 'sendMail');
        formData.append('certificate', new File([pdf], 'certificate'));
        formData.append('email', this.sendingData.email);
        formData.append('name', this.form.name);

        try {
          axios.post(`${this.apiUrl}/api/pds/send-mail/`, formData).then((response) => {
            this.loading = false;

            this.openModal({
              title: 'Готово',
              text: 'Ваш расчёт отправлен на почту'
            });
          });

          this.sendData('email', this.sendingData.email);
        } catch (error) {
          this.loading = false;

          this.openModal({
            title: 'Ошибка',
            text: 'Не удалось отправить расчёт'
          });

          console.error(error);
        }
      }
    },
    getAgeEnding(t) {
      let e = 'Ð»ÐµÑ‚';
      if ((t = Math.abs(t) % 100) > 10 && t < 20) return e;
      const n = t % 10;
      return n === 1
          ? e = 'Ð³Ð¾Ð´'
          : [2, 3, 4].includes(n) && (e = 'Ð³Ð¾Ð´Ð°'), e;
    },
    async sendData(action, email) {
      try {
        const response = await axios.post(this.apiUrl + '/api/calculator/log/', {
          action,
          formData: this.form,
          calculationResult: this.result,
          email,
        });
        if (response.data) {
          this.rowNumber = response.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 36rem;
  background-color: #fff;
  padding: 1.5rem 1.25rem;
  border-radius: 1rem;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.06));

  display: flex;
  flex-direction: column;

  @screen lg {
    padding: 2rem 4rem;
    height: auto;
    min-height: 46rem;
  }

  &-header {
    img {
      width: 4rem;
      height: auto;
      @screen lg {
        width: 5.5rem;
      }
    }
  }

  &-title {
    text-align: start;
    font-size: 1.5rem;
    line-height: 1.125;
    font-weight: 500;

    @screen md {
      font-size: 2rem;
    }
  }
}

.progress {
  height: 0.25rem;
  background-color: #D9D9D9;
  position: relative;

  &-finish {
    background-color: #5DB4BA;
  }
}

.chunk {
  height: 100%;
  width: 25%;
  background-color: #5DB4BA;
  position: absolute;
  top: 0;
}

.steps-counter {
  font-size: 1.2rem;
  font-weight: 500;
  text-align: start;
}

.right-btn {
  border: none;
  background-color: #31B7BC;
  border-radius: 0.4rem;
  color: #fff;
  padding: 0.8rem 2rem;
  cursor: pointer;
  margin-left: auto;

  &:disabled {
    color: #c2c2c2;
    background-color: #f0f4f8;
  }
}

.transparent-btn {
  border: 1px solid #31B7BC;
  color: #31B7BC;
  background-color: #fff;
  border-radius: 0.4rem;
  padding: 0.8rem 2rem;
  cursor: pointer;
}

.left-btn {
  border: none;
  color: #999999;
  padding: 0.8rem 2rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 1.8rem;
    height: 1.3rem;
    background-image: url('/svg/btn-double-arrows.svg');
    background-repeat: no-repeat;
    position: absolute;
    top: 1rem;
    left: 0;
  }
}

.result-title {
  max-width: 80%;
}

.pdf-field {
  position: absolute;
  font-size: 0.7rem;
  right: 10rem;
}

.pdf-field.user-field {
  //color: #888888;
}

.first-field {
  top: 10.2rem;
}

.second-field {
  top: 12.4rem;
}

.third-field {
  top: 14.6rem;
}

.fourth-field {
  top: 16.6rem;
}

.fiveth-field {
  top: 18.6rem;
}

.sixth-field {
  top: 20.7rem;
}

.seventh-field {
  top: 23.2rem;
}

.eighth-field {
  top: 26.1rem;
}

.nineth-field {
  top: 29.6rem;
}

.tenth-field {
  top: 31.8rem;
}

.eleventh-field {
  top: 33.6rem;
}

.twelveth-field {
  top: 35.5rem;
}

.thirteenth-field { //
  top: 37.3rem;
}

.fourteenth-field {
  top: 39rem;
}

.fifteenth-field {
  top: 41.4rem;
}

.sixteenth-field {
  top: 44.5rem;
}

.seventeenth-field {
  top: 46.8rem;
}

.eighteenth-field {
  top: 49.2rem;
}

.nineteenth-field {
  top: 51.8rem;
}

.twentieth-field {
  top: 53.6rem;
}

.twentieth-two-field {
  top: 53.6rem;
  right: 22.9rem;
}

.twentieth-one-field {
  top: 56.1rem;
}

.max-height-img {
  max-height: 1100px;
  margin-left: 130px;
}

.text-input {
  background-color: #F0F4F8;
  padding: 1.3rem 1rem;
  border-radius: 0.7rem;
  outline: none;

  &::placeholder {
    font-weight: 500;
    font-size: 0.85rem;
    color: #BEBEBE;
  }

  &:focus {
    border-color: #F0F4F8;
  }
}

.user-data-line {
  background-color: #eff4f8;
  border-radius: 6px;
  padding: 5px;
  margin: 0 -5px 1.25rem;
}



</style>
