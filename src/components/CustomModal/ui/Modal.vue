<template>
  <transition name="modal">
    <div v-show="model.isOpen" class="modal-mask">
      <div class="modal-wrapper" @click.self="model.isOpen = false">
        <div class="modal-container">

          <div class="modal-title">
            {{ model.title || 'Заголовок по умолчанию' }}
          </div>

          <div class="modal-body">
            {{ model.text || 'Текст по умолчанию' }}
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="model.isOpen = false">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const model = defineModel({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  }
});
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 1rem;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.06));
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-title {
  text-align: start;
  font-size: 1.5rem;
  line-height: 1.125;
  font-weight: 500;

  @screen md {
    font-size: 2rem;
  }
}

.modal-body {
  margin: 20px 0;
}

.default-footer-container {
  display: flex;
  align-items: center;
}

.modal-default-button {
  border: none;
  background-color: #31B7BC;
  border-radius: 0.4rem;
  color: #fff;
  padding: 0.8rem 2rem;
  cursor: pointer;
  margin-left: auto;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-to .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>