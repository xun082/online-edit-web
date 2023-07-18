class Drag {
  private isMouseDown: boolean = false;
  private startPos: { x: number; y: number } = { x: 0, y: 0 };
  // eslint-disable-next-line no-unused-vars
  private downCallback: (e: MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  private moveCallback: (ox: number, oy: number, e: MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  private upCallback: (e: MouseEvent) => void;

  constructor(
    // eslint-disable-next-line no-unused-vars
    downCallback?: (e: MouseEvent) => void,
    // eslint-disable-next-line no-unused-vars
    moveCallback?: (ox: number, oy: number, e: MouseEvent) => void,
    // eslint-disable-next-line no-unused-vars
    upCallback?: (e: MouseEvent) => void,
  ) {
    this.downCallback = downCallback || function () {};
    this.moveCallback = moveCallback || function () {};
    this.upCallback = upCallback || function () {};
    this.bind();
  }

  private bind(): void {
    this.onMousedown = this.onMousedown.bind(this);
    this.onMousemove = this.onMousemove.bind(this);
    this.onMouseup = this.onMouseup.bind(this);
    window.addEventListener("mousemove", this.onMousemove);
    window.addEventListener("mouseup", this.onMouseup);
  }

  public off(): void {
    window.removeEventListener("mousemove", this.onMousemove);
    window.removeEventListener("mouseup", this.onMouseup);
  }

  private onMousedown(e: MouseEvent): void {
    e.preventDefault();
    this.isMouseDown = true;
    this.startPos.x = e.clientX;
    this.startPos.y = e.clientY;
    this.downCallback(e);
  }

  private onMousemove(e: MouseEvent): void {
    e.preventDefault();
    if (!this.isMouseDown) {
      return;
    }
    let ox = e.clientX - this.startPos.x;
    let oy = e.clientY - this.startPos.y;
    this.moveCallback(ox, oy, e);
  }

  private onMouseup(e: MouseEvent): void {
    this.isMouseDown = false;
    this.upCallback(e);
  }
}

export default Drag;
