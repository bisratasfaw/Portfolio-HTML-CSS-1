function toggleMenu(){
    const menu= document.querySelector(".menu-links");
    const icon= document.querySelector(".list-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const contactForm = document.querySelector(".contact-form");
const contactFormStatus = document.querySelector(".contact-form-status");

const skillsModal = document.getElementById("skills-modal");
const skillsTrigger = document.getElementById("skill");
const skillsCard = document.getElementById("skill-card");
const skillsClose = document.getElementById("skills-modal-close");
const skillsBackdrop = document.querySelector("[data-close-skills-modal]");
const workRail = document.getElementById("work-rail");
const workTrigger = document.getElementById("work");
const workCard = document.getElementById("work-card");
const workClose = document.getElementById("work-rail-close");
const workBackdrop = document.querySelector("[data-close-work-rail]");

function openSkillsModal() {
    if (!skillsModal) return;
    closeWorkRail();
    skillsModal.classList.add("is-open");
    skillsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeSkillsModal() {
    if (!skillsModal) return;
    skillsModal.classList.remove("is-open");
    skillsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function openWorkRail() {
    if (!workRail) return;
    closeSkillsModal();
    workRail.classList.add("is-open");
    workRail.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeWorkRail() {
    if (!workRail) return;
    workRail.classList.remove("is-open");
    workRail.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

if (skillsTrigger) {
    skillsTrigger.addEventListener("click", openSkillsModal);
}

if (skillsCard) {
    skillsCard.addEventListener("click", openSkillsModal);
    skillsCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openSkillsModal();
        }
    });
    skillsCard.setAttribute("tabindex", "0");
    skillsCard.setAttribute("role", "button");
    skillsCard.setAttribute("aria-haspopup", "dialog");
}

if (skillsClose) {
    skillsClose.addEventListener("click", closeSkillsModal);
}

if (skillsBackdrop) {
    skillsBackdrop.addEventListener("click", closeSkillsModal);
}

if (workTrigger) {
    workTrigger.addEventListener("click", openWorkRail);
}

if (workCard) {
    workCard.addEventListener("click", openWorkRail);
    workCard.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openWorkRail();
        }
    });
    workCard.setAttribute("tabindex", "0");
    workCard.setAttribute("role", "button");
    workCard.setAttribute("aria-haspopup", "dialog");
}

if (workClose) {
    workClose.addEventListener("click", closeWorkRail);
}

if (workBackdrop) {
    workBackdrop.addEventListener("click", closeWorkRail);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSkillsModal();
        closeWorkRail();
    }
});

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const message = (formData.get("message") || "").toString().trim();
        const recipient = contactForm.dataset.recipientEmail || "Serurbisrat@gmail.com";

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        if (contactFormStatus) {
            contactFormStatus.textContent = "Opening your email app with the message filled in.";
        }

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
}
