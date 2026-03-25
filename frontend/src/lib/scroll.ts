export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
}
