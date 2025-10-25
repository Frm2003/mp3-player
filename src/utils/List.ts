interface Linkable<T> {
    next: T | null;
    back: T | null;
}

export class List<T extends Linkable<T>> {
    private first: T | null = null;
    private last: T | null = null;
    private sizeCount: number;

    constructor() {
        this.first = null;
        this.last = null;
        this.sizeCount = 0;
    }

    public size(): number {
        return this.sizeCount;
    }

    public push(newItem: T): void {
        this.sizeCount++;

        if (!this.last) {
            this.first = newItem;
            this.last = newItem;
            newItem.next = newItem;
            newItem.back = newItem;
            return;
        }

        newItem.back = this.last;
        newItem.next = this.first;

        this.last.next = newItem;
        this.first!.back = newItem;

        this.last = newItem;
    }

    public getArray(): T[] {
        const list: T[] = [];

        if (!this.first) return list;

        let x: T = this.first;

        while (x.next !== this.first) {
            list.push(x);
            if (x.next) x = x.next
        }

        list.push(x);

        return list;
    }

    public pop(index: T): void {
        console.log(index);
    }

    public showAll(): void {
        const x = this.first;
        if (x) this.show(x);
    }

    private show(x: T): void {
        console.log(x);
        if (x?.next !== this.first) this.show(x.next as T);
        return;
    }
}