<template>
  <!--	<ValidationProvider-->
  <!--		v-slot="{ errors }"-->
  <!--		:name="name"-->
  <!--		:rules="`${isRequired ? 'required' : ''}|${isInteger && 'integer'}`"-->
  <!--		tag="div"-->
  <!--		:class="wrapperClass"-->
  <!--	>-->
  <div for="question" class="mb-2 text-left">
    <a v-if="link" class="font-bold" target="_blank" :href="link">{{ label }}</a>
    <span v-else class="font-bold">{{ label }}</span>
  </div>
  <p v-if="description" class="text-gray-500 text-xs italic mt-1 text-left mb-2">
    {{ description }}
  </p>
  <Field
      :type="`${isInteger ? 'number' : 'input'}`"
      :name="name"
      class="text-input block w-full"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      :rules="{
        required: isRequired,
        integer: isInteger,
        max_value: parseInt(max),
        min_value: min,
      }"
      @input="$emit('update:modelValue',$event.target.value)"
  />
  <ErrorMessage
      :name="name"
      v-slot="{ message }"
  >
    		<p class="text-left text-red-500 text-xs italic mt-1">
    			{{ message }}
    		</p>
  </ErrorMessage>
</template>

<script>
import { ErrorMessage, Field } from 'vee-validate';

export default {
  components: { ErrorMessage, Field },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    wrapperClass: {
      type: String,
      default: 'flex-grow mt-1 mb-6',
    },
    link: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    isInteger: {
      type: Boolean,
      default: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 9999999999,
    },
    description: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.text-input {
  background-color: #F0F4F8;
  padding: 1.3rem 1rem;
  border-radius: 0.7rem;
  outline: none;
  border: none;
  --tw-ring-color: #F0F4F8;

  &::placeholder {
    font-weight: 500;
    font-size: 0.85rem;
    color: #BEBEBE;
  }

  &:focus {
    border-color: #F0F4F8;
    --tw-ring-color: #F0F4F8;
  }
}

input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
</style>
