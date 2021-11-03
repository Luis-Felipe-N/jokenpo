const btnOpenModal = document.querySelector('[data-js="btn-open-modal"]')
const btnCloseModal = document.querySelector('[data-js="bnbtn-close-modal"]')
const modal = document.querySelector('[data-js="modal"]')

function handleClick({target}) {
    const clickInSideModal = !target.contains(btnOpenModal) && target.contains(modal) 

    if ( clickInSideModal ) {
        closeModal()
    }
}

function closeModal() {
    modal.classList.remove('active')
    document.addEventListener('click', handleClick)
}

function openModal() {
    modal.classList.add('active')
    document.addEventListener('click', handleClick)
}

btnOpenModal.onclick = openModal

btnCloseModal.onclick = closeModal