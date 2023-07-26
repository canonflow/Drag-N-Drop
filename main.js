const draggables = document.querySelectorAll(".draggable");
const totalActivities = draggables.length;
const containers = document.querySelectorAll(".container");
const buttons = document.querySelectorAll(".btn");
const inputActivity = document.getElementById("input-activity");
const buttonInput = document.getElementById("modal-update");
let currentId;  // ID dari activity yang dipilih

const modal = document.getElementById("myModal");
const closeModal = document.querySelector(".close");
console.log(totalActivities);

// Open modal
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        currentId = button.parentElement.id;
        let parent = document.getElementById(`${currentId}`);
        let item = parent.firstChild;  // Span
        modal.style.display = "block";
        inputActivity.value = item.innerHTML;
        inputActivity.focus();
    })
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close Modal
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Update activity (kalo neken enter)
inputActivity.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();  // Biar gk refresh page
        let parent = document.getElementById(`${currentId}`);
        let item = parent.firstChild;
        item.innerHTML = inputActivity.value;
        modal.style.display = "none";
    }
})

// Update activity (kalo neken tombol)
buttonInput.addEventListener('click', () => {
    let parent = document.getElementById(`${currentId}`);
    let item = parent.firstChild;
    item.innerHTML = inputActivity.value;
    modal.style.display = "none";
})

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach((container) => {
    container.addEventListener('dragover', (event) => {
        event.preventDefault();
        const afterElement = getDragAfterElement(container, event.clientY)
        const draggable = document.querySelector('.dragging');

        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
});

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};