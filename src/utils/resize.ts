class Resize {
  private _dir: string = "";
  private _prop: string = "";
  private _containerSize: number = 0;
  private _dragItemList: { [key: string]: any }[] = [];
  private _last: number = 0;
  private _minSizeCache: { [key: number]: number } = {};
  private _maxSizeCache: { [key: number]: number } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  init({
    dir,
    dragItemList,
    containerSize,
  }: {
    dir: string;
    dragItemList: { [key: string]: any }[];
    containerSize: number;
  }): void {
    this._dir = dir;
    this._dragItemList = dragItemList;
    this._containerSize = containerSize;
    this._prop = this._dir === "v" ? "height" : "width";
  }

  getMinSize(index: number): number {
    if (this._minSizeCache[index] !== undefined) {
      return this._minSizeCache[index];
    }
    return (this._minSizeCache[index] =
      ((this._dragItemList[index].min ? this._dragItemList[index].min : 0) /
        this._containerSize) *
      100);
  }

  getMaxSize(index: number): number {
    if (this._maxSizeCache[index] !== undefined) {
      return this._maxSizeCache[index];
    }
    let minSum = this._dragItemList.reduce(
      (sum: number, cur: { [key: string]: any }, i: number) => {
        return (sum += index === i ? 0 : cur.min || 0);
      },
      0,
    );
    return (this._maxSizeCache[index] =
      ((this._dragItemList[index].max
        ? this._dragItemList[index].max
        : this._containerSize - minSum) /
        this._containerSize) *
      100);
  }

  private getFirstNarrowItemIndex(dir: string, index: number): number {
    if (dir === "leftUp") {
      let narrowItemIndex = index - 1;
      while (narrowItemIndex >= 0) {
        let _minSize = this.getMinSize(narrowItemIndex);
        if (this._dragItemList[narrowItemIndex][this._prop] > _minSize) {
          break;
        }
        narrowItemIndex--;
      }
      return narrowItemIndex;
    } else if (dir === "rightDown") {
      let narrowItemIndex = index;
      while (narrowItemIndex <= this._dragItemList.length - 1) {
        let _minSize = this.getMinSize(narrowItemIndex);
        if (this._dragItemList[narrowItemIndex][this._prop] > _minSize) {
          break;
        }
        narrowItemIndex++;
      }
      return narrowItemIndex;
    }
    return -1; // 添加默认的返回语句
  }

  private isCanDrag(dir: string, index: number): boolean {
    let narrowItemIndex = this.getFirstNarrowItemIndex(dir, index);
    if (
      narrowItemIndex < 0 ||
      narrowItemIndex > this._dragItemList.length - 1
    ) {
      return false;
    }
    return true;
  }

  onDragStart(e: MouseEvent): void {
    this._last = this._dir === "v" ? e.clientY : e.clientX;
  }

  onDrag(index: number, ox: number, oy: number, e: MouseEvent): void {
    let client = this._dir === "v" ? e.clientY : e.clientX;
    let dx = client - this._last;
    let rx = (dx / this._containerSize) * 100;
    this._last = client;
    if (dx < 0) {
      if (!this.isCanDrag("leftUp", index)) {
        return;
      }
      if (this._dragItemList[index][this._prop] - rx < this.getMaxSize(index)) {
        this._dragItemList[index][this._prop] -= rx;
      } else {
        this._dragItemList[index][this._prop] = this.getMaxSize(index);
      }
      let narrowItemIndex = this.getFirstNarrowItemIndex("leftUp", index);
      let _minSize = this.getMinSize(narrowItemIndex);
      if (narrowItemIndex >= 0) {
        if (this._dragItemList[narrowItemIndex][this._prop] + rx > _minSize) {
          this._dragItemList[narrowItemIndex][this._prop] += rx;
        } else {
          this._dragItemList[narrowItemIndex][this._prop] = _minSize;
        }
      }
    } else if (dx > 0) {
      if (!this.isCanDrag("rightDown", index)) {
        return;
      }
      let narrowItemIndex = this.getFirstNarrowItemIndex("rightDown", index);
      let _minSize = this.getMinSize(narrowItemIndex);
      if (narrowItemIndex <= this._dragItemList.length - 1) {
        let ax = 0;
        if (this._dragItemList[narrowItemIndex][this._prop] - rx > _minSize) {
          ax = rx;
        } else {
          ax = this._dragItemList[narrowItemIndex][this._prop] - _minSize;
        }
        this._dragItemList[narrowItemIndex][this._prop] -= ax;
        if (index > 0) {
          if (
            this._dragItemList[index - 1][this._prop] + ax <
            this.getMaxSize(index - 1)
          ) {
            this._dragItemList[index - 1][this._prop] += ax;
          } else {
            this._dragItemList[index - 1][this._prop] = this.getMaxSize(
              index - 1,
            );
          }
        }
      }
    }
  }
}

export default Resize;
