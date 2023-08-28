export default class Popover {
  constructor(content) {
    this.content = content;
    this.show = false;
  }

  init() {
    this.bindToDOM();
    this.button = this.content.querySelector('.btn');
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.showPopover();
    });
  }

  static get markUp() {
    return `
  <div class="popover hidden">
  <div class="popover_content">
    <h3 class="popover_title">Popover title</h3>
    <p class="popover_text">And here's some amazing content.It's very engaging.Right?</p>
  </div>
</div>
`;
  }

  get popover() {
    return this.content.querySelector('.popover');
  }

  bindToDOM() {
    this.content.insertAdjacentHTML('beforeend', this.constructor.markUp);
  }

  showPopover() {
    this.popover.classList.toggle('hidden');
    this.show = !this.popover.classList.contains('hidden');
  }
}
