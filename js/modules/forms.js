import { closeModal, openModal } from "./modal"

function forms(formSelector, modalTimerId) {
	const form = document.querySelector(formSelector),
		telegramTokenBot = '8335061727:AAGf5o8QoZHSZl2rzgYwjRqb4pM6V_DkMLc',
		chatId = '8434481394'

	const message = {
		success: 'Thanks for contacting with us',
		failure: 'Something went wrong',
	}

	form.addEventListener('submit', event => {
		event.preventDefault()
		const loader = document.createElement('div')
		loader.classList.add('loading')
		form.append(loader)
		const formData = new FormData(form)
		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})
		sendMessage(loader, object)
	})

	async function sendMessage(loader, object) {
		try {
			await fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: chatId,
					text: `Name: ${object.name}. Phone: ${object.phone}`,
				}
				)
			})
			showStatusMessage(message.success)
		} catch (e) {
			console.log("Error", e);
		} finally {
			loader.remove()
			form.reset()
		}
	}

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')
		modalDialog.classList.add('hide')
		openModal('.modal__content', '.modal', modalTimerId)

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`
		document.querySelector(".modal").append(statusModal)

		statusModal.addEventListener('click', (event) => {
			if (event.target.hasAttribute('data-modal-close')) {
				statusModal.remove();
				modalDialog.classList.remove('hide');
				closeModal('.modal');
				clearTimeout(stRemove)
			}
		});
		const stRemove = setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeModal('.modal')
		}, 4000)
	}

}
	
export default forms