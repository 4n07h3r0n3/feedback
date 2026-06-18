document.getElementsByClassName("hello-copy")[0].addEventListener('click', async () => {
    const text = document.getElementsByClassName("hello-copy")[0].value;

    try {
        await navigator.clipboard.writeText(text);
    }
    catch (err) {
        console.log("failed copy to clipboard");
    }
});

const course = document.getElementsByClassName("course")[0];
const module = document.getElementsByClassName("module")[0];
const lesson = document.getElementsByClassName("lesson")[0];

course.addEventListener('input', (e) => {
    const modules = Object.keys(CURRICULUM[course.value]);
    let html = "";
    for (const key of modules) {
        html += `<option value="${key}">${key}</option>`;
    }
    module.innerHTML = html;
    module.dispatchEvent(new Event('input', {bubbles: true}));
});

module.addEventListener('input', (e) => {
    const lessons = CURRICULUM[course.value][module.value];
    let html = "";
    for (let i = 1; i < lessons.length + 1; i++) {
        html += `<option value="${i}">${i} урок</option>`;
    }
    lesson.innerHTML = html;
    lesson.dispatchEvent(new Event('input', {bubbles: true}));
});

lesson.addEventListener('input', (e) => {
    document.getElementsByClassName("result-text")[0].value = CURRICULUM[course.value][module.value][Number(lesson.value - 1)];
});

course.dispatchEvent(new Event('input', {bubbles: true}));