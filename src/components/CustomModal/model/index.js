import {reactive, ref} from "vue";

export const useModal = () => {
	const state = reactive({
		isOpen: false,
		title: '',
		text: ''
	})
	const openModal = ({title, text}) => {
		if (state.isOpen) return;

		state.title = title;
		state.text = text;
		state.isOpen = true;
		document.body.style.overflow = 'hidden';
	};
	const closeModal = () => {
		if (!state.isOpen) return;
		state.isOpen = false;
		state.title = '';
		state.text = '';
		document.body.style.removeProperty('overflow');
	}

	return {
		state,
		openModal,
		closeModal
	}
}